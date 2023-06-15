import React, { useContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'

import { Body, Container, ContainerPadding, Header, InputContainer, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'
import { relativeScreenHeight } from '../../../common/screenDimensions'

import { PostCollection, PostCollectionRemote } from '../../../services/firebase/types'
import { ViewPostByRangeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PostCard } from '../../../components/_cards/PostCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { AuthContext } from '../../../contexts/AuthContext'
import { FlatListPosts } from '../../../components/FlatListPosts'
import { VerticalSigh } from '../../../components/VerticalSigh'

function ViewPostByRange({ route, navigation }: ViewPostByRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [searchText, setSearchText] = useState('')
	const [keyboardOpened, setKeyboardOpened] = useState(false)

	const { postRange, postType } = route.params

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const getFilteredPostsBySearch = () => {
		const { postsByRange } = route.params

		if (searchText) {
			return postsByRange.filter((post: PostCollectionRemote) => !!post.title.match(new RegExp(`${searchText}`, 'i'))?.length)
		}
		return postsByRange
	}

	const postsByRange = getFilteredPostsBySearch()

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePostHome', { postData: { ...item } })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePostHome', { postData: { ...item } })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPostHome', { postData: { ...item } })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostHome', { postData: { ...item } })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostHome', { postData: { ...item } })
				break
			}
			default: return false
		}
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const getRelativeTitle = () => {
		switch (postRange) {
			case 'near': return 'perto de você'
			case 'city': return 'na cidade'
			case 'country': return 'no país'
			default: return 'posts recentes'
		}
	}

	const getRelativeBackgroundColor = () => {
		switch (postType) {
			case 'service': return theme.purple2
			case 'sale': return theme.green2
			case 'vacancy': return theme.yellow2
			case 'culture': return theme.blue2
			case 'socialImpact': return theme.pink2
			default: return theme.orange2
		}
	}

	const renderPostItem = (item: PostCollection) => (
		<ContainerPadding>
			<PostCard
				post={item}
				owner={item.owner}
				navigateToProfile={navigateToProfile}
				onPress={() => goToPostView(item)}
			/>
		</ContainerPadding>
	)

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={getRelativeTitle()}
					highlightedWords={['você', 'cidade', 'país', 'recentes']}
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
					// onSubmitEditing={navigateToResultScreen}
					/>
				</InputContainer>
			</Header>
			<Body style={{ backgroundColor: getRelativeBackgroundColor() }}>
				{
					(postsByRange && postsByRange.length)
						? (
							<>
								<FlatListPosts
									data={postsByRange}
									renderItem={renderPostItem}
									headerComponent={() => (
										<VerticalSigh />
									)}
								// flatListIsLoading={flatListIsLoading}
								// onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				<VerticalSigh height={!keyboardOpened ? relativeScreenHeight(10) : 1} />
				{
					(!postsByRange || (postsByRange && postsByRange.length < 1)) && (
						<WithoutPostsMessage
							title={'opa!'}
							message={'parece que não temos nenhum post {perto de você}, nosso time já está sabendo e irá resolver!'}
						/>
					)
				}
			</Body>
		</Container>
	)
}

export { ViewPostByRange }
