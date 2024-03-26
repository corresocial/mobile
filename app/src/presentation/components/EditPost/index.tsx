import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'

import { PostType } from '@domain/post/entity/types'

import { uploadImage } from '@data/imageStorage/uploadPicture'
import { usePostRepository } from '@data/post/usePostRepository'
import { updateDocField } from '@data/user/remoteRepository/sujeira/updateDocField'
import { useUserRepository } from '@data/user/useUserRepository'

import { LocalUserData } from '@contexts/AuthContext/types'

import { NotifyUsersByLocationParams } from '@services/cloudFunctions/types/types'
import { Id, PostCollection, PostCollectionRemote, UserCollection } from '@services/firebase/types'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'
import { getNetworkStatus } from '@utils/deviceNetwork'

import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import BellWhiteIcon from '@assets/icons/bell-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import HandOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { PostCard } from '@components/_cards/PostCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { WithoutNetworkConnectionAlert } from '@components/_modals/WithoutNetworkConnectionAlert'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { DefaultPostViewHeader } from '../DefaultPostViewHeader'
import { Loader } from '../Loader'

const { localStorage } = useUserRepository()
const { localStorage: localPostStorage, remoteStorage } = usePostRepository()

const { notifyUsersOnLocation } = useCloudFunctionService()

type UserContextFragment = {
	userDataContext: UserCollection;
	setUserDataOnContext: (data: UserCollection) => void;
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
	getPostField: <K extends keyof PostCollectionRemote>(fieldName: K, allowNull?: boolean) => PostCollectionRemote[K]
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
	const [notifyUsersEnabled, setNotifyUsersEnabled] = useState(false)

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

	const locationRangeChanged = () => { // REFACTOR Refatorar função
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
			let userPostsUpdated: PostCollection[] = []
			if (locationRangeChanged()) {
				userPostsUpdated = await remoteStorage.updateRangeAndLocationOnPosts(
					owner,
					getUserPostsWithoutEdited(),
					{
						range: getPostField('range'),
						location: getPostField('location')
					}
				) as PostCollection[]
			}

			userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUserPostsWithoutEdited()

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
				await remoteStorage.deletePostPictures(picturesAlreadyUploadedToRemove)
			}

			await remoteStorage.updatePostData(initialPostData.postId, postDataToSave)

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

			updateUserContext(postDataToSave, userPostsUpdated as PostCollectionRemote[])
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

		const postData = { ...initialPostData, completed: false, ...editDataContext.unsaved } as PostCollectionRemote

		if (offlinePost && !hasValidConnection) return

		if ((!hasValidConnection && !offlinePost) || !networkConnectionIsValid) {
			await localPostStorage.saveOfflinePost({ ...postData, owner })
			navigateToProfile && navigateToProfile()
			return
		}

		await localPostStorage.saveOfflinePost({ ...postData, owner })

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
			let userPostsUpdated: PostCollection[] = []
			if (locationRangeChanged()) {
				console.log(`localização ou range mudaram: ${locationRangeChanged()}`)
				userPostsUpdated = await remoteStorage.updateRangeAndLocationOnPosts(
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
				const postId = await remoteStorage.createPost(postData, localUser, postData.postType as PostType) // REFACTOR remote as
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					postData,
					userPostsUpdated
				)

				clearTimeout(timeoutId)
				deleteOfflinePostByDescription(postData.description)
				if (notifyUsersEnabled) {
					await notifyUsersOnLocation({
						state: postData.location.state as string,
						city: postData.location.city as string,
						district: postData.location.district as string,
						postRange: postData.range as NotifyUsersByLocationParams['postRange']
					}, {
						postDescription: postData.description,
						userId: localUser.userId,
						userName: localUser.name as string
					})
				}

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

												const postId = await remoteStorage.createPost(postDataWithPicturesUrl, localUser, postData.postType as PostType) // REFACTOR remote as
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													postDataWithPicturesUrl,
													userPostsUpdated
												)

												clearTimeout(timeoutId)
												deleteOfflinePostByDescription(postData.description)

												if (notifyUsersEnabled) {
													await notifyUsersOnLocation({
														state: postData.location.state as string,
														city: postData.location.city as string,
														district: postData.location.district as string,
														postRange: postData.range as NotifyUsersByLocationParams['postRange']
													}, {
														postDescription: postData.description,
														userId: localUser.userId as Id,
														userName: localUser.name as string
													})
												}

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
				const localUserPosts = localUser.posts ? [...localUser.posts] as PostCollectionRemote[] : []
				userContext.setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner } as PostCollectionRemote
					],
				})
				localStorage.saveLocalUserData({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{ ...postDataToSave, owner }
					],
				})

				setIsLoading(false)
				showShareModal(true, getShortText(postDataToSave.description, 70), postDataToSave.postId)
				navigateToPostView({ ...postDataToSave, owner })
			})
			.catch((err: any) => {
				console.log(err)
				Alert.alert('Error', 'Second went wrong')
				setIsLoading(false)
				setHasError(true)
			})
	}

	const deleteOfflinePostByDescription = async (description: string) => {
		await localPostStorage.deleteOfflinePostByDescription(description)
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

	const userHasGovernmentProfileSeal = () => {
		return userDataContext.verified
			&& (userDataContext.verified.type === 'government' || userDataContext.verified.admin)
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
												await remoteStorage.deletePostPictures(picturesAlreadyUploadedToRemove)
											}

											await remoteStorage.updatePostData(initialPostData.postId, postDataToSave)

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
											updateUserContext(postDataToSave, postsUpdated as PostCollectionRemote[])
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

	const toggleOfflinePostAlertModal = () => {
		setOfflinePostAlertModalIsVisible((previousState) => !previousState)
	}

	const toggleNotifyUsers = () => {
		setNotifyUsersEnabled(!notifyUsersEnabled)
	}

	const userSubscribeIsValid = () => {
		if (getPostField('range') === 'city' && getPostField('postType') === 'socialImpact') return true

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
		await localPostStorage.deleteOfflinePostByDescription(initialPostData.description)
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
							<VerticalSpacing height={relativeScreenHeight(2)} />
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
									{
										userHasGovernmentProfileSeal() && unsavedPost && (
											<PrimaryButton
												color={notifyUsersEnabled ? theme.orange1 : theme.white3}
												label={'   notificar \n   usuários'}
												labelColor={theme.black4}
												highlightedWords={['notificar', 'usuários']}
												fontSize={12}
												SecondSvgIcon={BellWhiteIcon}
												svgIconScale={['70%', '30%']}
												minHeight={relativeScreenHeight(4)}
												relativeHeight={relativeScreenHeight(6)}
												relativeWidth={'40%'}
												onPress={toggleNotifyUsers}
											/>
										)
									}
									<PrimaryButton
										color={networkConnectionIsValid ? theme.green3 : theme.yellow3}
										label={getHeaderButtonLabel()}
										labelColor={networkConnectionIsValid ? theme.white3 : theme.black4}
										highlightedWords={getHeaderButtonLabelHighlightedWords()}
										fontSize={13}
										SecondSvgIcon={getHeaderButtonIcon()}
										svgIconScale={['50%', '30%']}
										minHeight={relativeScreenHeight(4)}
										relativeHeight={relativeScreenHeight(6)}
										relativeWidth={userHasGovernmentProfileSeal() && unsavedPost ? '55%' : '100%'}
										onPress={getHeaderButtonHandler()}
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
					<VerticalSpacing height={relativeScreenHeight(1.5)} />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { EditPost }
