import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput, TagsContainer, VerticalSigh, WithoutPostsContainer, WithoutPostsMessage, WithoutPostsTitle } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { getRecentPostsByTag } from '../../../services/firebase/post/getRecentPostByTag'

import { getNearPostsIdsByPostType } from '../../../services/firebase/post/getNearPostsIdsByPostType'
import { getListOfPosts } from '../../../services/firebase/post/getListOfPosts'

import { PostCollection, PostType } from '../../../services/firebase/types'
import { ViewPostsByTagScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { searchPosts } from '../../../services/algolia/searchPost'

function ViewPostsByTag({ route, navigation }: ViewPostsByTagScreenProps) {
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [recentPosts, setRecentPosts] = useState<PostCollection[]>([])
	const [resultPosts, setResultPosts] = useState<PostCollection[]>([])

	useEffect(() => {
		getRecentPosts()
	}, [])

	const getCategoryIcon = () => {
		const SvgIcon = route.params.cagegoryIcon
		return SvgIcon
	}

	const getRecentPosts = async () => {
		const postIds = await getNearPosts()
		const posts = await getListOfPosts(postIds, 'tags', route.params.tagName)
		setRecentPosts([].concat(...posts as any) as any || []) // TODO Type
	}

	const searchPostByText = async () => {
		if (!searchText) {
			await getRecentPosts()
			setResultPosts([])
			return
		}

		const postIds = await getNearPosts()
		const posts = await searchPosts(searchText, postIds, route.params.tagName)
		setResultPosts(posts)
	}

	const getNearPosts = async () => {
		const nearPosts = await getNearPostsIdsByPostType(
			locationDataContext.geohashes,
			route.params.categoryType as PostType
		)
		return nearPosts
	}

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePostHome' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePostHome' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPostHome' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostHome' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostHome' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			default: return false
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={route.params.tagName}
					SvgIcon={getCategoryIcon()}
					path
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onSubmitEditing={searchPostByText}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor: route.params.backgroundColor }}>
					<SubtitleCard
						text={'posts de recentes'}
						highlightedText={['recentes']}
						onPress={() => { }}
					/>
					{
						!recentPosts.length && !resultPosts.length
							? (
								<WithoutPostsContainer>
									<WithoutPostsTitle>{'poxa!'}</WithoutPostsTitle>
									<WithoutPostsMessage>{'parece que não temos nenhum post nessa categoria, nosso time já está sabendo e irá resolver!'}</WithoutPostsMessage>
								</WithoutPostsContainer>
							)
							: (
								<FlatList
									data={resultPosts.length ? resultPosts : recentPosts}
									renderItem={({ item }) => (
										<PostCard
											post={item}
											owner={item.owner}
											onPress={() => goToPostView(item)}
										/>
									)}
									showsVerticalScrollIndicator={false}
									contentContainerStyle={{ padding: RFValue(10) }}
									ItemSeparatorComponent={() => <VerticalSigh />}
									ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
									ListFooterComponent={<LastSigh />}
								/>
							)
					}

				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewPostsByTag }
