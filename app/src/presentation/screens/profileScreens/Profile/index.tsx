import React, { useEffect, useState, useContext } from 'react'
import { ListRenderItem, RefreshControl, ScrollView, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useUtils } from '@newutils/useUtils'
import { useQueryClient } from '@tanstack/react-query'

import { Chat } from '@domain/chat/entity/types'
import { Id, PostEntityOptional, PostEntityCommonFields, PostRange, PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { CompleteUser, SocialMedia, UserEntity, UserEntityOptional, VerifiedLabelName } from '@domain/user/entity/types'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AlertContext } from '@contexts/AlertContext/index'
import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'
import { StripeContext } from '@contexts/StripeContext'

import { navigateToPostView } from '@routes/auxMethods'
import { ProfileTabScreenProps } from '@routes/Stack/ProfileStack/screenProps'
import { HomeTabParamList } from '@routes/Tabs/HomeTab/types'
import { FlatListItem } from 'src/presentation/types'

import { setFreeTrialPlans } from '@services/stripe/scripts/setFreeTrialPlans'
import { UiUtils } from '@utils-ui/common/UiUtils'
import { getNetworkStatus } from '@utils/deviceNetwork'

import {
	Body,
	Container,
	InfoArea,
	OptionsArea,
	ProfileHeader,
	ProfileInfoContainer,
	UserDescription,
	UserName,
	ExpandedUserDescription,
	ExpandedUserDescriptionArea,
	VerticalPaddingContainer,
	PostPadding,
	SeeMoreLabel,
	PostFilterContainer,
	UserPostsFlatList
} from './styles'
import AtSignWhiteIcon from '@assets/icons/atSign-white.svg'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import EditIcon from '@assets/icons/edit-white.svg'
import GearAlertWhiteIcon from '@assets/icons/gear-alert-white.svg'
import GearWhiteIcon from '@assets/icons/gear-white.svg'
import ShareIcon from '@assets/icons/share-white.svg'
import ThreeDotsIcon from '@assets/icons/threeDots.svg'
import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'
import WirelessOnWhiteIcon from '@assets/icons/wirelessOn-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { PostCard } from '@components/_cards/PostCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { ProfileVerifiedModal } from '@components/_modals/ProfileVerifiedModal'
import { RejectModal } from '@components/_modals/RejectModal'
import { WaitingApproveModal } from '@components/_modals/WaitingApproveModal'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { HorizontalSocialMediaList } from '@components/HorizontalSocialmediaList'
import { Loader } from '@components/Loader'
import { PhotoPortrait } from '@components/PhotoPortrait'
import { PopOver } from '@components/PopOver'
import { PostFilter } from '@components/PostFilter'
import { VerifiedUserBadge } from '@components/VerifiedUserBadge'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

const { remoteStorage } = useUserRepository()
const { localStorage } = usePostRepository()
const { executeCachedRequest } = useCacheRepository()

const { getPostsByOwner } = usePostDomain()

const { arrayIsEmpty, getNewDate } = UiUtils()
const { mergeObjects, getLastItem } = useUtils()

function Profile({ route, navigation }: ProfileTabScreenProps) {
	const { notificationState } = useContext(AlertContext)
	const { userDataContext, userPostsContext, loadUserPosts, setRemoteUserOnLocal } = useAuthContext()
	const { createCustomer, createSubscription, stripeProductsPlans } = useContext(StripeContext)
	const { setLoaderIsVisible } = useLoaderContext()

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
	const [hostDescriptionIsExpanded, setHostDescriptionIsExpanded] = useState(false)
	const [hasPostFilter, setHasPostFilter] = useState(false)
	const [isRefresing, setIsRefresing] = useState(false)

	const [user, setUser] = useState<UserEntityOptional>({})
	const [currentUserPosts, setCurrentUserPosts] = useState<PostEntity[]>([])
	const [postListIsOver, setPostListIsOver] = useState(false)
	const [filteredPosts, setFilteredPosts] = useState<PostEntity[]>([])
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)
	const [waitingApproveModalIsVisible, setWaitingApproveModalIsVisible] = useState(false)
	const [rejectModalIsVisible, setRejectModalIsVisible] = useState(false)
	const [toggleVerifiedModal, setToggleVerifiedModal] = useState(false)
	const [numberOfOfflinePostsStored, setNumberOfOfflinePostsStored] = useState(0)
	const [hasNetworkConnection, setHasNetworkConnection] = useState(false)

	const queryClient = useQueryClient()

	useEffect(() => {
		if (route.params && route.params.userId) {
			setIsLoggedUser(false)
			loadRemoteProfileData(true)
		} else {
			setIsLoggedUser(true)
		}
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			checkNetworkConnection()
			checkHasOfflinePosts()
		})

		return unsubscribe
	}, [navigation])

	const loadRemoteProfileData = async (firstLoad?: boolean, refresh?: boolean) => {
		try {
			firstLoad ? setLoaderIsVisible(true) : setIsRefresing(true)

			if (isLoggedUser) {
				await setRemoteUserOnLocal(userDataContext.userId, true)
				firstLoad ? setLoaderIsVisible(false) : setIsRefresing(false)
				return
			}

			if (!route.params?.userId) return
			const userData = await remoteStorage.getUserData(route.params?.userId!)
			if (!userData) return
			setUser(userData as UserEntity)
			await loadRemoteUserPosts(firstLoad, refresh, route.params?.userId)
		} catch (error) {
			console.log(error)
			firstLoad ? setLoaderIsVisible(false) : setIsRefresing(false)
		}
	}

	const loadRemoteUserPosts = async (firstLoad?: boolean, refresh?: boolean, userId?: string) => {
		try {
			isLoggedUser ? loadUserPosts(undefined, refresh) : await loadCurrentUserPosts(userId || '', refresh)
			firstLoad ? setLoaderIsVisible(false) : setIsRefresing(false)
		} catch (error) {
			firstLoad ? setLoaderIsVisible(false) : setIsRefresing(false)
			console.log(error)
		}
	}

	const loadMoreUserPosts = async () => {
		const loadedPosts = getUserPosts(true)
		console.log('currentLoadedPosts =>', loadedPosts && loadedPosts.length)
		if (loadedPosts && loadedPosts.length) {
			isLoggedUser ? loadUserPosts() : await loadCurrentUserPosts(user.userId || '', false)
		}
	}

	const loadCurrentUserPosts = async (userId: string, refresh?: boolean) => {
		try {
			if (postListIsOver && !refresh) return

			const lastPost = !refresh && (currentUserPosts && currentUserPosts.length) ? getLastItem(currentUserPosts) : undefined

			const queryKey = ['user.posts', userId, lastPost]
			let posts: PostEntity[] = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getPostsByOwner(usePostRepository, userId, 10, lastPost),
				refresh
			)
			posts = posts.map((p: PostEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (
				!posts || (posts && !posts.length)
				|| (lastPost && posts && posts.length && (lastPost.postId === getLastItem(posts)?.postId))) {
				setPostListIsOver(true)
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.posts', userId] })
				setPostListIsOver(false)
				setCurrentUserPosts([...posts])
			} else {
				setCurrentUserPosts([...currentUserPosts, ...posts])
			}
		} catch (error) {
			console.log(error)
		}
	}

	const checkHasOfflinePosts = async () => {
		const numberOfOfflinePosts = await localStorage.getNumberOfOfflinePosts()
		setNumberOfOfflinePostsStored(numberOfOfflinePosts)
	}

	const checkNetworkConnection = async () => {
		const networkStatus = await getNetworkStatus()
		setHasNetworkConnection(!!networkStatus.isConnected && !!networkStatus.isInternetReachable)
	}

	const viewPostDetails = (post: PostEntityOptional) => {
		const customStackLabel = route.params?.userId && !route.params?.stackLabel ? 'Home' : route.params?.stackLabel
		const postData = { ...post, owner: getOwnerDataOnly() }

		navigateToPostView(postData, navigation, customStackLabel)
	}

	const openProfileOptions = () => {
		!isLoggedUser
			? setProfileOptionsIsOpen(true)
			: navigation.navigate('Configurations')
	}

	const reportUser = () => {
		setProfileOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage', {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedId: getUserField('userId') as Id,
			reportedType: 'user',
		})
	}

	const goToEditProfile = async () => {
		navigation.navigate('EditProfile', { user: userDataContext })
	}

	const navigationToBack = () => navigation.goBack()

	const shareProfile = async () => {
		share(
			`${isLoggedUser
				? `olá! me chamo ${getUserField('name')} e tô no corre.`
				: `olha quem eu encontrei no corre.\n${getUserField(
					'name'
				)}`
			}\n\nhttps://corre.social/u/${getUserField('userId')}`
		)
	}

	const getUserProfilePictureFromContext = () => {
		if (userDataContext && userDataContext.profilePictureUrl) {
			return userDataContext.profilePictureUrl[0] || ''
		}
		return ''
	}

	const openChat = async () => {
		navigation.navigate('HomeTab' as any, {
			screen: 'ChatStack' as keyof HomeTabParamList
		})
		setTimeout(() => {
			navigation.navigate('ChatMessages' as any, {
				chat: {
					chatId: '',
					user1: {
						userId: userDataContext.userId || '',
						name: userDataContext.name || '',
						profilePictureUrl: getUserProfilePictureFromContext(),
					},
					user2: {
						userId: getUserField('userId') as Id,
						name: getUserField('name') as string,
						profilePictureUrl: getProfilePicture() || '',
					},
					messages: {},
				} as Chat
			})
		}, 50)
	}

	const openSocialMediaManagement = () => {
		navigation.navigate(isLoggedUser ? 'SocialMediaManagement' : 'SocialMediaManagementHome' as any, {
			userId: getUserField('userId'),
			socialMedias: getUserField('socialMedias') || [],
			isAuthor: isLoggedUser,
		})
	}

	type UserDataFields = keyof UserEntity
	const getUserField = (fieldName?: UserDataFields) => {
		if (route.params && route.params.userId) {
			if (!fieldName || !user) return user
			return user[fieldName]
		}

		if (canRenderUnapprovedData()) {
			const mergedPost = mergeObjects<CompleteUser>(userDataContext as CompleteUser, userDataContext.unapprovedData as UserEntity)
			return (mergedPost as any)[fieldName as any]
		}

		if (!fieldName) return userDataContext
		return userDataContext[fieldName]
	}

	const canRenderUnapprovedData = () => {
		return isLoggedUser && userDataContext && userDataContext.unapprovedData && !userDataContext.unapprovedData.reject
	}

	const canRenderWaitingApproveIndicator = () => {
		return (isLoggedUser && userDataContext && userDataContext.unapprovedData && !userDataContext.unapprovedData.reject)
	}

	const canRenderRejectIndicator = () => {
		return isLoggedUser && userDataContext && userDataContext.unapprovedData && userDataContext.unapprovedData.reject
	}

	const getOwnerDataOnly = () => {
		if (canRenderUnapprovedData()) {
			const mergedPost = mergeObjects<CompleteUser>(userDataContext as CompleteUser, userDataContext.unapprovedData as UserEntity)
			return { userId: mergedPost.userId, name: mergedPost.name, profilePictureUrl: mergedPost.profilePictureUrl }
		}
		let currentUser = {} as PostEntityCommonFields['owner']
		if (route.params && route.params.userId) {
			currentUser = { userId: user.userId!, name: user.name!, profilePictureUrl: user.profilePictureUrl }
		} else {
			currentUser = { userId: userDataContext.userId, name: userDataContext.name, profilePictureUrl: userDataContext.profilePictureUrl }
		}
		return currentUser
	}

	const getProfilePicture = () => {
		if (canRenderUnapprovedData()) {
			const mergedPost = mergeObjects<CompleteUser>(userDataContext as CompleteUser, userDataContext.unapprovedData as UserEntity)
			return mergedPost && mergedPost.profilePictureUrl && mergedPost.profilePictureUrl.length ? mergedPost.profilePictureUrl[0] : ''
		}
		if (route.params && route.params.userId) return user && user.profilePictureUrl ? user.profilePictureUrl[0] : ''
		return userDataContext.profilePictureUrl
			? userDataContext.profilePictureUrl[0]
			: ''
	}

	const getUserPosts = (withoutFilter?: boolean) => {
		if (hasPostFilter && !withoutFilter) { return filteredPosts }

		return isLoggedUser
			? userPostsContext // TODO Atualizar query
			: currentUserPosts.filter((post) => post.description)
	}

	const verifyUserProfile = async (label: VerifiedLabelName) => {
		setProfileOptionsIsOpen(false)
		if (user.userId && userDataContext.userId) {
			const verifiedObject = {
				verified: {
					type: label,
					by: userDataContext.userId,
					at: new Date(),
					name: userDataContext.name || ''
				}
			}

			await remoteStorage.updateUserData(user.userId, verifiedObject)
			user.userId && await loadRemoteProfileData(false, true)
		}
	}

	const setFreeTrialToProfile = async (plan: PostRange) => {
		if (!user.userId) return
		const priceId = plan === 'country' ? stripeProductsPlans.countryMonthly.priceId : stripeProductsPlans.cityMonthly.priceId

		await setFreeTrialPlans(
			[user.userId || ''], // array of userIds
			createCustomer, // from StripeContext
			createSubscription, // from StripeContext
			plan, // range
			'monthly', // plan
			priceId,
			() => loadRemoteProfileData(false, true)
		)
		// user.userId && await loadRemoteProfileData(user.userId)
	}

	const hasAnyVerifiedUser = () => {
		return ((userDataContext && userDataContext.verified && isLoggedUser) || (user && user.verified))
	}

	const getVerifiedUserType = () => {
		if (verifiedUserTypeIs('default')) return 'default'
		if (verifiedUserTypeIs('impact')) return 'impact'
		if (verifiedUserTypeIs('leader')) return 'leader'
		if (verifiedUserTypeIs('government')) return 'government'
		return ''
	}

	const verifiedUserTypeIs = (verifiedLabel: VerifiedLabelName) => {
		return (
			(
				userDataContext.verified
				&& userDataContext.verified.type === verifiedLabel
				&& isLoggedUser
			)
			|| (
				user.verified
				&& user.verified.type === verifiedLabel
			)
		)
	}

	const userIsAdmin = () => {
		return (
			userDataContext.verified && userDataContext.verified.admin && (
				(user.subscription && user.subscription.subscriptionRange === 'near') || !user.subscription)
		)
	}

	const renderUserVerifiedType = () => {
		if (!hasAnyVerifiedUser()) return

		const verifiedLabel = getVerifiedUserType()
		if (!verifiedLabel) return

		return (
			<VerticalPaddingContainer>
				<TouchableOpacity onPress={() => setToggleVerifiedModal(true)}>
					<ProfileInfoContainer>
						<VerifiedUserBadge verifiedLabel={verifiedLabel} />
					</ProfileInfoContainer>
				</TouchableOpacity>
			</VerticalPaddingContainer>
		)
	}

	const renderPost = ({ item }: FlatListItem<PostEntity>) => {
		return (
			<PostPadding key={item.postId}>
				<PostCard
					post={item}
					owner={getOwnerDataOnly()}
					isOwner={isLoggedUser}
					onPress={() => viewPostDetails(item)}
				/>
			</PostPadding>
		)
	}

	const toggleWaitingApproveModalVisibility = () => {
		setWaitingApproveModalIsVisible(!waitingApproveModalIsVisible)
	}

	const toggleRejectModalVisibility = () => {
		setRejectModalIsVisible(!rejectModalIsVisible)
	}

	const getConfigurationIcon = () => {
		if (isLoggedUser) {
			if (hasConfigNotification()) return GearAlertWhiteIcon
			return GearWhiteIcon
		}
		return ThreeDotsIcon
	}

	const hasConfigNotification = () => (notificationState.configNotificationButton || notificationState.configNotificationEntryMethod)

	const getShortDescription = () => {
		const userDescription = getUserField('description') as string || ''
		return getShortText(userDescription, 160)
	}

	const descriptionIsLarge = () => {
		const description = getUserField('description') as string || ''
		return description.length > 160
	}

	if (!user) {
		return <Loader flex />
	}

	return (
		<ScreenContainer infinityBottom>
			<Container >
				<FocusAwareStatusBar
					backgroundColor={theme.white3}
					barStyle={'dark-content'}
				/>
				<WaitingApproveModal // APPROVE
					visibility={waitingApproveModalIsVisible}
					closeModal={toggleWaitingApproveModalVisibility}
				/>
				<RejectModal // REJECT
					isProfile
					visibility={rejectModalIsVisible}
					closeModal={toggleRejectModalVisibility}
				/>
				{
					hasAnyVerifiedUser() && (
						<ProfileVerifiedModal
							visibility={toggleVerifiedModal}
							closeModal={() => setToggleVerifiedModal(!toggleVerifiedModal)}
							label={
								isLoggedUser
									? userDataContext.verified?.type
									: user.verified?.type
							}
						/>
					)
				}
				<Body >
					<UserPostsFlatList
						data={getUserPosts()}
						renderItem={renderPost as ListRenderItem<unknown>}
						onEndReached={loadMoreUserPosts}
						refreshControl={(
							<RefreshControl
								tintColor={theme.black4}
								colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
								refreshing={isRefresing}
								onRefresh={() => loadRemoteProfileData(false, true)}
							/>
						)}
						showsVerticalScrollIndicator={false}
						ItemSeparatorComponent={() => <VerticalSpacing height={0.8} />}
						ListHeaderComponent={(
							<>
								<DefaultHeaderContainer
									backgroundColor={theme.white3}
									centralized={false}
									grow
									withoutIOSPadding
									borderBottomWidth={0}
								>
									<ProfileHeader>
										<ProfileInfoContainer>
											{
												!isLoggedUser && (
													<>
														<BackButton
															onPress={navigationToBack}
															withoutRightSpacing={false}
														/>
														<HorizontalSpacing width={relativeScreenWidth(3)} />
													</>
												)
											}
											<TouchableOpacity
												activeOpacity={0.9}
												onPress={canRenderRejectIndicator() ? toggleRejectModalVisibility : toggleWaitingApproveModalVisibility}
											>
												<PhotoPortrait
													height={isLoggedUser ? RFValue(95) : RFValue(65)}
													width={isLoggedUser ? RFValue(100) : RFValue(70)}
													borderWidth={3}
													borderRightWidth={8}
													pictureUri={getProfilePicture()}
													waitingApproveIndicator={!!canRenderWaitingApproveIndicator()}
													rejectApproveIndicator={!!canRenderRejectIndicator()}
												/>
											</TouchableOpacity>
											<InfoArea>
												<UserName numberOfLines={3}>
													{getUserField('name') as string}
												</UserName>
												{renderUserVerifiedType()}
												{
													!userDescriptionIsExpanded && isLoggedUser && (
														<TouchableOpacity
															onPress={() => getUserField('description')
																&& setUserDescriptionIsExpanded(true)}
														>
															<UserDescription numberOfLines={3}>
																{getUserField('description') as string || 'você pode adicionar uma descrição em "editar".'}
															</UserDescription>
														</TouchableOpacity>
													)
												}
											</InfoArea>
										</ProfileInfoContainer>
										{
											(userDescriptionIsExpanded || !isLoggedUser)
											&& getUserField('description')
											&& (
												<ExpandedUserDescriptionArea>
													<ScrollView showsVerticalScrollIndicator={false}	>
														<TouchableOpacity
															activeOpacity={0.9}
															onPress={() => (isLoggedUser ? setUserDescriptionIsExpanded(false) : setHostDescriptionIsExpanded(!hostDescriptionIsExpanded))}
														>
															<ExpandedUserDescription numberOfLines={hostDescriptionIsExpanded ? 0 : 7} >
																{`${hostDescriptionIsExpanded || userDescriptionIsExpanded ? getUserField('description') : getShortDescription()}`}
																<SeeMoreLabel>
																	{hostDescriptionIsExpanded || userDescriptionIsExpanded ? '  mostrar menos' : descriptionIsLarge() && '  ...mostrar mais'}
																</SeeMoreLabel>
															</ExpandedUserDescription>
														</TouchableOpacity>
													</ScrollView>
												</ExpandedUserDescriptionArea>
											)
										}
										{
											arrayIsEmpty(getUserField('socialMedias'))
												? isLoggedUser
													? (
														<>
															<VerticalSpacing />
															<SmallButton
																label={'adicionar redes'}
																labelColor={theme.black4}
																SvgIcon={AtSignWhiteIcon}
																svgScale={['60%', '20%']}
																height={relativeScreenHeight(5)}
																onPress={openSocialMediaManagement}
															/>
															<VerticalSpacing />
														</>
													)
													: <VerticalSpacing />
												: (
													<HorizontalSocialMediaList
														socialMedias={getUserField('socialMedias') as SocialMedia[]}
														onPress={openSocialMediaManagement}
													/>
												)
										}
										<OptionsArea>
											<SmallButton
												label={isLoggedUser ? 'editar' : 'chat'}
												labelColor={theme.black4}
												SvgIcon={isLoggedUser ? EditIcon : ChatWhiteIcon}
												svgScale={['85%', '25%']}
												relativeWidth={'28%'}
												height={relativeScreenWidth(12)}
												onPress={isLoggedUser ? goToEditProfile : openChat}
											/>
											<SmallButton
												color={theme.orange3}
												label={'compartilhar'}
												labelColor={theme.black4}
												highlightedWords={
													isLoggedUser ? ['compartilhar'] : []
												}
												fontSize={12}
												SvgIcon={ShareIcon}
												relativeWidth={isLoggedUser ? '50%' : '45%'}
												height={relativeScreenWidth(12)}
												onPress={shareProfile}
											/>
											<PopOver
												title={getUserField('name') as string}
												isAdmin={userIsAdmin()}
												buttonLabel={'denunciar perfil'}
												popoverVisibility={profileOptionsIsOpen}
												closePopover={() => setProfileOptionsIsOpen(false)}
												reportUser={reportUser}
												onPressVerify={verifyUserProfile}
												setFreeTrialToProfile={setFreeTrialToProfile}
											>
												<SmallButton
													color={theme.white3}
													SvgIcon={getConfigurationIcon()}
													relativeWidth={relativeScreenWidth(12)}
													svgScale={hasConfigNotification() && isLoggedUser ? ['100%', '100%'] : ['50%', '80%']}
													height={relativeScreenWidth(12)}
													onPress={openProfileOptions}
												/>
											</PopOver>
										</OptionsArea>
									</ProfileHeader>
								</DefaultHeaderContainer>
								{
									!!numberOfOfflinePostsStored && isLoggedUser && (
										<PostPadding>
											<OptionButton
												label={`você tem ${numberOfOfflinePostsStored} ${numberOfOfflinePostsStored === 1 ? 'post pronto' : 'posts prontos'} `}
												shortDescription={hasNetworkConnection ? 'você já pode postá-los' : 'esperando conexão com internet'}
												highlightedWords={['posts', 'post']}
												labelSize={18}
												relativeHeight={relativeScreenHeight(8)}
												leftSideWidth={'25%'}
												leftSideColor={hasNetworkConnection ? theme.green3 : theme.yellow3}
												SvgIcon={hasNetworkConnection ? WirelessOnWhiteIcon : WirelessOffWhiteIcon}
												svgIconScale={['60%', '60%']}
												onPress={() => navigation.navigate('OfflinePostsManagement')}
											/>
											<VerticalSpacing />
										</PostPadding>
									)
								}
								<PostFilterContainer>
									<PostFilter
										posts={getUserPosts(true)}
										setHasPostFilter={setHasPostFilter}
										setFilteredPosts={setFilteredPosts}
									/>
								</PostFilterContainer>
							</>
						)}
						ListFooterComponent={() => (isLoggedUser && (!getUserPosts() || !getUserPosts().length)
							? (
								<WithoutPostsMessage
									title={'faça uma postagem!'}
									message={'você precisa fazer um post para que outras pessoas possam te encontrar\ncaso veio aqui apenas para procurar, não se preocupe.'}
									highlightedWords={['precisa', 'fazer', 'um', 'post', 'outras', 'pessoas', 'possam', 'te', 'encontrar',]}
									backgroundColor={theme.yellow1}
								/>
							)
							: <VerticalSpacing bottomNavigatorSpace />
						)}
					/>
				</Body>
			</Container >
		</ScreenContainer>
	)
}

export { Profile }
