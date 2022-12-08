import React, { useEffect, useState, useContext } from 'react'
import { Alert, StatusBar } from 'react-native'
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
	NewPostButtonArea
} from './styles'
import { theme } from '../../../common/theme'
import ChatIcon from '../../../assets/icons/chat.svg'
import ShareIcon from '../../../assets/icons/share.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'
import PencilIcon from '../../../assets/icons/pencil.svg'
import GearIcon from '../../../assets/icons/gear.svg'
import PlusIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { share } from '../../../common/share'
import { getUser } from '../../../services/firebase/user/getUser'

import { ProfileScreenProps } from '../../../routes/Stack/ProfileStack/stackScreenProps'
import { LocalUserData } from '../../../contexts/types'
import { PostCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { screenHeight } from '../../../common/screenDimensions'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { PostCard } from '../../../components/_cards/PostCard'
import { TextGradient } from '../../../components/TextGradient'
import { ProfilePopOver } from '../../../components/ProfilePopOver'

function Profile({ route, navigation }: ProfileScreenProps) {
	const { getDataFromSecureStore, deleteLocaluser } = useContext(AuthContext)

	const [isLoggedUser, setIsLoggedUser] = useState(false)
	const [user, setUser] = useState<LocalUserData>({})
	const [userPosts, setUserPosts] = useState([])
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
		const { profilePictureUrl, name, posts, description } = localUser as LocalUserData
		setUser({
			name,
			description,
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

	const performLogout = () => {
		deleteLocaluser()
		setProfileOptionsIsOpen(false)
		navigation.navigate('AcceptAndContinue' as any)
	}

	const goToComplaint = () => {
		Alert.alert('Ops!', 'Navegação para tela de denúncia ainda não implementada!')
	}

	const renderNewPostButton = () => {
		return (
			<NewPostButtonArea>
				<SmallButton
					label={'novo post'}
					highlightedWords={['post']}
					fontSize={18}
					color={theme.white3}
					onPress={() => navigation.navigate('SelectPostType' as any)} // TODO Type
					height={screenHeight * 0.06}
					relativeWidth={'85%'}
					SvgIcon={PlusIcon}
				/>
			</NewPostButtonArea>
		)
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
				relativeHeight={'25%'}
				borderBottomWidth={0}
			>
				<ProfileHeader>
					<ProfileInfoContainer>
						<PhotoPortrait
							height={RFValue(95)}
							width={RFValue(100)}
							borderWidth={3}
							borderRightWidth={8}
							pictureUri={user.profilePictureUrl ? user.profilePictureUrl[0] : ''}
							checked={!isLoggedUser}
						/>
						<InfoArea>
							<UserName numberOfLines={3} >{user.name}</UserName>
							<TextGradient >
								{(styles: any) => (
									<UserDescription numberOfLines={3} style={styles}>
										{user.description}
									</UserDescription>
								)}
							</TextGradient>
						</InfoArea>
					</ProfileInfoContainer>
					<OptionsArea>
						<SmallButton
							color={theme.white3}
							label={isLoggedUser ? '' : 'chat'}
							fontSize={13}
							SvgIcon={isLoggedUser ? PencilIcon : ChatIcon}
							relativeWidth={isLoggedUser ? screenHeight * 0.050 : '30%'}
							height={screenHeight * 0.050}
							onPress={() => navigation.navigate('EditProfile' as any, { user })} // TODO Type
						/>
						<SmallButton
							color={theme.orange3}
							label={`compartilhar${isLoggedUser ? ' perfil' : ''}`}
							highlightedWords={isLoggedUser ? ['compartilhar'] : []}
							fontSize={13}
							SvgIcon={ShareIcon}
							relativeWidth={isLoggedUser ? '60%' : '45%'}
							height={screenHeight * 0.050}
							onPress={() => share('dados do perfil')}
						/>
						<ProfilePopOver
							userName={user.name}
							userId={user.userId}
							buttonLabel={isLoggedUser ? 'sair' : 'denunciar'}
							popoverVisibility={profileOptionsIsOpen}
							closePopover={() => setProfileOptionsIsOpen(false)}
							onPress={isLoggedUser ? performLogout : goToComplaint}
						>
							<SmallButton
								color={theme.white3}
								SvgIcon={isLoggedUser ? GearIcon : ThreeDotsIcon}
								relativeWidth={screenHeight * 0.050}
								height={screenHeight * 0.050}
								onPress={() => setProfileOptionsIsOpen(true)}
							/>
						</ProfilePopOver>
					</OptionsArea>
				</ProfileHeader>
			</DefaultHeaderContainer>
			<Body>
				<HorizontalTagList
					tags={['aula', 'música', 'guitarra']}
					selectedTags={selectedTags}
					onSelectTag={onSelectTag}
				/>
				<FlatList
					data={userPosts}
					renderItem={({ item }: any) => ( // TODO type
						<PostCard
							post={item}
							owner={user}
							onPress={() => goToPostView(item)}
						/> // TODO Type
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <Sigh />}
					ListHeaderComponent={isLoggedUser ? renderNewPostButton() : null}
					ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
					ListFooterComponent={() => <FooterSigh />}
				/>
			</Body>
		</Container>
	)
}

export { Profile }
