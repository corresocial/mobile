import React, { useEffect, useState, useContext } from 'react'
import { Linking, ScrollView, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '@common/theme'
import ChatIcon from '@assets/icons/chat.svg'
import ShareIcon from '@assets/icons/share.svg'
import AtSign from '@assets/icons/atSign.svg'
import ThreeDotsIcon from '@assets/icons/threeDots.svg'
import PencilIcon from '@assets/icons/pencil.svg'
import GearIcon from '@assets/icons/gear.svg'
import AngleLeftThinIcon from '@assets/icons/angleLeftThin.svg'

import { share } from '@common/share'
import { getUser } from '@services/firebase/user/getUser'
import {
	arrayIsEmpty,
	sortArray,
	sortPostsByCreatedData,
} from '@common/auxiliaryFunctions'

import { LocalUserData } from '@contexts/types'
import { Id, PostCollection, SocialMedia } from '@services/firebase/types'
import { HomeTabScreenProps } from '@routes/Stack/ProfileStack/stackScreenProps'

import { AuthContext } from '@contexts/AuthContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { PhotoPortrait } from '@components/PhotoPortrait'
import { SmallButton } from '@components/_buttons/SmallButton'
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from '@common/screenDimensions'
import { HorizontalTagList } from '@components/HorizontalTagList'
import { PostCard } from '@components/_cards/PostCard'
import { ProfilePopOver } from '@components/ProfilePopOver'
import { HorizontalSocialMediaList } from '@components/HorizontalSocialmediaList'
import { getPrivateContacts } from '@services/firebase/user/getPrivateContacts'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import {
	Body,
	Container,
	InfoArea,
	OptionsArea,
	ProfileHeader,
	ProfileInfoContainer,
	UserDescription,
	UserName,
	FlatList,
	Sigh,
	FooterSigh,
	ExpandedUserDescription,
	ExpandedUserDescriptionArea,
	AddSocialMediasButtonContainer,
	VerticalSigh,
} from './styles'

function Profile({ route, navigation }: HomeTabScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] =		useState(false)
	const [user, setUser] = useState<LocalUserData>({})
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)

	/* useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (route.params && route.params.userId) {
				getProfileDataFromRemote(route.params.userId)
			} else {
				getProfileDataFromLocal()
			}
		})
		return unsubscribe
	}, [navigation]) */

	useEffect(() => {
		if (route.params && route.params.userId) {
			setIsLoggedUser(false)
			getProfileDataFromRemote(route.params.userId)
		} else {
			setIsLoggedUser(true)
		}
	}, [])

	const getProfileDataFromRemote = async (userId: string) => {
		const remoteUser = await getUser(userId)
		const { profilePictureUrl, name, posts, description, socialMedias } =			remoteUser as LocalUserData
		setUser({
			userId,
			name,
			socialMedias,
			description,
			profilePictureUrl: profilePictureUrl || [],
			posts,
		})
	}

	const getUserPostTags = () => {
		const posts = getUserPosts()
		const userPostTags = posts.reduce(
			(acc: any[], current: PostCollection) => {
				if (!current.tags) return [...acc]
				const filtredCurrentTags = current.tags.filter(
					(tag) => !acc.includes(tag)
				)
				return [...acc, ...(filtredCurrentTags as string[])]
			},
			[]
		)

		return userPostTags.sort(sortArray) as string[]
	}

	const filtredUserPosts = () => {
		const posts = getUserPosts()
		return posts.filter((post) => {
			const matchs = selectedTags.map((tag: string) => {
				if (post.tags?.includes(tag)) return true
				return false
			}, [])
			return !!matchs.includes(true)
		})
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
		switch (item.postType) {
			case 'service': {
				navigation.navigate(
					route.params?.userId
						? 'ViewServicePostHome'
						: ('ViewServicePost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'sale': {
				navigation.navigate(
					route.params?.userId
						? 'ViewSalePostHome'
						: ('ViewSalePost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'vacancy': {
				navigation.navigate(
					route.params?.userId
						? 'ViewVacancyPostHome'
						: ('ViewVacancyPost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'socialImpact': {
				navigation.navigate(
					route.params?.userId
						? 'ViewSocialImpactPostHome'
						: ('ViewSocialImpactPost' as any), // TODO Type
					{ postData: { ...item, owner: getUserDataOnly() } }
				)
				break
			}
			case 'culture': {
				navigation.navigate(
					route.params?.userId
						? 'ViewCulturePostHome'
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

	const goToEditProfile = () => {
		navigation.navigate('EditProfile' as any, { user })
	}

	const navigationToBack = () => navigation.goBack()

	const shareProfile = async () => {
		share(
			`${
				isLoggedUser
					? `olá! me chamo ${getUserField('name')} e tô no corre.`
					: `olha quem eu encontrei no corre.\n${getUserField(
						'name'
					  )}`
			}\n\nhttps://corre.social`
		)
	}

	const openChat = async () => {
		const { cellNumber } = await getPrivateContacts(
			getUserField('userId') as string
		)
		const message = 'olá! vi que está no corre. Podemos conversar?'
		Linking.openURL(`whatsapp://send?text=${message}&phone=${cellNumber}`)
	}

	const openSocialMediaManagement = () => {
		navigation.navigate('SocialMediaManagement' as any, {
			userId: getUserField('userId'),
			socialMedias: getUserField('socialMedias') || [],
			isAuthor: isLoggedUser,
		})
	}

	type UserDataFields = keyof LocalUserData;
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
				? user.posts.sort(sortPostsByCreatedData as any)
				: [] // TODO Type
		}
		return userDataContext.posts
			? userDataContext.posts.sort(sortPostsByCreatedData as any)
			: [] // TODO Type
	}

	return (
		<Container style={{ flex: 1 }}>
			<FocusAwareStatusBar
				backgroundColor={
					profileOptionsIsOpen ? 'rgba(0,0,0,0.5)' : theme.white3
				}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				backgroundColor={theme.white3}
				centralized={false}
				grow
				borderBottomWidth={0}
				paddingVertical={15}
			>
				<ProfileHeader>
					<ProfileInfoContainer>
						{!isLoggedUser && (
							<>
								<SmallButton
									relativeWidth={relativeScreenWidth(11)}
									height={relativeScreenWidth(11)}
									color={theme.white3}
									SvgIcon={AngleLeftThinIcon}
									onPress={navigationToBack}
								/>
								<VerticalSigh />
							</>
						)}
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
							{!userDescriptionIsExpanded && isLoggedUser && (
								<TouchableOpacity
									onPress={() => getUserField('description')
										&& setUserDescriptionIsExpanded(true)}
								>
									<UserDescription numberOfLines={3}>
										{getUserField('description')}
									</UserDescription>
								</TouchableOpacity>
							)}
						</InfoArea>
					</ProfileInfoContainer>
					{(userDescriptionIsExpanded || !isLoggedUser) && (
						<ExpandedUserDescriptionArea>
							<ScrollView showsVerticalScrollIndicator={false}>
								<TouchableOpacity
									onPress={() => setUserDescriptionIsExpanded(false)}
								>
									<ExpandedUserDescription>
										{getUserField('description')}
									</ExpandedUserDescription>
								</TouchableOpacity>
							</ScrollView>
						</ExpandedUserDescriptionArea>
					)}
					{isLoggedUser
					&& arrayIsEmpty(getUserField('socialMedias')) ? (
						<AddSocialMediasButtonContainer>
								<SmallButton
								color={theme.white3}
								label={'adicionar redes'}
								highlightedWords={['redes']}
								fontSize={12}
								SvgIcon={AtSign}
								svgScale={['60%', '10%']}
								relativeWidth={'100%'}
								height={relativeScreenHeight(5)}
								onPress={openSocialMediaManagement}
							/>
							</AddSocialMediasButtonContainer>
						) : (
							<HorizontalSocialMediaList
								socialMedias={
								getUserField('socialMedias') as SocialMedia[]
								}
								onPress={openSocialMediaManagement}
							/>
						)}
					<OptionsArea>
						<SmallButton
							color={theme.white3}
							label={isLoggedUser ? '' : 'chat'}
							SvgIcon={isLoggedUser ? PencilIcon : ChatIcon}
							relativeWidth={
								isLoggedUser ? relativeScreenWidth(12) : '30%'
							}
							height={relativeScreenWidth(12)}
							onPress={isLoggedUser ? goToEditProfile : openChat}
						/>
						<SmallButton
							color={theme.orange3}
							label={`compartilhar${
								isLoggedUser ? ' perfil' : ''
							}`}
							highlightedWords={
								isLoggedUser ? ['compartilhar'] : []
							}
							fontSize={12}
							SvgIcon={ShareIcon}
							relativeWidth={isLoggedUser ? '60%' : '45%'}
							height={relativeScreenWidth(12)}
							onPress={shareProfile}
						/>
						<ProfilePopOver
							userName={getUserField('name') as string}
							userId={getUserField('userId') as string}
							buttonLabel={isLoggedUser ? 'sair' : 'denunciar'}
							popoverVisibility={profileOptionsIsOpen}
							closePopover={() => setProfileOptionsIsOpen(false)}
							onPress={reportUser}
						>
							<SmallButton
								color={theme.white3}
								SvgIcon={
									isLoggedUser ? GearIcon : ThreeDotsIcon
								}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={openProfileOptions}
							/>
						</ProfilePopOver>
					</OptionsArea>
				</ProfileHeader>
			</DefaultHeaderContainer>
			<Body>
				<HorizontalTagList
					tags={getUserPostTags()}
					selectedTags={selectedTags}
					onSelectTag={onSelectTag}
				/>
				<FlatList
					data={
						!selectedTags.length
							? getUserPosts()
							: filtredUserPosts()
					}
					renderItem={(
						{ item }: any // TODO type
					) => (
						<PostCard
							post={item}
							owner={getUserField()}
							onPress={() => goToPostView(item)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <Sigh />}
					ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
					ListFooterComponent={() => <FooterSigh />}
				/>
			</Body>
		</Container>
	)
}

export { Profile }
