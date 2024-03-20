import React, { useEffect, useState, useContext } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { AlertContext } from '@contexts/AlertContext/index'
import { AuthContext } from '@contexts/AuthContext'
import { LocalUserData } from '@contexts/AuthContext/types'
import { StripeContext } from '@contexts/StripeContext'

import { FlatListItem } from '@globalTypes/global/types'
import { navigateToPostView } from '@routes/auxMethods'
import { HomeTabScreenProps } from '@routes/Stack/ProfileStack/stackScreenProps'
import {
	Id,
	PostCollection,
	PostCollectionCommonFields,
	PostRange,
	SocialMedia,
	UserCollection,
	VerifiedLabelName,
} from '@services/firebase/types'

import { getUser } from '@services/firebase/user/getUser'
import { updateUser } from '@services/firebase/user/updateUser'
import { setFreeTrialPlans } from '@services/stripe/scripts/setFreeTrialPlans'
import { UiUtils } from '@utils-ui/common/UiUtils'
import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { getNetworkStatus } from '@utils/deviceNetwork'
import { getNumberOfStoredOfflinePosts } from '@utils/offlinePost'

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
	SafeAreaViewContainer,
	PostFilterContainer,
	OffBounceBackground
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
import { ProfileVerifiedModal } from '@components/_modals/ProfileVerifiedModal'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { HorizontalSocialMediaList } from '@components/HorizontalSocialmediaList'
import { PhotoPortrait } from '@components/PhotoPortrait'
import { PopOver } from '@components/PopOver'
import { PostFilter } from '@components/PostFilter'
import { VerifiedUserBadge } from '@components/VerifiedUserBadge'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

const { arrayIsEmpty } = UiUtils()
const { sortPostsByCreatedData } = UiPostUtils()

function Profile({ route, navigation }: HomeTabScreenProps) {
	const { notificationState } = useContext(AlertContext)
	const { userDataContext } = useContext(AuthContext)
	const { createCustomer, createSubscription, stripeProductsPlans } = useContext(StripeContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
	const [hostDescriptionIsExpanded, setHostDescriptionIsExpanded] = useState(false)
	const [filteredPosts, setFilteredPosts] = useState<PostCollection[]>([])
	const [hasPostFilter, setHasPostFilter] = useState(false)

	const [user, setUser] = useState<LocalUserData>({})
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)
	const [toggleVerifiedModal, setToggleVerifiedModal] = useState(false)
	const [numberOfOfflinePostsStored, setNumberOfOfflinePostsStored] = useState(0)
	const [hasNetworkConnection, setHasNetworkConnection] = useState(false)

	useEffect(() => {
		if (route.params && route.params.userId) {
			setIsLoggedUser(false)
			getProfileDataFromRemote(route.params.userId)
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

	const getProfileDataFromRemote = async (userId: string) => {
		const remoteUser = await getUser(userId)
		const { profilePictureUrl, name, posts, description, verified, socialMedias, subscription } = remoteUser as LocalUserData
		setUser({ userId, name, socialMedias, description, profilePictureUrl: profilePictureUrl || [], verified, subscription, posts })
	}

	const checkHasOfflinePosts = async () => {
		const numberOfOfflinePosts = await getNumberOfStoredOfflinePosts()
		setNumberOfOfflinePostsStored(numberOfOfflinePosts)
	}

	const checkNetworkConnection = async () => {
		const networkStatus = await getNetworkStatus()
		setHasNetworkConnection(!!networkStatus.isConnected && !!networkStatus.isInternetReachable)
	}

	const getFlatlistPosts = () => {
		return !hasPostFilter
			? getUserPosts()
			: getFilteredUserPosts()
	}

	const getFilteredUserPosts = () => filteredPosts || []

	const viewPostDetails = (post: PostCollection) => {
		const customStackLabel = route.params?.userId ? 'Home' : route.params?.stackLabel
		const postData = { ...post, owner: getUserDataOnly() } as PostCollection

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
		navigation.navigate('EditProfile' as any, { user })
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
		navigation.navigate('ChatMessages', {
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
			},
		})
	}

	const openSocialMediaManagement = () => {
		navigation.navigate('SocialMediaManagement' as any, {
			userId: getUserField('userId'),
			socialMedias: getUserField('socialMedias') || [],
			isAuthor: isLoggedUser,
		})
	}

	type UserDataFields = keyof UserCollection;
	const getUserField = (fieldName?: UserDataFields) => {
		if (route.params && route.params.userId) {
			if (!fieldName) return user
			return user[fieldName]
		}
		if (!fieldName) return userDataContext
		return userDataContext[fieldName]
	}

	const getUserDataOnly = () => {
		let currentUser = {} as LocalUserData
		if (route.params && route.params.userId) {
			currentUser = { ...user }
		} else {
			currentUser = { ...userDataContext }
		}

		delete currentUser.posts
		delete currentUser.socialMedias
		return currentUser
	}

	const getProfilePicture = () => {
		if (route.params && route.params.userId) return user.profilePictureUrl ? user.profilePictureUrl[0] : ''
		return userDataContext.profilePictureUrl
			? userDataContext.profilePictureUrl[0]
			: ''
	}

	const getUserPosts = () => {
		if (route.params && route.params.userId) {
			return user.posts
				? user.posts
					.filter((post) => !post.completed)
					.sort(sortPostsByCreatedData as (a: PostCollection, b: PostCollection) => number)
				: []
		}

		return userDataContext.posts
			? userDataContext.posts
				.filter((post) => !post.completed)
				.sort(sortPostsByCreatedData)
			: []
	}

	const verifyUserProfile = async (label: VerifiedLabelName) => {
		setProfileOptionsIsOpen(false)
		console.log({
			type: label,
			by: userDataContext.userId,
			at: new Date(),
			name: userDataContext.name || ''
		})
		if (user.userId && userDataContext.userId) {
			await updateUser(user.userId, {
				verified: {
					type: label,
					by: userDataContext.userId,
					at: new Date(),
					name: userDataContext.name || ''
				},
			})
			user.userId && await getProfileDataFromRemote(user.userId)
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
			() => getProfileDataFromRemote(user.userId || '')
		)
		// user.userId && await getProfileDataFromRemote(user.userId)
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

	/* const userIsVerified = () => {
		return (
			!isLoggedUser
			&& userDataContext.verified
			&& (userDataContext.verified.type === 'leader' || userDataContext.verified.admin)
			&& user
			&& !user.verified
		)
	} */

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

	return (
		<Container >
			<FocusAwareStatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			{
				hasAnyVerifiedUser()
				&& (
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
			<SafeAreaViewContainer>
				<OffBounceBackground
					colors={[theme.white3, theme.orange2, theme.orange2, theme.orange2]}
					locations={[0.25, 0.25, 0.25, 0.25]}
				>
					<Body >
						<FlatList
							ListHeaderComponent={(
								<>
									<DefaultHeaderContainer
										backgroundColor={theme.white3}
										centralized={false}
										grow
										withoutIOSPadding
										borderBottomWidth={0}
										paddingVertical={15}
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
												<PhotoPortrait
													height={isLoggedUser ? RFValue(95) : RFValue(65)}
													width={isLoggedUser ? RFValue(100) : RFValue(70)}
													borderWidth={3}
													borderRightWidth={8}
													pictureUri={getProfilePicture()}
												/>
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
											posts={getUserPosts()}
											setHasPostFilter={setHasPostFilter}
											setFilteredPosts={setFilteredPosts}
										/>
									</PostFilterContainer>
								</>
							)}
							data={getFlatlistPosts()}
							renderItem={({ item }: FlatListItem<PostCollection>) => (
								<PostPadding>
									<PostCard
										post={item}
										owner={getUserField() as PostCollectionCommonFields['owner']}
										onPress={() => viewPostDetails(item)}
									/>
								</PostPadding>
							)}
							showsVerticalScrollIndicator={false}
							ItemSeparatorComponent={() => <VerticalSpacing height={relativeScreenHeight(0.8)} />}
							contentContainerStyle={{ backgroundColor: theme.orange2 }}
							ListFooterComponent={() => (isLoggedUser && (!userDataContext.posts || userDataContext.posts.length === 0)
								? (
									<WithoutPostsMessage
										title={'faça uma postagem!'}
										message={'você precisa fazer um post para que outras pessoas possam te encontrem\ncaso veio aqui apenas para procurar, não se preocupe.'}
										highlightedWords={['precisa', 'fazer', 'um', 'post', 'outras', 'pessoas', 'possam', 'te', 'encontrar',]}
										backgroundColor={theme.yellow1}
									/>
								)
								: <VerticalSpacing height={relativeScreenHeight(11)} />
							)}
						/>
					</Body>
				</OffBounceBackground>
			</SafeAreaViewContainer>
		</Container >
	)
}

export { Profile }
