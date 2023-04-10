import React, { useContext, useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, Container, Header, LastSigh, SaveButtonContainer, Sigh } from './styles'
import CheckIcon from '../../../assets/icons/check.svg'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'
import { arrayIsEmpty, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'

import { EditServicePostScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { CultureCollection, DaysOfWeek, Id, ServiceCategories, ServiceCollection, ServiceCollectionRemote } from '../../../services/firebase/types'
import { ServiceStackParamList } from '../../../routes/Stack/ServiceStack/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'

function EditServicePost({ route, navigation }: EditServicePostScreenProps) {
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
		const range = getPostField('range')
		switch (range) {
			case 'unavailable': return 'não entrega'
			case 'near': return 'entrega perto'
			case 'city': return 'entrega na cidade'
			case 'country': return 'entrega no país inteiro'
			default: return '---'
		}
	}

	const navigateToEditScreen = (screenName: keyof ServiceStackParamList, initialValue: keyof ServiceCollectionRemote, especificField?: string) => {
		let value = getPostField(initialValue)

		if (initialValue === 'picturesUrl') {
			value = getPicturesUrl()
		}

		navigation.navigate('ServiceStack', {
			screen: screenName,
			params: {
				editMode: true,
				initialValue: !especificField ? value : value[especificField]
			}
		})
	}

	const getUserPostsWithoutEdited = () => {
		const userPosts = userDataContext.posts || []
		return userPosts.filter((post: ServiceCollection) => post.postId !== postData.postId)
	}

	const editPost = async () => {
		if (!editDataContext.unsaved) return

		try {
			setIsLoading(true)

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('with pictures')
				await performPicturesUpload()
				return
			}
			console.log('without pictures')

			const postDataToSave = { ...postData, ...editDataContext.unsaved }
			delete postDataToSave.owner

			const registredPicturesUrl = postData.picturesUrl || []
			const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => editDataContext.unsaved.picturesUrl && !editDataContext.unsaved.picturesUrl.includes(pictureUrl))
			if (picturesAlreadyUploadedToRemove.length) {
				await deletePostPictures(picturesAlreadyUploadedToRemove)
			}

			await updatePost('posts', postData.postId, postDataToSave)

			if (postDataToSave.location) {
				delete postDataToSave.location.geohashNearby
				delete postDataToSave.location.geohashCity
			}

			await updateDocField(
				'users',
				userDataContext.userId as Id,
				'posts',
				[postDataToSave, ...getUserPostsWithoutEdited()]
			)

			updateUserContext(postDataToSave)
			changeStateOfEditedFields()
			setIsLoading(false)
			navigation.goBack()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			throw new Error('Erro ao editar post')
		}
	}

	const changeStateOfEditedFields = (uploadedPictures?: string[]) => {
		let newEditState
		if (uploadedPictures) {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved, picturesUrl: [...uploadedPictures] }, unsaved: {} }
		} else {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		}

		setEditDataOnContext(newEditState)
	}

	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	}

	const performPicturesUpload = async () => {
		const picturesNotUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')) || []

		const picturePostsUrls: string[] = []
		await picturesNotUploaded.map(async (picturePath: string, index: number) => {
			return uploadImage(picturePath, 'posts', index).then(
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

											const registredPicturesUrl = postData.picturesUrl || []
											const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => ![...picturePostsUrls, ...picturesAlreadyUploaded].includes(pictureUrl))
											if (picturesAlreadyUploadedToRemove.length) {
												await deletePostPictures(picturesAlreadyUploadedToRemove)
											}

											await updatePost('posts', postData.postId, postDataToSave)

											if (postDataToSave.location) {
												delete postDataToSave.location.geohashNearby
												delete postDataToSave.location.geohashCity
											}

											await updateDocField(
												'users',
												userDataContext.userId as Id,
												'posts',
												[postDataToSave, ...getUserPostsWithoutEdited()]
											)

											changeStateOfEditedFields([...picturePostsUrls, ...picturesAlreadyUploaded])
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
		const category: ServiceCategories = getPostField('category')
		const tags = getPostField('tags')

		return `	●  ${serviceCategories[category].label}\n	●  ${tags.map((tag: string) => ` #${tag}`)}`
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
					textFontSize={16}
					editable
					isAuthor
					location={getPostField('location')}
					onEdit={() => navigateToEditScreen('SelectLocationView', 'location', 'coordinates')}
				/>
				<Sigh />
				<EditCard
					title={'dias da semana'}
					highlightedWords={['semana']}
					value={formatDaysOfWeek() || '---'}
					onEdit={() => navigateToEditScreen('SelectServiceFrequency', 'attendanceWeekDays')}
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
					onEdit={() => navigateToEditScreen('SelectDeliveryMethod', 'range')}
				/>
				<LastSigh />
			</Body>
		</Container>
	)
}

export { EditServicePost }
