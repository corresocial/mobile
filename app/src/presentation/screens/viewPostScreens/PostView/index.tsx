import React, { useContext, useEffect, useState } from 'react'
import { Linking, ScrollView } from 'react-native'

import { sendEvent } from '@newutils/methods/analyticsEvents'
import { useUtils } from '@newutils/useUtils'

import { Chat } from '@domain/chat/entity/types'
import { useImpactReportDomain } from '@domain/impactReport/useImpactReportDomain'
import { PostEntity, IncomeEntity, CultureEntity, VacancyEntity, SocialImpactEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { useImpactReportRepository } from '@data/impactReport/useImpactReportRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { useLocationContext } from '@contexts/LocationContext'

import { CultureStackParamList } from '@routes/Stack/CultureStack/types'
import { PostViewHomeScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { HomeTabParamList } from '@routes/Tabs/HomeTab/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'
import { incomeCategories } from '@utils/postsCategories/incomeCategories'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'

import { Body, ButtonContainer, GroupContent, GroupInfo, Header, OptionsArea } from './styles'
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
import { HorizontalTagList } from '@newComponents/HorizontalTagList'
import { MapView } from '@newComponents/MapView'
import { MediaView } from '@newComponents/MediaView'
import { MiniUserIndentifier } from '@newComponents/MiniUserIdentifier'
import { PostInfo } from '@newComponents/PostInfo'
import { StandardButton } from '@newComponents/StandardButton'

const { localStorage } = useUserRepository()
const { remoteStorage } = usePostRepository()
const { sendImpactReport } = useImpactReportDomain()
const { updatePostPresenceList } = usePostDomain()

const { convertTextToNumber, arrayIsEmpty } = UiUtils()
const { mergeArrayPosts } = UiPostUtils()
const { mergeObjects } = useUtils()

function PostView({ route, navigation }: PostViewHomeScreenProps) {
	const { userDataContext, userPostsContext, updateUserPost, removeUserPost } = useContext(AuthContext)
	const { editDataContext, clearEditContext } = useContext(EditContext)
	const { locationDataContext, setLocationDataOnContext } = useLocationContext()

	const [isLoadingMore, setIsLoadingMore] = useState(false)

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [impactReportModalIsVisible, setImpactReportModalIsVisible] = useState(false)
	const [impactReportSuccessModalIsVisible, setImpactReportSuccessModalIsVisible] = useState(false)
	const [waitingApproveModalIsVisible, setWaitingApproveModalIsVisible] = useState(false)
	const [rejectModalIsVisible, setRejectModalIsVisible] = useState(false)

	const [postLoaded, setPostLoaded] = useState(false)
	const [postData, setPostData] = useState<PostEntity>(route.params.postData || null)
	const [approvedPostData, setApprovedPostData] = useState<PostEntity>(route.params?.postData || null)

	const getPostType = () => {
		if (postData) {
			if (postData.postType === 'income') return 'income'
			if (postData.postType === 'culture') return 'culture'
			if (postData.postType === 'socialImpact') return 'socialImpact'
			if (postData.macroCategory === 'vacancy') return 'vacancy'
		}
	}

	const postType = getPostType()!

	useEffect(() => {
		getPost(!!(postData.macroCategory === 'event' && postData.postId))
		return () => {
			clearEditContext()
		}
	}, [])

	const getPost = async (refresh?: boolean) => {
		if (route.params.redirectedPostId || refresh) {
			const post = await remoteStorage.getPostById(refresh ? postData.postId : route.params.redirectedPostId)
			setApprovedPostData(post as PostEntity)
			setIsCompleted(!!(post && post.completed))
			setPostLoaded(true)
			sendEvent('visualized_post', { macroCategory: post?.macroCategory, postId: post?.postId })
			return
		}
		setIsCompleted(!!(postData && postData.completed))
		setPostLoaded(true)
		sendEvent('visualized_post', { macroCategory: postData?.macroCategory, postId: postData?.postId })
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

	const confirmPresence = async () => {
		const newPostData = await updatePostPresenceList(usePostRepository, postData.postId, userDataContext.userId)
		if (newPostData) {
			setPostData(newPostData)
		} else {
			console.error('newPostData is undefined')
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

		switch (postData.postType) {
			case 'income': {
				if (postData.macroCategory === 'vacancy') {
					return navigation.navigate('VacancyStack' as any, {
						screen: 'EditVacancyPostReview' as keyof CultureStackParamList,
						params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
					})
				}
				if (postData.macroCategory === 'sale') {
					return navigation.navigate('SaleStack' as any, {
						screen: 'EditSalePostReview' as keyof CultureStackParamList,
						params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
					})
				}
				if (postData.macroCategory === 'service') {
					return navigation.navigate('ServiceStack' as any, {
						screen: 'EditServicePostReview' as keyof CultureStackParamList,
						params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
					})
				}
				break
			}
			case 'culture': {
				return navigation.navigate('CultureStack' as any, {
					screen: 'EditCulturePostReview' as keyof CultureStackParamList,
					params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
				})
			}
			case 'socialImpact': {
				return navigation.navigate('SocialImpactStack' as any, {
					screen: 'EditSocialImpactPostReview' as keyof CultureStackParamList,
					params: { postData: { ...postData, ...editDataContext.saved }, approvedPostData: approvedPostData }
				})
			}
		}
	}

	const backToPreviousScreen = () => {
		setPostOptionsIsOpen(false)
		navigation.goBack()
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nhttps://corre.social/p/${getPostField('postId', postType)}`)
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

		if (postData.owner.redirect) {
			return Linking.openURL(postData.owner.redirect)
		}
		navigation.navigate('ProfileHome' as any, { userId: postData.owner.userId })// TODO Type
	}

	type PostEntities = 'culture' | 'income' | 'vacancy' | 'socialImpact'
	type PostTypes<T extends PostEntities> =
		T extends 'income' ? IncomeEntity :
		T extends 'culture' ? CultureEntity :
		T extends 'vacancy' ? VacancyEntity :
		T extends 'socialImpact' ? SocialImpactEntity :
		any;

	const getPostField = <T extends PostEntities>(fieldName: keyof PostTypes<T>, role: T, allowNull?: boolean) => {
		const post = postData as PostTypes<T>
		if (allowNull && editDataContext.saved[fieldName] === '' && post[fieldName]) return ''
		return (editDataContext.saved[fieldName] || post[fieldName])
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

	const getPostCategory = () => {
		const category = getPostField('category', postType)
		return (({ ...cultureCategories, ...incomeCategories, ...socialImpactCategories } as any)[category] || { label: '' }).label || (category || '').toLowerCase()
	}

	const getSeeMoreTitle = (): string => {
		switch (postData.macroCategory) {
			case 'art': return 'Ver mais artes'
			case 'event': return 'Ver mais Eventos'
			case 'donation': return 'Ver mais Social'
			case 'education': return 'Ver mais Educação'
			case 'informative': return 'Ver mais Informativos'
			case 'iniciative': return 'Ver mais Iniciativas'
			case 'sale': return 'Ver mais Comércio'
			case 'service': return 'Ver mais Serviços'
			case 'vacancy': return 'Ver mais Vagas'
		}
		return 'Ver mais posts'
	}

	const seeMorePressHandler = () => {
		// CURRENT Loading não aparecendo
		setIsLoadingMore(true)
		if (!postData.macroCategory || route.name !== 'PostViewHome') return
		setLocationDataOnContext({ searchParams: { ...locationDataContext.searchParams, macroCategory: postData.macroCategory, postType: postData.postType } })

		setIsLoadingMore(false)
		switch (postData.macroCategory) {
			case 'event': return navigation.navigate('EventsCalendar')
			case 'art': return navigation.navigate('PostCategories')
			case 'donation': return navigation.navigate('PostCategories')
			case 'education': return navigation.navigate('PostCategories')
			case 'informative': return navigation.navigate('PostCategories')
			case 'iniciative': return navigation.navigate('PostCategories')
			case 'sale': return navigation.navigate('PostCategories')
			case 'service': return navigation.navigate('PostCategories')
			case 'vacancy': return navigation.navigate('PostCategories')
		}
	}

	const getRelativePostTone = () => {
		switch (postData.postType) {
			case 'income':
				return 'green'
			case 'culture':
				return 'blue'
			case 'socialImpact':
				return 'pink'
			default:
				return 'orange'
		}
	}

	if (!postLoaded) {
		return (
			<Loader flex />
		)
	}

	return (
		<ScreenContainer
			tone={getRelativePostTone()}
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
									(getPostField('macroCategory', 'culture') === 'event') ? (
										<StandardButton
											text={isAuthor ? 'compartilhar'
												: postData.presenceList?.includes(userDataContext.userId)
													? 'não vou mais' : 'eu vou!'}
											backgroundColor={postData.presenceList && postData.presenceList.length ? theme.colors.red[3] : theme.colors.green[4]}
											icon={isAuthor ? 'share' : 'personWalking'}
											iconHeight={30}
											iconWidth={30}
											textTheme={'light'}
											relativeWidth={isAuthor ? '80%' : '63%'}
											onPress={isAuthor ? sharePost : confirmPresence}
										/>
									) : (
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
								)
						}
						<PostPopOver
							postTitle={getShortText(getPostField('description', postType), 45) || 'publicação no corre.'}
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
						<MediaView
							picturesUrl={getPostField('picturesUrl', postType)}
							videosUrl={getPostField('videosUrl', postType)}
							indicatorTone={getRelativePostTone()}
						/>
						<GroupInfo>
							<VerticalSpacing height={7} relativeDensity />
							<HorizontalTagList
								tags={[getPostCategory(), ...getPostField('tags', postType)]}
								selectedColor={theme.colors[getRelativePostTone()][1]}
							/>
							<GroupContent>
								<PostInfo
									type={'description'}
									value={getPostField('description', postType)}
								/>
								<PostInfo
									type={'macroCategory'}
									value={getPostField('macroCategory', postType)}
								/>
								<PostInfo
									title={getPostField('macroCategory', postType) === 'vacancy' ? 'Remuneração:' : ''}
									type={'price'}
									value={{
										saleValue: getPostField('entryValue', 'culture') || getPostField('saleValue', 'income'),
										exchangeValue: getPostField('exchangeValue', 'income'),
										isEvent: getPostField('postType', 'culture') === 'culture'
									}}
								/>
								<PostInfo
									type={'productStatus'}
									value={getPostField('itemStatus', 'income')}
								/>
								<PostInfo
									type={'deliveryMethod'}
									value={getPostField('deliveryMethod', 'income')}
								/>
								<PostInfo
									type={'link'}
									value={getPostField('links', postType)}
								/>
								<PostInfo
									title={'Local de atuação'}
									type={'range'}
									value={getPostField('exhibitionPlace', 'socialImpact')}
								/>
								<PostInfo
									type={'placeModality'}
									value={getPostField('eventPlaceModality', 'culture') || getPostField('workplace', 'vacancy')}
								/>
								<PostInfo
									type={'importantPoints'}
									value={getPostField('importantPoints', 'vacancy')}
								/>
								<PostInfo
									type={'dateTime'}
									value={{
										weekDaysfrequency: getPostField('attendanceFrequency', 'income'),
										daysOfWeek: getPostField('daysOfWeek', 'income'),
										repetition: getPostField('repeat', 'culture'),
										startDate: getPostField('startDate', 'culture'),
										endDate: getPostField('endDate', 'culture'),
										startTime: getPostField('startHour', 'culture'),
										endTime: getPostField('endHour', 'culture'),
									}}
								/>
								<PostInfo
									type={'range'}
									value={getPostField('range', postType)}
								/>
								<PostInfo
									type={'presenceList'}
									value={getPostField('presenceList', postType)}
								/>
							</GroupContent>
						</GroupInfo>
						<VerticalSpacing />
						<MapView
							online={getPostField('workplace', 'vacancy') === 'homeoffice' || getPostField('eventPlaceModality', 'culture') === 'online'}
							locationView={getPostField('locationView', postType)}
							location={getPostField('location', postType)}
						/>
						<VerticalSpacing />
						{
							route.name === 'PostViewHome' && (
								<ButtonContainer>
									{
										isLoadingMore
											? (
												<Loader animationScale={70} flex />
											)
											: (
												<StandardButton
													text={getSeeMoreTitle()}
													relativeWidth={'50%'}
													icon={'calendarEveryday'}
													textTheme={'dark'}
													onPress={seeMorePressHandler}
												/>
											)
									}
								</ButtonContainer>
							)
						}
						<VerticalSpacing bottomNavigatorSpace />
					</Body>
				</ScrollView>
			)}
		>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'apagar post'}
				text={`você tem certeza que deseja apagar o post ${getShortText(getPostField('description', postType), 70)}?`}
				highlightedWords={[...getShortText(getPostField('description', postType), 70).split(' ')]}
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
