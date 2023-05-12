import React, { useContext, useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { StatusBar, Alert } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'
import { arrayIsEmpty, formatHour } from '../../../common/auxiliaryFunctions'
import { updatePost } from '../../../services/firebase/post/updatePost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'

import { EditServicePostReviewScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { Id, PostCollection, ServiceCategories, ServiceCollection, ServiceCollectionRemote } from '../../../services/firebase/types'
import { ServiceStackParamList } from '../../../routes/Stack/ServiceStack/types'
import { LocalUserData, ServiceData } from '../../../contexts/types'

import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { EditCard } from '../../../components/_cards/EditCard'
import { theme } from '../../../common/theme'
import { LocationViewCard } from '../../../components/_cards/LocationViewCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'
import { deletePostPictures } from '../../../services/firebase/post/deletePostPictures'
import { DescriptionCard } from '../../../components/_cards/DescriptionCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { DeliveryMethodCard } from '../../../components/_cards/DeliveryMethodCard'
import { DateTimeCard } from '../../../components/_cards/DateTimeCard'
import { SaleOrExchangeCard } from '../../../components/_cards/SaleOrExchangeCard'
import { PostRangeCard } from '../../../components/_cards/PostRangeCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

function EditServicePost({ route, navigation }: EditServicePostReviewScreenProps) {
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	const owner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { postData, unsavedPost } = route.params

	useEffect(() => {
		clearUnsavedEditContext()
	}, [])

	const getPicturesUrl = () => {
		const picturesUrl = getPostField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const navigateToEditScreen = (screenName: keyof ServiceStackParamList, initialValue: keyof ServiceCollectionRemote) => {
		let value = getPostField(initialValue)

		if (initialValue === 'picturesUrl') {
			value = getPicturesUrl()
		}

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

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
		return userPosts.filter((post: any) => post.postId !== postData.postId) // TODO Type ServiceCollection
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

	const extractServicePictures = (serviceData: ServiceData) => serviceData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const saveServicePost = async () => {
		setHasError(false)
		setIsLoading(true)

		const serviceData = { ...postData, ...editDataContext.unsaved } as ServiceCollection
		const servicePictures = extractServicePictures(serviceData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!servicePictures.length) {
				const postId = await createPost(serviceData, localUser, 'posts', 'service')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					serviceData
				)
				return
			}

			const picturePostsUrls: string[] = []
			servicePictures.forEach(async (servicePicture, index) => {
				uploadImage(servicePicture, 'posts', index).then(
					({ uploadTask, blob }: any) => {
						uploadTask.on(
							'state_change',
							() => { },
							(err: any) => {
								throw new Error(err)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref)
									.then(
										async (downloadURL) => {
											blob.close()
											picturePostsUrls.push(downloadURL)
											if (picturePostsUrls.length === servicePictures.length) {
												const serviceDataWithPicturesUrl = { ...serviceData, picturesUrl: picturePostsUrls }

												const postId = await createPost(serviceDataWithPicturesUrl, localUser, 'posts', 'service')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													serviceDataWithPicturesUrl
												)
												setIsLoading(false)
											}
										},
									)
							},
						)
					},
				)
			})
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasError(true)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		serviceDataPost: ServiceData,
	) => {
		const postDataToSave = {
			...serviceDataPost,
			postId,
			postType: 'service',
			createdAt: new Date()
		}

		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postDataToSave,
			true,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts] as PostCollection[] : []
				setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner } as ServiceCollection
					],
				})

				setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner }
					],
				})

				setIsLoading(false)
				showShareModal(true, serviceDataPost.title)
				navigation.navigate('HomeTab')
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasError(true)
			})
	}

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
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
		if (!unsavedPost) return navigation.goBack()

		Alert.alert(
			'atenção!',
			`você tem certeza que deseja descartar o post "${getPostField('title')}"?`,
			[
				{ text: 'Não', style: 'destructive' },
				{ text: 'Sim', onPress: () => navigation.goBack() },
			],
			{ cancelable: false }
		)
	}

	const getPostField = (fieldName: keyof ServiceCollection, allowNull?: boolean) => {
		if (allowNull && editDataContext.unsaved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || postData[fieldName]
	}

	const formatCategoryAndTags = () => {
		const category: ServiceCategories = getPostField('category')
		const tags = getPostField('tags')

		return `   ●  ${serviceCategories[category].label}\n	 ●  ${tags.map((tag: string) => ` #${tag}`)}`
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={unsavedPost ? 'revisar seu post' : 'editar seu post'}
					highlightedWords={unsavedPost ? ['revisar'] : ['editar']}
					destructiveButton={unsavedPost}
					onBackPress={cancelAllChangesAndGoBack}
				/>
				{
					hasError && (
						<>
							<VerticalSigh height={relativeScreenHeight(2)} />
							<InstructionCard
								message={'opa! \nalgo deu errado, tente novamente. '}
								highlightedWords={['\nalgo', 'deu', 'errado']}
								backgroundColor={theme.red1}
								flex={0}
								fontSize={14}
								lineHeight={20}
								padding={7}
							/>
						</>
					)
				}
				{
					(Object.keys(editDataContext.unsaved).length > 0 || unsavedPost) && (
						isLoading && !hasError
							? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										label={unsavedPost ? 'publicar post' : 'salvar alterações'}
										labelColor={theme.white3}
										highlightedWords={unsavedPost ? ['publicar'] : ['salvar']}
										fontSize={16}
										SecondSvgIcon={unsavedPost ? PlusWhiteIcon : CheckWhiteIcon}
										svgIconScale={['35%', '18%']}
										minHeight={relativeScreenHeight(6)}
										relativeHeight={relativeScreenHeight(8)}
										onPress={unsavedPost ? saveServicePost : editPost}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body >
				{
					unsavedPost && (
						<>
							<SubtitleCard
								text={'seu post'}
								highlightedText={['post']}
							/>
							<PostCardContainer hasError={hasError}>
								<PostCard
									owner={owner}
									post={{ ...postData, ...editDataContext.unsaved, postType: 'service', createdAt: new Date() }}
									onPress={() => { }}
								/>
							</PostCardContainer>
							<SubtitleCard
								text={'detalhes do post'}
								highlightedText={['detalhes']}
							/>
						</>
					)
				}
				<BodyPadding hasError={hasError}>
					<EditCard
						title={'tags do post'}
						highlightedWords={['tags']}
						value={formatCategoryAndTags()}
						onEdit={() => navigateToEditScreen('SelectServiceCategory', 'tags')}
					/>
					<VerticalSigh />
					<EditCard
						title={'título do post'}
						highlightedWords={['título']}
						value={getPostField('title')}
						onEdit={() => navigateToEditScreen('InsertServiceName', 'title')}
					/>
					<VerticalSigh />
					<DescriptionCard
						text={getPostField('description')}
						onEdit={() => navigateToEditScreen('InsertServiceDescription', 'description')}
					/>
					<VerticalSigh />
					<EditCard
						title={'fotos do post'}
						highlightedWords={['fotos']}
						profilePicturesUrl={getPicturesUrl()}
						indicatorColor={theme.purple1}
						carousel
						onEdit={() => navigateToEditScreen('ServicePicturePreview', 'picturesUrl')}
					/>
					<VerticalSigh />
					<SaleOrExchangeCard
						saleValue={getPostField('saleValue', true)}
						exchangeValue={getPostField('exchangeValue', true)}
						onEdit={() => navigateToEditScreen('SelectPaymentType', 'saleValue')}
					/>
					<VerticalSigh />
					<PostRangeCard
						postRange={getPostField('range')}
						onEdit={() => navigateToEditScreen('SelectServiceRange', 'range')}
					/>
					<VerticalSigh />
					<LocationViewCard
						title={'localização'}
						locationView={getPostField('locationView')}
						textFontSize={16}
						location={getPostField('location')}
						onEdit={() => navigateToEditScreen('SelectLocationView', 'location')}
					/>
					<VerticalSigh />
					<DeliveryMethodCard
						deliveryMethod={getPostField('deliveryMethod')}
						onEdit={() => navigateToEditScreen('SelectDeliveryMethod', 'deliveryMethod')}
					/>
					<VerticalSigh />
					<DateTimeCard
						title={'dias da semana'}
						highlightedWords={['dias']}
						weekDaysfrequency={getPostField('attendanceFrequency')}
						daysOfWeek={getPostField('daysOfWeek', true)}
						onEdit={() => navigateToEditScreen('SelectServiceFrequency', 'daysOfWeek')}
					/>
					<VerticalSigh />
					<EditCard
						title={'que horas começa'}
						highlightedWords={['começa']}
						SecondSvgIcon={ClockWhiteIcon}
						value={formatHour(getPostField('startHour', true)) || ' ---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertServiceStartHour', 'startHour')}
					/>
					<VerticalSigh />
					<EditCard
						title={'que horas termina'}
						highlightedWords={['termina']}
						SecondSvgIcon={ClockWhiteIcon}
						value={formatHour(getPostField('endHour', true)) || ' ---'}
						valueBold
						onEdit={() => navigateToEditScreen('InsertServiceEndHour', 'endHour')}
					/>
					<VerticalSigh />
					<VerticalSigh />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { EditServicePost }
