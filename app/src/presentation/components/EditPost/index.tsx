import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { useUtils } from '@newutils/useUtils'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { UserEntity, UserEntityOptional } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

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

const { getObjectDifferences } = useUtils()

const { updateUserRepository } = useUserDomain()
const { updatePost, saveUnapprovedPost } = usePostDomain()

const { localStorage: localPostStorage } = usePostRepository()

type UserContextFragment = {
	userDataContext: UserEntity;
	setUserDataOnContext: (data: UserEntityOptional) => void;
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
	initialPostData: PostEntity
	approvedPostData?: PostEntity
	owner: PostEntity['owner']
	backgroundColor: string
	unsavedPost?: boolean
	offlinePost?: boolean
	children: React.ReactNode | React.ReactNode[]
	userContext: UserContextFragment
	editContext: EditContextFragment
	navigateBackwards: () => void
	navigateToProfile?: () => void
	navigateToPostView: (postData: PostEntity) => void
	navigateToSubscriptionContext: () => void
	showShareModal: (visibility: boolean, postTitle?: string, postId?: string) => void
	getPostField: <K extends keyof PostEntity>(fieldName: K, allowNull?: boolean) => PostEntity[K]
}

function EditPost({
	initialPostData,
	approvedPostData,
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

	const editPostData = async () => {
		if (!editDataContext.unsaved) return

		const dataChanges = getObjectDifferences<PostEntity>(approvedPostData as PostEntity, { ...initialPostData, ...editDataContext.unsaved })
		console.log(dataChanges)
		if (!dataChanges) return

		try {
			setIsLoading(true)
			console.log(dataChanges)

			const postWithUnapprovedData = {
				...approvedPostData,
				unapprovedData: { ...dataChanges, updatedAt: new Date() }
			}

			const { updatedUserPosts, picturesUrlUploaded } = await updatePost(
				usePostRepository,
				userDataContext.subscription?.subscriptionRange,
				userDataContext.posts || [],
				initialPostData,
				postWithUnapprovedData as PostEntity,
				editDataContext.unsaved.picturesUrl || [],
				editDataContext.unsaved.videosUrl || []
			)

			await updateUserRepository(
				useUserRepository,
				userDataContext,
				{ posts: updatedUserPosts || [] }
			)

			updateUserContext({ ...userDataContext }, updatedUserPosts)
			changeStateOfEditedFields([...picturesUrlUploaded])

			setIsLoading(false)
			navigateBackwards()
		} catch (error: any) {
			console.log(error)
			setIsLoading(false)
			throw new Error(error)
		}
	}

	const savePostData = async () => {
		try {
			const postDataToSave = {
				...initialPostData,
				...editDataContext.unsaved,
				completed: false,
			} as PostEntity

			// await saveUnapprovedPost(usePostRepository, dataChangesWithUpdatedAt)

			/* const hasValidConnection = await checkNetworkStatus()

			const postDataToSave = {
				...initialPostData,
				...editDataContext.unsaved,
				completed: false,
			} as PostEntity

			if (offlinePost && !hasValidConnection) return

			if ((!hasValidConnection && !offlinePost) || !networkConnectionIsValid) {
				await localPostStorage.saveOfflinePost({ ...postDataToSave, owner })
				navigateToProfile && navigateToProfile()
				return
			}

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

			const { newPost, updatedUserPosts } = await savePost(
				usePostRepository,
				useCloudFunctionService,
				userDataContext.subscription?.subscriptionRange,
				userDataContext.posts || [],
				initialPostData,
				{ ...postDataToSave, owner },
				editDataContext.unsaved.picturesUrl || [],
				notifyUsersEnabled
			)

			await updateUserRepository(
				useUserRepository,
				{ ...userDataContext },
				{ posts: updatedUserPosts || [] }
			)

			updateUserContext({ ...userDataContext }, updatedUserPosts)

			clearTimeout(timeoutId)
			offlinePost && deleteOfflinePostByDescription(postDataToSave.description)

			showShareModal(true, getShortText(newPost.description, 70), newPost.postId)
			navigateToPostView(newPost)

			setIsLoading(false) */
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasError(true)
		}
	}

	const deleteOfflinePostByDescription = async (description: string) => {
		await localPostStorage.deleteOfflinePostByDescription(description)
	}

	const changeStateOfEditedFields = (uploadedPictures?: string[], uploadedVideos?: string[]) => {
		let newEditState
		if (uploadedPictures) {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved, picturesUrl: [...uploadedPictures] }, unsaved: {} }
		} else {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		}

		editContext.setEditDataOnContext(newEditState)
	}

	const userHasGovernmentProfileSeal = () => {
		return userDataContext.verified
			&& (userDataContext.verified.type === 'government' || userDataContext.verified.admin)
	}

	const updateUserContext = (user: UserEntity, updatedUserPosts?: PostEntity[]) => {
		userContext.setUserDataOnContext({ ...user, posts: updatedUserPosts })
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

	const userSubscribeIsValid = () => { // REFACTOR domain
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
		if (!networkConnectionIsValid) return 'salvar post offline'
		if (!userSubscribeIsValid()) return 'ir para pagamento'
		return unsavedPost ? 'publicar post' : 'salvar alterações'
	}

	const getHeaderButtonLabelHighlightedWords = () => {
		if (!networkConnectionIsValid) return ['offline']
		if (!userSubscribeIsValid()) return ['pagamento']
		return unsavedPost ? ['publicar'] : ['salvar']
	}

	const getHeaderButtonIcon = () => {
		if (!networkConnectionIsValid) return WirelessOffWhiteIcon
		if (!userSubscribeIsValid()) return HandOnMoneyWhiteIcon
		return unsavedPost ? PlusWhiteIcon : CheckWhiteIcon
	}

	const getHeaderButtonHandler = () => {
		if (!userSubscribeIsValid()) {
			return navigateToSubscriptionContext
		}
		return unsavedPost ? savePostData : editPostData
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
					(getObjectDifferences(initialPostData, editDataContext.unsaved) || unsavedPost) && (
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
												minHeight={relativeScreenHeight(5)}
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
										minHeight={relativeScreenHeight(5)}
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
									isOwner={owner.userId === userDataContext.userId}
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
