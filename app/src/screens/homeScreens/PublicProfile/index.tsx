import React, { useEffect, useState } from 'react'
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
	FooterSigh
} from './styles'
import { theme } from '../../../common/theme'
import ChatIcon from '../../../assets/icons/chat.svg'
import ShareIcon from '../../../assets/icons/share.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { LocalUserData } from '../../../contexts/types'
import { PostCollection } from '../../../services/firebase/types'

// import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { screenHeight } from '../../../common/screenDimensions'
import { HorizontalTagList } from '../../../components/HorizontalTagList'
import { PostCard } from '../../../components/_cards/PostCard'
import { TextGradient } from '../../../components/TextGradient'
import { getUser } from '../../../services/firebase/user/getUser'
import { ProfilePopOver } from '../../../components/ProfilePopOver'

function PublicProfile({ navigation }: HomeTabScreenProps) {
	// const { getDataFromSecureStore } = useContext(AuthContext)

	const [user, setUser] = useState<LocalUserData>({})
	const [userPosts, setUserPosts] = useState([])
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [profileOptionsIsOpen, setProfileOptionsIsOpen] = useState(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// getProfileDataFromLocal()
			getProfileDataFromRemote()
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		// getProfileDataFromLocal()
		getProfileDataFromRemote()
	}, [])

	const getProfileDataFromRemote = async () => {
		const userId = 'RMCJAuUhLjSmAu3kgjTzRjjZ2jB2'
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

	/* const getProfileDataFromLocal = async () => {
		const localUser = await getObjectLocalUser()
		const { profilePictureUrl, name, posts, description } = localUser as LocalUserData
		setUser({
			name,
			description,
			profilePictureUrl: profilePictureUrl || [],
		})
		setUserPosts(posts as never)
	} */

	/* const getObjectLocalUser = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		return userObject
	} */

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

	const goToPostView = (item: PostCollection) => { // TODO type
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePost', { postData: { ...item, owner: user } })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePost', { postData: { ...item, owner: user } })
				break
			}
			default: return false
		}
	}

	return (
		<Container style={{
			flex: 1
		}}
		>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
							checked
						/>
						<InfoArea>
							<UserName numberOfLines={1}>{user.name}</UserName>
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
							label={'chat'}
							fontSize={14}
							SvgIcon={ChatIcon}
							relativeWidth={'30%'}
							height={screenHeight * 0.050}
							onPress={() => { }}
						/>
						<SmallButton
							color={theme.orange3}
							label={'compartilhar'}
							fontSize={14}
							SvgIcon={ShareIcon}
							relativeWidth={'45%'}
							height={screenHeight * 0.050}
							onPress={() => { }}
						/>
						<ProfilePopOver
							userName={user.name}
							userId={user.userId}
							popoverVisibility={profileOptionsIsOpen}
							closePopover={() => setProfileOptionsIsOpen(false)}
							onPress={() => Alert.alert('go to complaint')}
						>
							<SmallButton
								color={theme.white3}
								SvgIcon={ThreeDotsIcon}
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
						<PostCard post={item} owner={user} onPress={() => goToPostView(item)} /> // TODO Type
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <Sigh />}
					ListFooterComponent={() => <FooterSigh />}
				/>
			</Body>
		</Container>
	)
}

export { PublicProfile }
