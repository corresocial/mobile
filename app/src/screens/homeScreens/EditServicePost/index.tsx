import React, { useContext, useEffect } from 'react'

import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'
import { Body, Container, Header, SaveButtonContainer, Sigh } from './styles'
import CheckIcon from '../../../assets/icons/check.svg'

import { serviceCategories } from '../../serviceScreens/serviceCategories'

import { EditServicePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { arrayIsEmpty, formatHour } from '../../../common/auxiliaryFunctions'
import { theme } from '../../../common/theme'
import { DaysOfWeek, ServiceCollection } from '../../../services/firebase/types'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { ServiceStackParamList } from '../../../routes/Stack/ServiceStack/types'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { updatePostPrivateData } from '../../../services/firebase/post/updatePostPrivateData'
import { relativeScreenHeight } from '../../../common/screenDimensions'

function EditServicePost({ route, navigation }: EditServicePostScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const { postData } = route.params

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const getRelativeTitle = () => {
		switch (postData.postType) {
			case 'service': return 'do serviço'
			case 'sale': return 'da venda'
			case 'vacancy': return 'da vaga'
			case 'socialImpact': return 'da iniciativa'
			case 'culture': {
				const { cultureType } = postData as any
				return cultureType === 'artistProfile' ? 'do artista' : 'do evento'
			}
			default: return 'do post'
		}
	}

	const formatDaysOfWeek = () => {
		const attendanceWeekDays = getPostField('attendanceWeekDays')

		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => attendanceWeekDays.includes(weekDay))
		return ordenedDaysOfWeek.toString().split(',').join(', ')
	}

	const renderDeliveryMethod = () => {
		const deliveryMethod = getPostField('deliveryMethod')
		switch (deliveryMethod) {
			case 'unavailable': return 'não entrega'
			case 'near': return 'entrega perto'
			case 'city': return 'entrega na cidade'
			case 'country': return 'entrega no país inteiro'
			default: return '---'
		}
	}

	const navigateToEditScreen = (screenName: keyof ServiceStackParamList, initialValue: any) => {
		const value = getPostField(initialValue)
		navigation.navigate('ServiceStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post) => post.postId !== postData.postId)
	}

	const editPost = async () => {
		try {
			setLoaderIsVisible(true)
			if (editDataContext.unsaved.address) {
				await savePrivateAddress()
			}

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload()
				changeStateOfEditedFields()
				setLoaderIsVisible(false)
				navigation.goBack()
				return
			}
			console.log('without pictures')

			const postDataToSave = { ...postData, ...editDataContext.unsaved }
			delete postDataToSave.owner
			delete postDataToSave.address

			await updatePost('services', postData.postId, postDataToSave)
			await updateDocField(
				'users',
				postData.owner.userId,
				'posts',
				[postDataToSave, ...getUserPostsWithoutEdited()]
			)

			setLoaderIsVisible(false)
			changeStateOfEditedFields()
			updateUserContext(postDataToSave)
			navigation.goBack()
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			throw new Error('Erro ao editar post')
		}
	}

	const changeStateOfEditedFields = () => {
		setEditDataOnContext({ saved: editDataContext.unsaved, unsaved: {} })
	}

	const allPicturesAlreadyUploaded = () => {
		return !!editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length
	}

	const performPicturesUpload = async () => {
		const picturesNotUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')) || []

		const picturePostsUrls: string[] = []
		await picturesNotUploaded.map(async (picturePath: string, index: number) => {
			return uploadImage(picturePath, 'services', postData.postId, index).then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change',
						() => { },
						(err: any) => {
							throw new Error(err)
						},
						async () => {
							return getDownloadURL(uploadTask.snapshot.ref)
								.then(
									async (downloadURL) => {
										blob.close()
										picturePostsUrls.push(downloadURL)
										if (picturePostsUrls.length === picturesNotUploaded.length) {
											const postDataToSave = {
												...postData,
												...editDataContext.unsaved,
												picturesUrl: [...picturePostsUrls, ...picturesAlreadyUploaded]
											}
											delete postDataToSave.unsaved.owner

											await updatePost('services', postData.postId, postDataToSave)
											await updateDocField(
												'users',
												postData.owner.userId,
												'posts',
												[postDataToSave, ...getUserPostsWithoutEdited()]
											)
											updateUserContext(postDataToSave)
										}
									},
								)
						},
					)
				},
			)
		})

		return picturePostsUrls
	}

	const savePrivateAddress = async () => {
		await updatePostPrivateData(
			{
				...editDataContext.unsaved.address,
				locationView: editDataContext.unsaved.locationView,
				postType: 'service',
			},
			postData.postId,
			'services',
			`address${postData.postId}`
		)
	}

	const updateUserContext = (postAfterEdit: ServiceCollection) => {
		setUserDataOnContext({
			posts: [
				...getUserPostsWithoutEdited(),
				postAfterEdit
			]
		})
	}

	const cancelAllChangesAndGoBack = () => {
		navigation.goBack()
	}

	const getPostField = (fieldName: keyof ServiceCollection) => {
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: string = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${serviceCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`// TODO Type
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={cancelAllChangesAndGoBack}
					text={'editar seu post'}
					highlightedWords={['editar']}
				/>
				{
					Object.keys(editDataContext.unsaved).length > 0 && (
						<SaveButtonContainer>
							<PrimaryButton
								color={theme.green3}
								labelColor={theme.white3}
								label={'salvar alterações'}
								highlightedWords={['salvar']}
								fontSize={16}
								SecondSvgIcon={CheckIcon}
								svgIconScale={['35%', '18%']}
								minHeight={relativeScreenHeight(6)}
								relativeHeight={relativeScreenHeight(8)}
								onPress={editPost}
							/>
						</SaveButtonContainer>
					)
				}
			</Header>
			<Body>
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectServiceCategory', 'tags')}
				/>
				<Sigh />
				<EditCard
					title={'título do post'}
					highlightedWords={['título']}
					value={getPostField('title')}
					onEdit={() => navigateToEditScreen('InsertServiceName', 'title')}
				/>
				<Sigh />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					carousel
					onEdit={() => navigateToEditScreen('ServicePicturePreview', 'picturesUrl')}
				/>
				<Sigh />
				<EditCard
					title={`descrição ${getRelativeTitle()}`}
					highlightedWords={['descrição']}
					value={getPostField('description') || '---'}
					onEdit={() => navigateToEditScreen('InsertServiceDescription', 'description')}
				/>
				<Sigh />
				<EditCard
					title={'valor de venda'}
					highlightedWords={['venda']}
					value={getPostField('saleValue') || '---'}
					onEdit={() => navigateToEditScreen('InsertSaleValue', 'saleValue')}
				/>
				<Sigh />
				<EditCard
					title={'valor de troca'}
					highlightedWords={['troca']}
					value={getPostField('exchangeValue') || '---'}
					onEdit={() => navigateToEditScreen('InsertExchangeValue', 'exchangeValue')}
				/>
				<Sigh />
				<LocationViewCard
					title={'localização'}
					locationView={getPostField('locationView')}
					postType={getPostField('postType')}
					postId={getPostField('postId')}
					textFontSize={16}
					editable
					onEdit={() => navigateToEditScreen('InsertServicePrestationLocation', 'postId')}
				/>
				<Sigh />
				<EditCard
					title={'dias da semana'}
					highlightedWords={['semana']}
					value={formatDaysOfWeek() || '---'}
					onEdit={() => navigateToEditScreen('SelectDaysOfWeek', 'attendanceWeekDays')}
				/>
				<Sigh />
				<EditCard
					title={'horário de início'}
					highlightedWords={['início']}
					value={formatHour(getPostField('openingHour')) || '---'}
					onEdit={() => navigateToEditScreen('InsertOpeningHour', 'openingHour')}
				/>
				<Sigh />
				<EditCard
					title={'horário de fim'}
					highlightedWords={['fim']}
					value={formatHour(getPostField('closingHour')) || '---'}
					onEdit={() => navigateToEditScreen('InsertClosingHour', 'closingHour')}
				/>
				<Sigh />
				<EditCard
					title={'entrega'}
					highlightedWords={['entrega']}
					value={renderDeliveryMethod() || '---'}
					onEdit={() => navigateToEditScreen('SelectDeliveryMethod', 'deliveryMethod')}
				/>
				<Sigh />
				<Sigh />
			</Body>
		</Container>
	)
}

export { EditServicePost }
