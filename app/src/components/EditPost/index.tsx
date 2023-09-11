import React, { useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { Alert, StatusBar } from 'react-native'

import { Id, PostCollection, PostCollectionRemote, UserCollection } from '../../services/firebase/types'
import { LocalUserData } from '../../contexts/types'

import { updatePost } from '../../services/firebase/post/updatePost'
import { updateDocField } from '../../services/firebase/common/updateDocField'
import { uploadImage } from '../../services/firebase/common/uploadPicture'
import { createPost } from '../../services/firebase/post/createPost'
import { deletePostPictures } from '../../services/firebase/post/deletePostPictures'

import { theme } from '../../common/theme'
import { relativeScreenHeight } from '../../common/screenDimensions'
import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import CheckWhiteIcon from '../../assets/icons/check-white.svg'
import PlusWhiteIcon from '../../assets/icons/plus-white.svg'
import HandOnMoneyWhiteIcon from '../../assets/icons/handOnMoney-white.svg'
import WirelessOffWhiteIcon from '../../assets/icons/wirelessOff-white.svg'
import TrashWhiteIcon from '../../assets/icons/trash-white.svg'

import { DefaultPostViewHeader } from '../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../components/_buttons/PrimaryButton'
import { Loader } from '../../components/Loader'
import { VerticalSigh } from '../../components/VerticalSigh'
import { PostCard } from '../../components/_cards/PostCard'
import { SubtitleCard } from '../../components/_cards/SubtitleCard'
import { InstructionCard } from '../../components/_cards/InstructionCard'
import { updateAllRangeAndLocation } from '../../services/firebase/post/updateAllRangeAndLocation'
import { DefaultConfirmationModal } from '../_modals/DefaultConfirmationModal'
import { getShortText } from '../../common/auxiliaryFunctions'
import { getNetworkStatus } from '../../utils/deviceNetwork'
import { deletePostByDescription, setOfflinePost } from '../../utils/offlinePost'
import { WithoutNetworkConnectionAlert } from '../_modals/WithoutNetworkConnectionAlert'

type UserContextFragment = {
	userDataContext: UserCollection;
	setUserDataOnContext: (data: UserCollection) => void;
	setDataOnSecureStore: (key: string, data: any) => Promise<boolean>
}

type EditContextFragment = {
	setEditDataOnContext: (data: any) => void;
	editDataContext: {
		unsaved: any;
		saved: any;
	};
	clearUnsavedEditContext: () => void;
}

interface EditPostProps {
	initialPostData: PostCollectionRemote
	owner: PostCollectionRemote['owner']
	backgroundColor: string
	unsavedPost?: boolean
	offlinePost?: boolean
	children: React.ReactNode | React.ReactNode[]
	navigateBackwards: () => void
	navigateToProfile?: () => void
	navigateToPostView: (postData: PostCollectionRemote) => void
	navigateToSubscriptionContext: () => void
	showShareModal: (visibility: boolean, postTitle?: string, postId?: string) => void
	getPostField: (fieldName: keyof PostCollectionRemote, allowNull?: boolean) => any // TODO Type return
	userContext: UserContextFragment
	editContext: EditContextFragment
}

function EditPost({
	initialPostData,
	owner,
	backgroundColor,
	unsavedPost,
	offlinePost,
	children,
	editContext,
	userContext,
	navigateBackwards,
	navigateToProfile,
	navigateToPostView,
	navigateToSubscriptionContext,
	showShareModal,
	getPostField
}: EditPostProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [offlinePostAlertModalIsVisible, setOfflinePostAlertModalIsVisible] = useState(false)
	const [networkConnectionIsValid, setNetworkConnectionIsValid] = useState(false)

	const { editDataContext } = editContext
	const { userDataContext } = userContext

	useEffect(() => {
		editContext.clearUnsavedEditContext()
		checkNetworkStatus()
	}, [])

	const checkNetworkStatus = async () => {
		const networkStatus = await getNetworkStatus()
		setNetworkConnectionIsValid(!!networkStatus.isConnected && !!networkStatus.isInternetReachable)
		return !!networkStatus.isConnected && !!networkStatus.isInternetReachable
	}

	const getUserPostsWithoutEdited = (updatedLocationPosts?: PostCollectionRemote[]) => {
		const userPosts = updatedLocationPosts || userDataContext.posts || []
		return userPosts.filter((post: PostCollection) => post.postId !== initialPostData.postId) || []
	}

	const locationRangeChanged = () => { // TODO Aprimorar função
		// Se near location foi editada && location.latitute ou latitude foi editada
		// Se city location foi editada && location city unsaved ou initialData city foi editada

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			return Object.keys(editDataContext.unsaved).includes('location')
				&& editDataContext.unsaved
				&& editDataContext.unsaved.location
				&& editDataContext.unsaved.location.coordinates
				&& initialPostData.location?.coordinates
				&& (
					editDataContext.unsaved.location.coordinates.latitude !== initialPostData.location?.coordinates.latitude
					|| editDataContext.unsaved.location.coordinates.longitude !== initialPostData.location?.coordinates.longitude
				)
		}

		if (userDataContext.subscription?.subscriptionRange === 'city') {
			return Object.keys(editDataContext.unsaved).includes('location')
				&& editDataContext.unsaved
				&& editDataContext.unsaved.location
				&& editDataContext.unsaved.location.coordinates
				&& initialPostData.location?.coordinates
				&& (
					editDataContext.unsaved.location.city !== initialPostData.location?.city
				)
		}

		return false
	}

	const editPost = async () => {
		if (!editDataContext.unsaved) return

		const postDataToSave = { ...initialPostData, ...editDataContext.unsaved }

		try {
			setIsLoading(true)

			let userPostsUpdated: any = [] // TODO Type
			if (locationRangeChanged()) {
				userPostsUpdated = await updateAllRangeAndLocation(
					owner,
					getUserPostsWithoutEdited(),
					{
						range: getPostField('range'),
						location: getPostField('location')
					}
				)
			}

			userPostsUpdated = userPostsUpdated.length ? userPostsUpdated : getUserPostsWithoutEdited()

			if ((editDataContext.unsaved.picturesUrl && editDataContext.unsaved.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
				console.log('Fotos modificadas')
				await performPicturesUpload(userPostsUpdated)
				return
			}
			console.log('Fotos não modificadas')

			delete postDataToSave.owner

			const registredPicturesUrl = initialPostData.picturesUrl || []
			const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => editDataContext.unsaved.picturesUrl && !editDataContext.unsaved.picturesUrl.includes(pictureUrl))
			if (picturesAlreadyUploadedToRemove.length) {
				await deletePostPictures(picturesAlreadyUploadedToRemove)
			}

			await updatePost('posts', initialPostData.postId, postDataToSave)

			if (postDataToSave.location) {
				delete postDataToSave.location.geohashNearby
				delete postDataToSave.location.geohashCity
			}

			await updateDocField(
				'users',
				userDataContext.userId as Id,
				'posts',
				[postDataToSave, ...userPostsUpdated]
			)

			updateUserContext(postDataToSave, userPostsUpdated)
			changeStateOfEditedFields()
			setIsLoading(false)
			navigateBackwards()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			throw new Error('Erro ao editar post')
		}
	}

	const extractPostPictures = (postData: PostCollectionRemote) => postData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const savePost = async () => {
		const hasValidConnection = await checkNetworkStatus()

		const postData = { ...initialPostData, ...editDataContext.unsaved } as PostCollectionRemote

		if (offlinePost && !hasValidConnection) return

		if ((!hasValidConnection && !offlinePost) || !networkConnectionIsValid) {
			await setOfflinePost({ ...postData, owner })
			navigateToProfile && navigateToProfile()
			return
		}

		await setOfflinePost({ ...postData, owner })

		const postPictures = extractPostPictures(postData)

		setHasError(false)
		setIsLoading(true)

		let timeoutId: any
		if (!offlinePost) {
			timeoutId = setTimeout(() => {
				setIsLoading(false)
				setHasError(false)
				toggleOfflinePostAlertModal()
				setNetworkConnectionIsValid(false)
			}, 30000)
		}

		try {
			let userPostsUpdated: any = [] // TODO Type
			if (locationRangeChanged()) {
				console.log(`localização ou range mudaram: ${locationRangeChanged()}`)
				userPostsUpdated = await updateAllRangeAndLocation(
					owner,
					getUserPostsWithoutEdited(),
					{
						range: getPostField('range'),
						location: getPostField('location')
					}
				)
			}

			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!postPictures.length) {
				const postId = await createPost(postData, localUser, 'posts', postData.postType)
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					postData,
					userPostsUpdated
				)

				clearTimeout(timeoutId)
				deleteOfflinePostByDescription(postData.description)
				return
			}

			const picturePostsUrls: string[] = []
			postPictures.forEach(async (postPicture, index) => {
				uploadImage(postPicture, 'posts', index).then(
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
											if (picturePostsUrls.length === postPictures.length) {
												const postDataWithPicturesUrl = { ...postData, picturesUrl: picturePostsUrls }

												const postId = await createPost(postDataWithPicturesUrl, localUser, 'posts', postData.postType)
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													postDataWithPicturesUrl,
													userPostsUpdated
												)

												clearTimeout(timeoutId)
												deleteOfflinePostByDescription(postData.description)
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
			Alert.alert('Error', 'First went wrong')
			setIsLoading(false)
			setHasError(true)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		postData: PostCollectionRemote,
		postsUpdated?: PostCollection[]
	) => {
		const postDataToSave = {
			...postData,
			postId,
			postType: postData.postType,
			createdAt: new Date()
		}
		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			userDataContext.posts ? postDataToSave : [postDataToSave],
			!!userDataContext.posts,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts as any] as PostCollectionRemote[] : [] // TODO Type
				userContext.setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner } as PostCollectionRemote
					],
				})
				userContext.setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner }
					],
				})

				setIsLoading(false)
				showShareModal(true, getShortText(postDataToSave.description, 70), postDataToSave.postId)
				navigateToPostView({ ...postDataToSave, owner } as any) // TODO
			})
			.catch((err: any) => {
				console.log(err)
				Alert.alert('Error', 'Second went wrong')
				setIsLoading(false)
				setHasError(true)
			})
	}

	const deleteOfflinePostByDescription = async (description: string) => {
		await deletePostByDescription(description)
	}

	const changeStateOfEditedFields = (uploadedPictures?: string[]) => {
		let newEditState
		if (uploadedPictures) {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved, picturesUrl: [...uploadedPictures] }, unsaved: {} }
		} else {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		}

		editContext.setEditDataOnContext(newEditState)
	}

	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	}

	const performPicturesUpload = async (postsUpdated?: PostCollection[]) => {
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
												...initialPostData,
												...editDataContext.unsaved,
												picturesUrl: [...picturePostsUrls, ...picturesAlreadyUploaded]
											}

											const registredPicturesUrl = initialPostData.picturesUrl || []
											const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => ![...picturePostsUrls, ...picturesAlreadyUploaded].includes(pictureUrl))
											if (picturesAlreadyUploadedToRemove.length) {
												await deletePostPictures(picturesAlreadyUploadedToRemove)
											}

											await updatePost('posts', initialPostData.postId, postDataToSave)

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
											updateUserContext(postDataToSave, postsUpdated as any[]) // TODO Type
											setIsLoading(false)
											navigateBackwards()
										}
									},
								)
								.catch((err) => {
									console.log(err)
									Alert.alert('Error', 'Picture went wrong')
									setIsLoading(false)
								})
						},
					)
				},
			)
		})

		return picturePostsUrls
	}

	const updateUserContext = (postAfterEdit: PostCollectionRemote | false, updatedLocationPosts?: PostCollectionRemote[] | []) => {
		const allPosts = updatedLocationPosts && updatedLocationPosts.length ? [...updatedLocationPosts] : [...getUserPostsWithoutEdited()]

		userContext.setUserDataOnContext({
			posts: postAfterEdit
				? [
					...allPosts,
					postAfterEdit
				]
				: [...allPosts]
		})
	}

	const cancelAllChangesAndGoBack = () => {
		if ((!Object.keys(editDataContext.unsaved).length) && !offlinePost && !unsavedPost) {
			navigateBackwards()
			return
		}

		toggleDefaultConfirmationModalVisibility()
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible)
	}

	const toggleOfflinePostAlertModal = () => setOfflinePostAlertModalIsVisible((previousState) => !previousState)

	const userSubscribeIsValid = () => {
		if (!userDataContext.subscription) {
			if (getPostField('range') === 'near') return true
			return false
		}

		const rangeOnContext = userDataContext.subscription.subscriptionRange

		if (rangeOnContext === 'near' && getPostField('range') === 'city') return false
		if (rangeOnContext === 'near' && getPostField('range') === 'country') return false
		if (rangeOnContext === 'city' && getPostField('range') === 'country') return false

		return true
	}

	const removeOfflinePost = async () => {
		await deletePostByDescription(initialPostData.description)
		navigateBackwards()
	}

	const getHeaderButtonLabel = () => {
		if (!networkConnectionIsValid) {
			return 'salvar post offline'
		}

		if (!userSubscribeIsValid()) {
			return 'ir para pagamento'
		}
		return unsavedPost ? 'publicar post' : 'salvar alterações'
	}

	const getHeaderButtonLabelHighlightedWords = () => {
		if (!networkConnectionIsValid) {
			return ['offline']
		}

		if (!userSubscribeIsValid()) {
			return ['pagamento']
		}
		return unsavedPost ? ['publicar'] : ['salvar']
	}

	const getHeaderButtonIcon = () => {
		if (!networkConnectionIsValid) {
			return WirelessOffWhiteIcon
		}

		if (!userSubscribeIsValid()) {
			return HandOnMoneyWhiteIcon
		}
		return unsavedPost ? PlusWhiteIcon : CheckWhiteIcon
	}

	const getHeaderButtonHandler = () => {
		if (!userSubscribeIsValid()) {
			return navigateToSubscriptionContext
		}
		return unsavedPost ? savePost : editPost
	}

	const presentationPostCardData = {
		...initialPostData,
		...editDataContext.unsaved,
		createdAt: new Date(),
		description: (editDataContext.unsaved.description || initialPostData.description) || 'escreva uma descrição para seu post',
	}

	return (
		<Container>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'descartar'}
				text={`você tem certeza que deseja descartar as alterações realizadas no post ${getShortText(getPostField('description'), 70)}?`}
				highlightedWords={[...getShortText(getPostField('description'), 70).split(' ')]}
				buttonKeyword={'descartar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={navigateBackwards}
			/>
			<WithoutNetworkConnectionAlert
				visibility={offlinePostAlertModalIsVisible}
				onPressButton={toggleOfflinePostAlertModal}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={unsavedPost ? 'revisar seu post' : 'editar seu post'}
					highlightedWords={unsavedPost ? ['revisar'] : ['editar']}
					destructiveButton={((!!Object.keys(editDataContext.unsaved).length || unsavedPost) && !offlinePost)}
					onBackPress={cancelAllChangesAndGoBack}
					endButton={offlinePost}
					endButtonColor={theme.red3}
					endButtonSvgIcon={TrashWhiteIcon}
					endButtonPress={removeOfflinePost}
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
										color={networkConnectionIsValid ? theme.green3 : theme.yellow3}
										label={getHeaderButtonLabel()}
										labelColor={networkConnectionIsValid ? theme.white3 : theme.black4}
										highlightedWords={getHeaderButtonLabelHighlightedWords()}
										fontSize={16}
										SecondSvgIcon={getHeaderButtonIcon()}
										svgIconScale={['40%', '20%']}
										minHeight={relativeScreenHeight(6)}
										relativeHeight={relativeScreenHeight(8)}
										onPress={getHeaderButtonHandler() as any} // TODO Type
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body backgroundColor={backgroundColor}>
				{
					unsavedPost && (
						<>
							<SubtitleCard
								text={'seu post'}
								highlightedText={['post']}
							/>
							<PostCardContainer backgroundColor={backgroundColor} hasError={hasError}>
								<PostCard
									owner={owner}
									post={presentationPostCardData}
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
				<BodyPadding backgroundColor={backgroundColor} hasError={hasError} >
					{children}
					<VerticalSigh height={relativeScreenHeight(1.5)} />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { EditPost }
