import React, { useEffect, useState, useContext } from 'react'
import { Linking, ScrollView, TouchableOpacity } from 'react-native'
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
	FlatList,
	Sigh,
	FooterSigh,
	ExpandedUserDescription,
	ExpandedUserDescriptionArea
} from './styles'
import { theme } from '../../../common/theme'
import ChatIcon from '../../../assets/icons/chat.svg'
import ShareIcon from '../../../assets/icons/share.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'
import PencilIcon from '../../../assets/icons/pencil.svg'
import GearIcon from '../../../assets/icons/gear.svg'

import { share } from '../../../common/share'
import { getUser } from '../../../services/firebase/user/getUser'
import { sortArray } from '../../../common/auxiliaryFunctions'

import { ProfileScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'
import { LocalUserData } from '../../../contexts/types'
import { PostCollection, SocialMedia } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { PostCard } from '../../../components/_cards/PostCard'
import { ProfilePopOver } from '../../../components/ProfilePopOver'
import { HorizontalSocialMediaList } from '../../../components/HorizontalSocialmediaList'
import { getPrivateContacts } from '../../../services/firebase/user/getPrivateContacts'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'

function Profile({ route, navigation }: ProfileScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
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
		const { profilePictureUrl, name, posts, description, socialMedias } = remoteUser as LocalUserData
		setUser({
			userId,
			name,
			socialMedias,
			description,
			profilePictureUrl: profilePictureUrl || [],
			posts
		})
	}

	const getUserPostTags = () => {
		const posts = getUserPosts()
		const userPostTags = posts.reduce((acc: any[], current: PostCollection) => {
			if (!current.tags) return [...acc]
			const filtredCurrentTags = current.tags.filter((tag) => !acc.includes(tag))
			return [...acc, ...filtredCurrentTags as string[]]
		}, [])

		return userPostTags.sort(sortArray) as string[]
	}

	const filtredUserPosts = () => {
		const posts = getUserPosts()
		return posts.filter((post) => {
			const matchs = selectedTags.map((tag: string) => {
				if (post.tags?.includes(tag)) return true
				return false
			}, [])
			return !matchs.includes(false)
		})
	}

	const onSelectTag = (tagName: string) => {
		const currentSelectedTags = [...selectedTags]
		if (currentSelectedTags.includes(tagName)) {
			const selectedTagsFiltred = currentSelectedTags.filter((tag) => tag !== tagName)
			setSelectedTags(selectedTagsFiltred)
		} else {
			currentSelectedTags.push(tagName)
			setSelectedTags(currentSelectedTags)
		}
	}

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePost', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePost', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPost', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPost', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePost', { postData: { ...item, owner: getUserDataOnly() } })
				break
			}
			default: return false
		}
	}

	const openProfileOptions = () => {
		!isLoggedUser ? setProfileOptionsIsOpen(true) : navigation.navigate('Configurations' as any) // TODO Type
	}

	const reportUser = () => { // TODO Implements Back to this screen sending screen name
		setProfileOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage' as any, { title: 'denunciar', contactUsType: 'denúncia', reportedPost: getUserField('userId'), }) // TODO Type
	}

	const goToEditProfile = () => {
		navigation.navigate('EditProfile' as any, { user })
	}

	const shareProfile = () => {
		share(`${isLoggedUser ? `olá! me chamo ${getUserField('name')} e tô no corre.` : `olha quem eu encontrei no corre.\n${getUserField('name')}`}\n\nhttps://corre.social`)
	}

	const openChat = async () => {
		const { cellNumber } = await getPrivateContacts(getUserField('userId') as string)
		const message = 'olá! vi que no corre. Podemos conversar?'
		Linking.openURL(`whatsapp://send?text=${message}&phone=${cellNumber}`)
	}

	type UserDataFields = keyof LocalUserData
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
		return userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''
	}

	const getUserPosts = () => {
		if (route.params && route.params.userId) {
			return user.posts ? user.posts : []
		}
		return userDataContext.posts ? userDataContext.posts : []
	}

	return (
		<Container style={{ flex: 1 }}>
			<FocusAwareStatusBar backgroundColor={profileOptionsIsOpen ? 'rgba(0,0,0,0.5)' : theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={theme.white3}
				centralized={false}
				grow
				borderBottomWidth={0}
				paddingVertical={15}
			>
				<ProfileHeader>
					<ProfileInfoContainer>
						<PhotoPortrait
							height={RFValue(95)}
							width={RFValue(100)}
							borderWidth={3}
							borderRightWidth={8}
							pictureUri={getProfilePicture()}
							checked={isLoggedUser}
						/>
						<InfoArea>
							<UserName numberOfLines={3} >{getUserField('name')}</UserName>
							{
								!userDescriptionIsExpanded && (
									<TouchableOpacity onPress={() => setUserDescriptionIsExpanded(true)}>
										<UserDescription numberOfLines={3}>
											{getUserField('description')}
										</UserDescription>
									</TouchableOpacity>
								)
							}
						</InfoArea>
					</ProfileInfoContainer>
					{
						userDescriptionIsExpanded && (
							<ExpandedUserDescriptionArea>
								<ScrollView showsVerticalScrollIndicator={false}>
									<TouchableOpacity onPress={() => setUserDescriptionIsExpanded(false)}>
										<ExpandedUserDescription >
											{getUserField('description')}
										</ExpandedUserDescription>
									</TouchableOpacity>
								</ScrollView>
							</ExpandedUserDescriptionArea>
						)
					}
					<HorizontalSocialMediaList
						socialMedias={isLoggedUser ? userDataContext.socialMedias : getUserField('socialMedias') as SocialMedia[]}
						onPress={() => navigation.navigate('SocialMediaManagement' as any, {
							userId: getUserField('userId'),
							socialMedias: getUserField('socialMedias'),
							isAuthor: isLoggedUser
						})}
					/>
					<OptionsArea>
						<SmallButton
							color={theme.white3}
							label={isLoggedUser ? '' : 'chat'}
							fontSize={13}
							SvgIcon={isLoggedUser ? PencilIcon : ChatIcon}
							relativeWidth={isLoggedUser ? relativeScreenWidth(12) : '30%'}
							height={relativeScreenWidth(12)}
							onPress={isLoggedUser ? goToEditProfile : openChat} // TODO Type
						/>
						<SmallButton
							color={theme.orange3}
							label={`compartilhar${isLoggedUser ? ' perfil' : ''}`}
							highlightedWords={isLoggedUser ? ['compartilhar'] : []}
							fontSize={13}
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
								SvgIcon={isLoggedUser ? GearIcon : ThreeDotsIcon}
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
					data={!selectedTags.length ? getUserPosts() : filtredUserPosts()}
					renderItem={({ item }: any) => ( // TODO type
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
