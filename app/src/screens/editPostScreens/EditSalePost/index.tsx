import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Body, Container, Header, LastSigh, SaveButtonContainer, Sigh } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CheckIcon from '../../../assets/icons/check.svg'

import { saleCategories } from '../../../utils/postsCategories/saleCategories'
import { arrayIsEmpty, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { updatePostPrivateData } from '../../../services/firebase/post/updatePostPrivateData'

import { EditSalePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SaleStackParamList } from '../../../routes/Stack/SaleStack/types'
import { CultureCollection, DaysOfWeek, SaleCategories, SaleCollection, SaleCollectionRemote } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'

function EditSalePost({ route, navigation }: EditSalePostScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)

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
				const { cultureType } = postData as CultureCollection
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

	const navigateToEditScreen = (screenName: keyof SaleStackParamList, initialValue: keyof SaleCollectionRemote) => {
		const value = getPostField(initialValue)
		navigation.navigate('SaleStack', {
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
			setIsLoading(true)
			if (editDataContext.unsaved.address) {
				await savePrivateAddress()
			}

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload()
				return
			}
			console.log('without pictures')

			const postDataToSave = { ...postData, ...editDataContext.unsaved }
			delete postDataToSave.owner
			delete postDataToSave.address

			await updatePost('sales', postData.postId, postDataToSave)
			await updateDocField(
				'users',
				postData.owner.userId,
				'posts',
				[postDataToSave, ...getUserPostsWithoutEdited()]
			)

			changeStateOfEditedFields()
			updateUserContext(postDataToSave)
			setIsLoading(false)
			navigation.goBack()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			throw new Error('Erro ao editar post')
		}
	}

	const changeStateOfEditedFields = () => {
		setEditDataOnContext({ saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} })
	}

	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	}

	const performPicturesUpload = async () => {
		const picturesNotUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')) || []

		const picturePostsUrls: string[] = []
		await picturesNotUploaded.map(async (picturePath: string, index: number) => {
			return uploadImage(picturePath, 'sales', postData.postId, index).then(
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

											await updatePost('sales', postData.postId, postDataToSave)
											await updateDocField(
												'users',
												postData.owner.userId,
												'posts',
												[postDataToSave, ...getUserPostsWithoutEdited()]
											)

											changeStateOfEditedFields()
											updateUserContext(postDataToSave)
											setIsLoading(false)
											navigation.goBack()
										}
									},
								)
								.catch((err) => {
									console.log(err)
									setIsLoading(false)
								})
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
				postType: 'sale',
			},
			postData.postId,
			'sales',
			`address${postData.postId}`
		)
	}

	const updateUserContext = (postAfterEdit: SaleCollection) => {
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

	const getPostField = (fieldName: keyof SaleCollection) => {
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: SaleCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${saleCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`// TODO WARN
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
						isLoading
							? <Loader />
							: (
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

					)
				}
			</Header>
			<Body>
				<EditCard
					title={'tags do post'}
					highlightedWords={['tags']}
					value={formatCategoryAndTags()}
					onEdit={() => navigateToEditScreen('SelectSaleCategory', 'tags')}
				/>
				<Sigh />
				<EditCard
					title={'título do post'}
					highlightedWords={['título']}
					value={getPostField('title')}
					onEdit={() => navigateToEditScreen('InsertSaleTitle', 'title')}
				/>
				<Sigh />
				<EditCard
					title={'fotos do post'}
					highlightedWords={['fotos']}
					profilePicturesUrl={getPicturesUrl()}
					carousel
					onEdit={() => navigateToEditScreen('SalePicturePreview', 'picturesUrl')}
				/>
				<Sigh />
				<EditCard
					title={`descrição ${getRelativeTitle()}`}
					highlightedWords={['descrição']}
					value={getPostField('itemDescription') || '---'}
					onEdit={() => navigateToEditScreen('InsertItemDescription', 'itemDescription')}
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
					isAuthor
					editable
					defaultAddress={editDataContext.unsaved.address}
					onEdit={() => navigateToEditScreen('SelectLocationView', 'postId')}
				/>
				<Sigh />
				<EditCard
					title={'dias da semana'}
					highlightedWords={['semana']}
					value={formatDaysOfWeek() || '---'}
					onEdit={() => navigateToEditScreen('SelectSaleFrequency', 'attendanceWeekDays')}
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
				<LastSigh />
			</Body>
		</Container>
	)
}

export { EditSalePost }
