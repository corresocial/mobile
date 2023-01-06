import React, { useEffect, useState, useContext } from 'react'
import { Alert, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
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
import { PostCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { PostCard } from '../../../components/_cards/PostCard'
import { ProfilePopOver } from '../../../components/ProfilePopOver'
import { HorizontalSocialMediaList } from '../../../components/HorizontalSocialmediaList'

function Profile({ route, navigation }: ProfileScreenProps) {
	const { getDataFromSecureStore, userDataContext } = useContext(AuthContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [userDescriptionIsExpanded, setUserDescriptionIsExpanded] = useState(false)
	const [user, setUser] = useState<LocalUserData>({})
	const [userPosts, setUserPosts] = useState<PostCollection[]>([])
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (route.params && route.params.userId) {
				getProfileDataFromRemote(route.params.userId)
			} else {
				getProfileDataFromLocal()
			}
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		if (route.params && route.params.userId) {
			setIsLoggedUser(false)
			getProfileDataFromRemote(route.params.userId)
		} else {
			setIsLoggedUser(true)
			getProfileDataFromLocal()
		}
	}, [])

	const getProfileDataFromRemote = async (userId: string) => {
		const remoteUser = await getUser(userId)
		const { profilePictureUrl, name, posts, description } = remoteUser as LocalUserData
		setUser({
			userId,
			name,
			description,
			profilePictureUrl: profilePictureUrl || [],
		})
		setUserPosts(posts as never)
	}

	const getProfileDataFromLocal = async () => {
		const localUser = await getObjectLocalUser()
		const { profilePictureUrl, name, posts, description, socialMedias } = localUser as LocalUserData
		setUser({
			name,
			description,
			socialMedias,
			profilePictureUrl: profilePictureUrl || [],
		})
		setUserPosts(posts as never)
	}

	const getObjectLocalUser = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		return userObject
	}

	const getUserPostTags = () => {
		const userPostTags = userPosts.reduce((acc: any[], current: PostCollection) => {
			if (!current.tags) return [...acc]
			const filtredCurrentTags = current.tags.filter((tag) => !acc.includes(tag))
			return [...acc, ...filtredCurrentTags as string[]]
		}, [])

		return userPostTags.sort(sortArray) as string[]
	}

	const filtredUserPosts = () => {
		return userPosts.filter((post) => {
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
				navigation.navigate('ViewServicePost', { postData: { ...item, owner: user }, isAuthor: isLoggedUser })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePost', { postData: { ...item, owner: user }, isAuthor: isLoggedUser })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPost', { postData: { ...item, owner: user }, isAuthor: isLoggedUser })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPost', { postData: { ...item, owner: user }, isAuthor: isLoggedUser })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePost', { postData: { ...item, owner: user }, isAuthor: isLoggedUser })
				break
			}
			default: return false
		}
	}

	const navigateToConfig = () => {
		setProfileOptionsIsOpen(false)
		navigation.navigate('Configurations' as any)
	}

	const openProfileOptions = () => {
		!isLoggedUser ? setProfileOptionsIsOpen(true) : navigation.navigate('Configurations' as any) // TODO Type
	}

	const goToComplaint = () => {
		Alert.alert('Ops!', 'Navegação para tela de denúncia ainda não implementada!')
	}

	return (
		<Container style={{
			flex: 1
		}}
		>
			<StatusBar backgroundColor={profileOptionsIsOpen ? 'rgba(0,0,0,0.5)' : theme.white3} barStyle={'dark-content'} />
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
							pictureUri={user.profilePictureUrl ? user.profilePictureUrl[0] : ''}
							checked={isLoggedUser}
						/>
						<InfoArea>
							<UserName numberOfLines={3} >{user.name}</UserName>
							{
								!userDescriptionIsExpanded && (
									<TouchableOpacity onPress={() => setUserDescriptionIsExpanded(true)}>
										<UserDescription numberOfLines={3}>
											{user.description}
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
											{user.description}
										</ExpandedUserDescription>
									</TouchableOpacity>
								</ScrollView>
							</ExpandedUserDescriptionArea>
						)
					}
					<HorizontalSocialMediaList
						socialMedias={userDataContext.socialMedias || []}
						onPress={() => navigation.navigate('SocialMediaManagement' as any, {
							userId: user.userId,
							socialMedias: userDataContext.socialMedias,
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
							onPress={() => navigation.navigate('EditProfile' as any, { user })} // TODO Type
						/>
						<SmallButton
							color={theme.orange3}
							label={`compartilhar${isLoggedUser ? ' perfil' : ''}`}
							highlightedWords={isLoggedUser ? ['compartilhar'] : []}
							fontSize={13}
							SvgIcon={ShareIcon}
							relativeWidth={isLoggedUser ? '60%' : '45%'}
							height={relativeScreenWidth(12)}
							onPress={() => share('dados do perfil')}
						/>
						<ProfilePopOver
							userName={userDataContext.name}
							userId={user.userId}
							buttonLabel={isLoggedUser ? 'sair' : 'denunciar'}
							popoverVisibility={profileOptionsIsOpen}
							closePopover={() => setProfileOptionsIsOpen(false)}
							onPress={goToComplaint}
							goToConfig={navigateToConfig}
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
					data={!selectedTags.length ? userPosts : filtredUserPosts()}
					renderItem={({ item }: any) => ( // TODO type
						<PostCard
							post={item}
							owner={user}
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
