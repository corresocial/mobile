import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { useUtils } from '@newutils/useUtils'

import { Chat } from '@domain/chat/entity/types'
import { useImpactReportDomain } from '@domain/impactReport/useImpactReportDomain'
import { CultureEntityOptional, CultureEntity } from '@domain/post/entity/types'

import { useImpactReportRepository } from '@data/impactReport/useImpactReportRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { CultureStackParamList } from '@routes/Stack/CultureStack/types'
import { PostViewHomeScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { HomeTabParamList } from '@routes/Tabs/HomeTab/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiPostUtils } from '@utils-ui/post/UiPostUtils'

import { Body, GroupInfo, Header, OptionsArea } from './styles'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { ImpactReportModal } from '@components/_modals/ImpactReportModal'
import { ImpactReportSuccessModal } from '@components/_modals/ImpactReportSuccessModal'
import { RejectModal } from '@components/_modals/RejectModal'
import { WaitingApproveModal } from '@components/_modals/WaitingApproveModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'
import { PostPopOver } from '@components/PostPopOver'
import { ContextHeader } from '@newComponents/ContextHeader'
import { MapView } from '@newComponents/MapView'
import { MediaView } from '@newComponents/MediaView'
import { MiniUserIndentifier } from '@newComponents/MiniUserIdentifier'
import { PostInfo } from '@newComponents/PostInfo'
import { StandardButton } from '@newComponents/StandardButton'

const { localStorage } = useUserRepository()
const { remoteStorage } = usePostRepository()
const { sendImpactReport } = useImpactReportDomain()

const { convertTextToNumber, arrayIsEmpty } = UiUtils()
const { mergeArrayPosts } = UiPostUtils()
const { mergeObjects } = useUtils()

function PostView({ route, navigation }: PostViewHomeScreenProps) {
	const { userDataContext, userPostsContext, updateUserPost, removeUserPost } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [impactReportModalIsVisible, setImpactReportModalIsVisible] = useState(false)
	const [impactReportSuccessModalIsVisible, setImpactReportSuccessModalIsVisible] = useState(false)
	const [waitingApproveModalIsVisible, setWaitingApproveModalIsVisible] = useState(false)
	const [rejectModalIsVisible, setRejectModalIsVisible] = useState(false)

	const [postLoaded, setPostLoaded] = useState(false)
	const [postData, setPostData] = useState<CultureEntity>(route.params.postData || null)
	const [approvedPostData, setApprovedPostData] = useState<CultureEntity>(route.params?.postData || null)

	useEffect(() => {
		getPost()
		return () => {
			clearEditContext()
		}
	}, [])

	const getPost = async () => {
		if (route.params.redirectedPostId) {
			const post = await remoteStorage.getPostById(route.params.redirectedPostId)
			setPostData(post as CultureEntity)
			setApprovedPostData(post as CultureEntity)
			setIsCompleted(!!(post && post.completed))
			setPostLoaded(true)
			return
		}
		setIsCompleted(!!(postData && postData.completed))
		setPostLoaded(true)
		mergeUnapprovedPostData()
	}

	const mergeUnapprovedPostData = () => {
		if (canRenderUnapprovedData()) {
			const mergedPost = mergeObjects(postData, postData.unapprovedData as any)
			setPostData(mergedPost)
		}
	}

	const canRenderUnapprovedData = () => {
		return loggedUserIsOwner() && postData && postData.unapprovedData
	}

	const loggedUserIsOwner = () => {
		if (!postData || !postData.owner) return false
		return userDataContext.userId === postData.owner.userId
	}
	const isAuthor = loggedUserIsOwner()

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const markAsCompleted = async (impactValue: string) => {
		try {
			const updatedUserPost = { ...postData, completed: !isCompleted }

			remoteStorage.markPostAsComplete(postData.postId, postData, !isCompleted)
			localStorage.saveLocalUserData({ ...userDataContext, posts: mergeArrayPosts(userPostsContext, updatedUserPost) })

			updateUserPost(updatedUserPost)
			setPostOptionsIsOpen(false)
			!isCompleted && saveImpactReport(impactValue)
			setIsCompleted(!isCompleted)
		} catch (err) {
			console.log(err)
		}
	}

	const saveImpactReport = async (impactValue: string) => {
		const numericImpactValue = convertTextToNumber(impactValue) || 0
		const usersIdInvolved = [userDataContext.userId]
		await sendImpactReport(useImpactReportRepository, usersIdInvolved, numericImpactValue, postData.postType)

		toggleImpactReportSuccessModalVisibility()
	}

	const deletePost = async () => {
		await removeUserPost(postData)
		backToPreviousScreen()
	}

	const goToEditPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('CultureStack' as any, {
			screen: 'EditCulturePostReview' as keyof CultureStackParamList,
			params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
		})
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nhttps://corre.social/p/${getPostField('postId')}`)
	}

	const getUserProfilePictureFromContext = () => {
		if (userDataContext && userDataContext.profilePictureUrl) {
			return userDataContext.profilePictureUrl[0] || ''
		}
		return ''
	}

	const openChat = async () => {
		const userId1 = userDataContext.userId
		const userId2 = postData.owner.userId

		navigation.navigate('HomeTab' as any, {
			screen: 'ChatStack' as keyof HomeTabParamList
		})
		setTimeout(() => {
			navigation.navigate('ChatMessages' as any, {
				chat: {
					chatId: '',
					user1: {
						userId: userId1 || '',
						name: userDataContext.name || '',
						profilePictureUrl: getUserProfilePictureFromContext()
					},
					user2: {
						userId: userId2,
						name: postData.owner.name,
						profilePictureUrl: getProfilePictureUrl() || ''
					},
					messages: {}
				} as Chat
			})
		}, 50)
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage' as any, {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedType: postData.postType,
			reportedId: postData.postId
		})
	}

	const navigateToProfile = () => {
		if (userDataContext.userId === postData.owner.userId && !route.params.redirectedPostId) {
			return navigation.navigate('Profile' as any)
		}
		navigation.navigate('ProfileHome' as any, { userId: postData.owner.userId })// TODO Type
	}

	const getPostField = (fieldName: keyof CultureEntityOptional, allowNull?: boolean) => {
		if (allowNull && editDataContext.saved[fieldName] === '' && postData[fieldName]) return ''
		return editDataContext.saved[fieldName] || postData[fieldName]
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible), 400)
	}

	const toggleImpactReportModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setImpactReportModalIsVisible(!impactReportModalIsVisible), 500)
	}

	const toggleImpactReportSuccessModalVisibility = () => {
		setTimeout(() => setImpactReportSuccessModalIsVisible(!impactReportSuccessModalIsVisible), 500)
	}

	const toggleWaitingApproveModalVisibility = () => {
		setWaitingApproveModalIsVisible(!waitingApproveModalIsVisible)
	}

	const toggleRejectModalVisibility = () => {
		setRejectModalIsVisible(!rejectModalIsVisible)
	}

	if (!postLoaded) {
		return (
			<Loader flex />
		)
	}

	return (
		<ScreenContainer
			tone={'blue'}
			infinityBottom
			enableSectionPadding
			firstSection={(
				<Header>
					<ContextHeader
						title={(
							<MiniUserIndentifier
								navigateToProfile={navigateToProfile}
								owner={postData.owner}
								postedAt={postData.createdAt}
							/>
						)}
						onBack={() => navigation.goBack()}
					/>
					<VerticalSpacing />
					<OptionsArea>
						{
							!isAuthor && (
								<StandardButton
									icon={'share'}
									relativeWidth={relativeScreenWidth(12)}
									onPress={sharePost}
								/>
							)
						}
						{
							isCompleted
								? (
									<SmallButton
										label={'post foi concluído'}
										labelColor={theme.black4}
										SvgIcon={DeniedWhiteIcon}
										relativeWidth={'80%'}
										height={relativeScreenWidth(12)}
										onPress={() => { }}
									/>
								)
								: (
									<StandardButton
										text={isAuthor ? 'compartilhar' : 'conversar'}
										backgroundColor={theme.colors.green[4]}
										icon={isAuthor ? 'share' : 'chat'}
										iconHeight={30}
										iconWidth={30}
										textTheme={'light'}
										relativeWidth={isAuthor ? '80%' : '63%'}
										onPress={isAuthor ? sharePost : openChat}
									/>
								)
						}
						<PostPopOver
							postTitle={getShortText(getPostField('description'), 45) || 'publicação no corre.'}
							popoverVisibility={postOptionsIsOpen}
							closePopover={() => setPostOptionsIsOpen(false)}
							isAuthor={isAuthor || false}
							isCompleted={isCompleted}
							goToComplaint={reportPost}
							markAsCompleted={!isCompleted ? toggleImpactReportModalVisibility : markAsCompleted}
							editPost={goToEditPost}
							deletePost={toggleDefaultConfirmationModalVisibility}
						>
							<StandardButton
								icon={'threeDots'}
								onPress={() => setPostOptionsIsOpen(true)}
							/>
						</PostPopOver>
					</OptionsArea>
				</Header>
			)}
			thirdSecton={(
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ width: '100%' }}
				>
					<Body>
						<VerticalSpacing />
						<GroupInfo>
							<PostInfo
								type={'description'}
								value={'loren ipson loren ipson loren ipson loren ipson loren ipson loren ipson loren ipso'}
							/>
							<PostInfo
								type={'macroCategory'}
								value={getPostField('macroCategory')}
							/>
							<PostInfo
								type={'placeModality'}
								value={'presential'}
							/>
							<PostInfo
								type={'price'}
								value={{ saleValue: '100' }}
							/>
							<PostInfo
								type={'link'}
								value={getPostField('links') || ['https://sitedaora.com']}
							/>
							<PostInfo
								type={'dateTime'}
								value={{
									weekDaysfrequency: 'everyday',
									daysOfWeek: ['dom'],
									repetition: 'everyDay',
									startDate: new Date().setDate(22) as any,
									endDate: new Date().setDate(15) as any,
									startTime: new Date().setHours(5) as any,
									endTime: new Date().setHours(20 as any)
								}}
							/>
						</GroupInfo>
						<VerticalSpacing />
						<MapView
							online={false}
							locationView={'public'}
							location={getPostField('location')}
						/>
						<VerticalSpacing />
						<MediaView
							picturesUrl={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo7-n3i4ozalW-D_kGWM-M34z5eCUv5vyYA&s']}
						/>
						<VerticalSpacing bottomNavigatorSpace />
					</Body>
				</ScrollView>
			)}
		>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'apagar post'}
				text={`você tem certeza que deseja apagar o post ${getShortText(getPostField('description'), 70)}?`}
				highlightedWords={[...getShortText(getPostField('description'), 70).split(' ')]}
				buttonKeyword={'apagar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={deletePost}
			/>
			<ImpactReportModal // IMPACT REPORT
				visibility={impactReportModalIsVisible}
				closeModal={toggleImpactReportModalVisibility}
				onPressButton={(impactValue?: string) => markAsCompleted(impactValue as string)}
			/>
			<ImpactReportSuccessModal // IMPACT REPORT SUCCESS
				visibility={impactReportSuccessModalIsVisible}
				closeModal={toggleImpactReportSuccessModalVisibility}
			/>
			<WaitingApproveModal // APPROVE
				visibility={waitingApproveModalIsVisible}
				closeModal={toggleWaitingApproveModalVisibility}
			/>
			<RejectModal // REJECT
				visibility={rejectModalIsVisible}
				closeModal={toggleRejectModalVisibility}
			/>
		</ScreenContainer >
	)
}

export { PostView }
