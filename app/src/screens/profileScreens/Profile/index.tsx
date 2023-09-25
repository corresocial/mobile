import React, { useEffect, useState, useContext } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

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
	HorizontalSigh,
	VerticalPaddingContainer,
	PostPadding,
	SafeAreaViewContainer,
	OffBounceBackground,
	SeeMoreLabel,
} from './styles'
import { theme } from '../../../common/theme'
import ChatWhiteIcon from '../../../assets/icons/chat-white.svg'
import ShareIcon from '../../../assets/icons/share-white.svg'
import LeaderLabel from '../../../assets/icons/leaderLabel.svg'
import VerifiedLabel from '../../../assets/icons/verifiedLabel.svg'
import ImpactLabel from '../../../assets/icons/impactLabel.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'
import EditIcon from '../../../assets/icons/edit-white.svg'
import GearIcon from '../../../assets/icons/gear-white.svg'
import WirelessOffWhiteIcon from '../../../assets/icons/wirelessOff-white.svg'
import WirelessOnWhiteIcon from '../../../assets/icons/wirelessOn-white.svg'

import { share } from '../../../common/share'
import { getUser } from '../../../services/firebase/user/getUser'
import {
	arrayIsEmpty,
	sortArray,
	sortPostsByCreatedData,
} from '../../../common/auxiliaryFunctions'

import { LocalUserData } from '../../../contexts/types'
import {
	Id,
	PostCollection,
	PostRange,
	SocialMedia,
	UserCollection,
	VerifiedLabelName,
} from '../../../services/firebase/types'
import { HomeTabScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { PostCard } from '../../../components/_cards/PostCard'
import { PopOver } from '../../../components/PopOver'
import { HorizontalSocialMediaList } from '../../../components/HorizontalSocialmediaList'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { BackButton } from '../../../components/_buttons/BackButton'
import { updateUser } from '../../../services/firebase/user/updateUser'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ProfileVerifiedModal } from '../../../components/_modals/ProfileVerifiedModal'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { setFreeTrialPlans } from '../../../services/stripe/scripts/setFreeTrialPlans'
import { StripeContext } from '../../../contexts/StripeContext'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { getNumberOfStoredOfflinePosts } from '../../../utils/offlinePost'
import { getNetworkStatus } from '../../../utils/deviceNetwork'

function Profile({ route, navigation }: HomeTabScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { createCustomer, createSubscription, stripeProductsPlans } = useContext(StripeContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
	const [hostDescriptionIsExpanded, setHostDescriptionIsExpanded] = useState(false)

	const [user, setUser] = useState<LocalUserData>({})
	const [selectedTags, setSelectedTags] = useState<string[]>([])
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
		const {
			profilePictureUrl,
			name,
			posts,
			description,
			verified,
			socialMedias,
			subscription
		} = remoteUser as LocalUserData
		setUser({
			userId,
			name,
			socialMedias,
			description,
			profilePictureUrl: profilePictureUrl || [],
			verified,
			subscription,
			posts,
		})
	}

	const checkHasOfflinePosts = async () => {
		const numberOfOfflinePosts = await getNumberOfStoredOfflinePosts()
		setNumberOfOfflinePostsStored(numberOfOfflinePosts)
	}

	const checkNetworkConnection = async () => {
		const networkStatus = await getNetworkStatus()
		setHasNetworkConnection(!!networkStatus.isConnected && !!networkStatus.isInternetReachable)
	}

	const getUserPostMacroTags = () => {
		const posts = getUserPosts()
		const userPostTags = posts.reduce(
			(acc: any[], current: PostCollection) => {
				if (acc.includes(current.postType)) {
					return [...acc]
				}

				return [...acc, current.postType]
			},
			[]
		)

		return userPostTags.sort(sortArray) as string[]
	}

	const filtredUserPosts = () => {
		const posts = getUserPosts()
		return posts.filter((post: any) => {
			const matchs = selectedTags.map((tag: string) => {
				if (getRelativeMacroTagLabel(post.postType) === tag) return true
				return false
			}, [])
			return !!matchs.includes(true)
		})
	}

	const getRelativeMacroTagLabel = (macroTag: string): string => {
		switch (macroTag) {
			case 'sale': return 'vendas'
			case 'service': return 'serviços'
			case 'vacancy': return 'vagas'
			case 'culture': return 'cultura'
			case 'socialImpact': return 'impacto social'
			default: return ''
		}
	}

	const onSelectTag = (tagName: string) => {
		const currentSelectedTags = [...selectedTags]
		if (currentSelectedTags.includes(tagName)) {
			const selectedTagsFiltred = currentSelectedTags.filter(
				(tag) => tag !== tagName
			)
			setSelectedTags(selectedTagsFiltred)
		} else {
			currentSelectedTags.push(tagName)
			setSelectedTags(currentSelectedTags)
		}
	}

	const goToPostView = (item: PostCollection) => {
		const stackLabel = route.params?.stackLabel || 'Home'

		switch (item.postType) {
			case 'service': {
				navigation.push(
					route.params?.userId
						? `ViewServicePost${stackLabel}`
						: ('ViewServicePost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'sale': {
				navigation.push(
					route.params?.userId
						? `ViewSalePost${stackLabel}`
						: ('ViewSalePost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'vacancy': {
				navigation.push(
					route.params?.userId
						? `ViewVacancyPost${stackLabel}`
						: ('ViewVacancyPost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'socialImpact': {
				navigation.push(
					route.params?.userId
						? `ViewSocialImpactPost${stackLabel}`
						: ('ViewSocialImpactPost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'culture': {
				navigation.push(
					route.params?.userId
						? `ViewCulturePost${stackLabel}`
						: ('ViewCulturePost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			default:
				return false
		}
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
		if (route.params && route.params.userId) {
			const currentUser = { ...user }
			delete currentUser.posts
			delete currentUser.socialMedias
			return currentUser
		}
		const currentUser = { ...userDataContext }
		delete currentUser.posts
		delete currentUser.socialMedias
		return currentUser
	}

	const getProfilePicture = () => {
		if (route.params && route.params.userId) {
			return user.profilePictureUrl ? user.profilePictureUrl[0] : ''
		}
		return userDataContext.profilePictureUrl
			? userDataContext.profilePictureUrl[0]
			: ''
	}

	const getUserPosts = () => {
		if (route.params && route.params.userId) {
			return user.posts
				? user.posts.sort(
					sortPostsByCreatedData as (a: PostCollection, b: PostCollection) => number
				)
				: []
		}

		return userDataContext.posts
			? userDataContext.posts.sort(sortPostsByCreatedData)
			: []
	}

	const verifyUserProfile = async (label: VerifiedLabelName) => {
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
		setProfileOptionsIsOpen(false)
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

	const renderUserVerifiedType = () => {
		if (!hasAnyVerifiedUser()) return

		const verifiedLabel = getVerifiedUserType()
		if (!verifiedLabel) return

		return (
			<VerticalPaddingContainer>
				<TouchableOpacity onPress={() => setToggleVerifiedModal(true)}>
					<ProfileInfoContainer>
						{getRelativeVerifiedIndentifier(verifiedLabel)}
					</ProfileInfoContainer>
				</TouchableOpacity>
			</VerticalPaddingContainer>
		)
	}

	const hasAnyVerifiedUser = () => {
		return ((userDataContext && userDataContext.verified && isLoggedUser) || (user && user.verified))
	}

	const getVerifiedUserType = () => {
		if (verifiedUserTypeIs('default')) return 'default'
		if (verifiedUserTypeIs('impact')) return 'impact'
		if (verifiedUserTypeIs('leader')) return 'leader'
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

	const getRelativeVerifiedIndentifier = (verifiedLabel: VerifiedLabelName) => {
		switch (verifiedLabel) {
			case 'default': {
				return (
					<>
						<VerifiedLabel
							height={RFValue(22)}
							width={RFValue(22)}
							style={{ marginRight: RFValue(6) }}
						/>
						<UserDescription>
							{'perfil verificado'}
						</UserDescription>
					</>
				)
			}
			case 'impact': {
				return (
					<>
						<ImpactLabel
							height={RFValue(22)}
							width={RFValue(22)}
							style={{ marginRight: RFValue(6) }}
						/>
						<UserDescription>
							{'perfil de impacto'}
						</UserDescription>
					</>
				)
			}
			case 'leader': {
				return (
					<>
						<LeaderLabel
							height={RFValue(22)}
							width={RFValue(22)}
							style={{ marginRight: RFValue(6) }}
						/>
						<UserDescription>
							{'líder social'}
						</UserDescription>
					</>
				)
			}
			default: return <></>
		}
	}

	const getShortDescription = () => {
		const userDescription = getUserField('description') as string || ''
		return userDescription.slice(0, 160)
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
			<SafeAreaViewContainer />
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
			<OffBounceBackground
				colors={[theme.white3, theme.orange2, theme.orange2, theme.orange2]}
				locations={[0.25, 0.25, 0.25, 0.25]}
			>
				<Body>
					<FlatList
						ListHeaderComponent={() => {
							return (
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
																withoutSigh={false}
															/>
															<HorizontalSigh />
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
														{getUserField('name')}
													</UserName>
													{
														renderUserVerifiedType()
													}
													{
														!userDescriptionIsExpanded && isLoggedUser && (
															<TouchableOpacity
																onPress={() => getUserField('description')
																	&& setUserDescriptionIsExpanded(true)}
															>
																<UserDescription numberOfLines={3}>
																	{getUserField('description') || 'você pode adicionar uma descrição em "editar".'}
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
												isLoggedUser && arrayIsEmpty(getUserField('socialMedias'))
													? (
														<VerticalPaddingContainer>
															<UserDescription>
																{'Você pode adicionar redes sociais e contatos em "editar".'}
															</UserDescription>
														</VerticalPaddingContainer>
													) : (
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
													isVerifiable={
														!isLoggedUser
														&& userDataContext.verified
														&& (userDataContext.verified.type === 'leader' || userDataContext.verified.admin)
														&& user
														&& !user.verified
													}
													isAdmin={userDataContext.verified && userDataContext.verified.admin && (
														(user.subscription && user.subscription.subscriptionRange === 'near') || !user.subscription
													)}
													buttonLabel={'denunciar perfil'}
													popoverVisibility={profileOptionsIsOpen}
													closePopover={() => setProfileOptionsIsOpen(false)}
													onPress={reportUser}
													onPressVerify={verifyUserProfile}
													setFreeTrialToProfile={setFreeTrialToProfile}
												>
													<SmallButton
														color={theme.white3}
														SvgIcon={isLoggedUser ? GearIcon : ThreeDotsIcon}
														relativeWidth={relativeScreenWidth(12)}
														height={relativeScreenWidth(12)}
														onPress={openProfileOptions}
													/>
												</PopOver>
											</OptionsArea>
										</ProfileHeader>
									</DefaultHeaderContainer>
									<VerticalSigh />
									<HorizontalTagList
										tags={getUserPostMacroTags()}
										selectedTags={selectedTags}
										filterSelectedTags={getRelativeMacroTagLabel}
										onSelectTag={onSelectTag}
									/>
									<VerticalSigh />
									{
										!!numberOfOfflinePostsStored && (
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
												<VerticalSigh />
											</PostPadding>
										)
									}
								</>

							)
						}}
						data={
							!selectedTags.length
								? getUserPosts()
								: filtredUserPosts()
						}
						renderItem={({ item }: any) => ( // TODO type
							<PostPadding>
								<PostCard
									post={item}
									owner={getUserField()}
									onPress={() => goToPostView(item)}
								/>
							</PostPadding>
						)}
						showsVerticalScrollIndicator={false}
						ItemSeparatorComponent={() => <VerticalSigh height={relativeScreenHeight(0.8)} />}
						contentContainerStyle={{ backgroundColor: theme.orange2 }}
						// ListHeaderComponentStyle={{ marginVertical: relativeScreenHeight(2) }}
						ListFooterComponent={() => (isLoggedUser && (!userDataContext.posts || userDataContext.posts.length === 0)
							? (
								<WithoutPostsMessage
									title={'faça uma postagem!'}
									message={
										'você precisa fazer um post para que outras pessoas possam te encontrem\ncaso veio aqui apenas para procurar, não se preocupe.'
									}
									highlightedWords={['precisa', 'fazer', 'um', 'post', 'outras', 'pessoas', 'possam', 'te', 'encontrar',]}
									backgroundColor={theme.yellow1}
								/>
							)
							: <VerticalSigh height={relativeScreenHeight(11)} />
						)}
					/>
				</Body>
			</OffBounceBackground>
		</Container >
	)
}

export { Profile }
