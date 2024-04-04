import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { PollEntity } from '@domain/poll/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { EditPollScreenProps } from '@routes/Stack/PollStack/screenProps'
import { PollStackParamList } from '@routes/Stack/PollStack/types'

import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PollCard } from '@components/_cards/PollCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { Loader } from '@components/Loader'

function EditPoll({ route, navigation }: EditPollScreenProps) {
	const { editDataContext } = useContext(EditContext)
	const { userDataContext } = useContext(AuthContext)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const pollOwner: UserOwner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { pollData, unsavedPoll } = route.params

	const getPollField = (fieldName: keyof PollEntity, allowNull?: boolean) => {
		const currentPostData = { ...pollData, postType: 'income' }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const editPoll = async () => {
		console.log('editar post')
		/* if (!editDataContext.unsaved) return

		const postDataToSave: PostEntity = { ...initialPostData, ...editDataContext.unsaved }

		try {
			setIsLoading(true)

			const { updatedUserPosts, picturesUrlUploaded } = await updatePostData(
				usePostRepository,
				userDataContext.subscription?.subscriptionRange,
				userDataContext.posts || [],
				initialPostData,
				postDataToSave,
				editDataContext.unsaved.picturesUrl || []
			)

			await updateUserRepository(
				useUserRepository,
				userDataContext,
				{ posts: updatedUserPosts || [] }
			)

			updateUserContext(updatedUserPosts)
			changeStateOfEditedFields([...picturesUrlUploaded])

			setIsLoading(false)
			navigateBackwards()
		} catch (error: any) {
			console.log(error)
			setIsLoading(false)
			throw new Error(error)
		} */
	}

	const savePoll = async () => {
		console.log('salvar post')
	}

	/* const changeStateOfEditedFields = (uploadedPictures?: string[]) => {
		let newEditState
		if (uploadedPictures) {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved, picturesUrl: [...uploadedPictures] }, unsaved: {} }
		} else {
			newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		}

		editContext.setEditDataOnContext(newEditState)
	} */

	/* 	const allPicturesAlreadyUploaded = () => {
		return editDataContext.unsaved.picturesUrl.filter((url: string) => url.includes('https://')).length === editDataContext.unsaved.picturesUrl.length
	} */

	const cancelAllChangesAndGoBack = () => {
		if ((!Object.keys(editDataContext.unsaved).length) && !unsavedPoll) {
			navigateBackwards()
			return
		}

		toggleDefaultConfirmationModalVisibility()
	}

	const navigateToEditScreen = (screenName: keyof PollStackParamList, initialValue: keyof PollEntity, customStack?: string) => {
		let value = getPollField(initialValue, true)

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPollField('range')
			}
		}

		navigation.push(customStack || 'PollStack' as any, { // TODO Type
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible)
	}

	const navigateBackwards = () => navigation.goBack()

	const backgroundColor = theme.purple2

	return (
		<Container>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'descartar'}
				text={`você tem certeza que deseja descartar as alterações realizadas no post ${getShortText(getPollField('description'), 70)}?`}
				highlightedWords={[...getShortText(getPollField('description'), 70).split(' ')]}
				buttonKeyword={'descartar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={navigateBackwards}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={unsavedPoll ? 'revisar seu post' : 'editar seu post'}
					highlightedWords={unsavedPoll ? ['revisar'] : ['editar']}
					destructiveButton={((!!Object.keys(editDataContext.unsaved).length || unsavedPoll))}
					onBackPress={cancelAllChangesAndGoBack}
					endButtonColor={theme.red3}
					endButtonSvgIcon={TrashWhiteIcon}
				/>
				{
					(Object.keys(editDataContext.unsaved).length > 0 || unsavedPoll) && (
						isLoading ? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										label={'postar'}
										highlightedWords={['postar']}
										labelColor={theme.white3}
										fontSize={13}
										SecondSvgIcon={PlusWhiteIcon}
										svgIconScale={['50%', '30%']}
										minHeight={relativeScreenHeight(4)}
										relativeHeight={relativeScreenHeight(6)}
										onPress={unsavedPoll ? savePoll : editPoll}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body backgroundColor={backgroundColor}>
				{
					unsavedPoll && (
						<>
							<SubtitleCard
								text={'seu post'}
								highlightedText={['post']}
							/>
							<PostCardContainer backgroundColor={backgroundColor}>
								<PollCard
									owner={pollOwner}
									pollData={pollData}
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
				<BodyPadding backgroundColor={backgroundColor} >
					<DescriptionCard
						text={getPollField('description')}
						onEdit={() => navigateToEditScreen('InsertPollTitle', 'description')}
					/>
					<VerticalSpacing />
					<DescriptionCard
						text={getPollField('description')}
						onEdit={() => navigateToEditScreen('InsertPollDescription', 'description')}
					/>
					<VerticalSpacing />
					<PostRangeCard
						postRange={getPollField('range')}
						onEdit={() => navigateToEditScreen('SelectPollRange', 'range')}
					/>
					<VerticalSpacing />
					<LocationViewCard
						title={'localização'}
						locationView={'public'}
						textFontSize={16}
						location={getPollField('location')}
						onEdit={() => navigateToEditScreen('InsertPollLocation', 'location')}
					/>
					<VerticalSpacing height={relativeScreenHeight(1.5)} />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { EditPoll }

/* import React, { useContext, useEffect, useState } from 'react'

import { PostEntityOptional, IncomeEntityOptional, PostEntityCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StateContext } from '@contexts/StateContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { navigateToPostView } from '@routes/auxMethods'
import { EditPollScreenProps } from '@routes/Stack/PollStack/screenProps'
import { ServiceStackParamList } from '@routes/Stack/ServiceStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { theme } from '@common/theme'

import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { EditPost } from '@components/EditPost'
import { PollEntity } from '@domain/poll/entity/types'

const { arrayIsEmpty } = UiUtils()

function EditPoll({ route, navigation }: EditPollScreenProps) {
	const { setCurrentPostDataOnContext } = useContext(SubscriptionContext)
	const { setEditDataOnContext, editDataContext, clearUnsavedEditContext } = useContext(EditContext)
	const { userDataContext, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)

	const [locationChangeModalIsVisible, setLocationChangeModalIsVisible] = useState(false)
	const [postReviewPresentationModalIsVisible, setPostReviewPresentationModalIsVisible] = useState(false)

	const { pollData } = route.params
	const owner: PostEntityCommonFields['owner'] = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const getPostField = (fieldName: keyof PollEntity, allowNull?: boolean) => {
		const currentPostData = { ...pollData, postType: 'income' }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const showShareModal = (visibility: boolean, postTitle?: string, postId?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle,
			lastPostId: postId
		})
	}

	const navigateBackwards = () => {
		navigation.goBack()
	}

	const navigateToProfile = () => {
		navigation.navigate('Profile' as any)
	}

	const viewPostDetails = (post: PostEntityOptional) => {
		navigateToPostView(post, navigation) // TODO Implementar nas outras telas de revisão
	}

	const navigateToEditScreen = (screenName: keyof ServiceStackParamList, initialValue: keyof PollEntity, customStack?: string) => {
		let value = getPostField(initialValue, true)

		if (initialValue === 'location') {
			value = {
				coordinates: value.coordinates,
				postRange: getPostField('range')
			}
		}

		navigation.push(customStack || 'ServiceStack' as any, { // TODO Type
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const toggleRangeChangeModalVisibility = () => {
		setLocationChangeModalIsVisible(!locationChangeModalIsVisible)
	}

	const togglePostReviewPresentationModalVisibility = () => {
		setPostReviewPresentationModalIsVisible(!postReviewPresentationModalIsVisible)
	}

	const checkChangeLocationAlertIsRequired = () => {
		if (userDataContext.posts && userDataContext.posts.length < 1) navigateToEditScreen('SelectLocationView', 'location')

		if (userDataContext.subscription?.subscriptionRange === 'near') {
			toggleRangeChangeModalVisibility()
			return
		}

		navigateToEditScreen('SelectLocationView', 'location')
	}

	const navigateToSubscriptionContext = () => {
		setCurrentPostDataOnContext({
			...pollData,
			...editDataContext.unsaved,
			postType: 'income',
			macroCategory: 'service',
			createdAt: new Date(),
			owner: {
				userId: userDataContext.userId,
				name: userDataContext.name,
				profilePictureUrl: userDataContext.profilePictureUrl
			}
		})
		navigation.navigate('SelectSubscriptionPlan', { postRange: getPostField('range'), postReview: true })
	}

	const userContext = {
		userDataContext,
		setUserDataOnContext
	}

	const editContext = {
		editDataContext,
		setEditDataOnContext,
		clearUnsavedEditContext
	}

	return (
		<>
			<EditPost
				initialPostData={{ ...pollData }}
				owner={owner}
				backgroundColor={theme.green2}
				unsavedPost={unsavedPost}
				offlinePost={offlinePost}
				navigateBackwards={navigateBackwards}
				navigateToProfile={navigateToProfile}
				navigateToPostView={viewPostDetails}
				navigateToSubscriptionContext={navigateToSubscriptionContext}
				showShareModal={showShareModal}
				getPostField={getPostField}
				userContext={userContext}
				editContext={editContext}
			>
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertServiceDescription', 'description')}
				/>
				<DescriptionCard
					text={getPostField('description')}
					onEdit={() => navigateToEditScreen('InsertServiceDescription', 'description')}
				/>
				<VerticalSpacing />
				<PostRangeCard
					postRange={getPostField('range')}
					onEdit={() => navigateToEditScreen('SelectServiceRange', 'range')}
				/>
				<VerticalSpacing />
				<LocationViewCard
					title={'localização'}
					locationView={'public'}
					textFontSize={16}
					location={getPostField('location')}
					onEdit={checkChangeLocationAlertIsRequired}
				/>
			</EditPost>
		</>
	)
}

export { EditPoll }
 */
