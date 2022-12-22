import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, HorizontalSigh, InputContainer, LastSigh, SearchInput, TagsContainer, VerticalSigh, WithoutPostsContainer, WithoutPostsMessage, WithoutPostsTitle } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { PostCollection, PostType } from '../../../services/firebase/types'
import { PostCategoryDetailsScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { getNearPostsIdsByPostType } from '../../../services/firebase/post/getNearPostsIdsByPostType'
import { getListOfPosts } from '../../../services/firebase/post/getListOfPosts'

function PostCategoryDetails({ route, navigation }: PostCategoryDetailsScreenProps) {
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [recentPosts, setRecentPosts] = useState<PostCollection[]>([])

	useEffect(() => {
		getRecentPosts()
	}, [])

	const getRecentPosts = async () => {
		const postIds = await getNearPostsIdsByPostType(
			locationDataContext.geohashes,
			route.params.categoryType as PostType
		)
		const posts = await getListOfPosts(postIds, 'category', route.params.categoryName)
		setRecentPosts([].concat(...posts as any) as any || []) // TODO Type
	}

	const getCategoryIcon = () => {
		const SvgIcon = route.params.cagegoryIcon
		return SvgIcon
	}

	const getFiltredCategoryTags = () => {
		if (!searchText) return route.params.categoryTags
		return route.params.categoryTags.filter((tag) => !!tag.match(new RegExp(`${searchText}`, 'i'))?.length)
	}

	const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', {
			backgroundColor: route.params.backgroundColor,
			cagegoryIcon: route.params.cagegoryIcon,
			categoryType: route.params.categoryType,
			categoryCollection: route.params.categoryCollection,
			tagName
		})
	}

	const viewAllTags = async () => {
		navigation.navigate('ViewAllTags', {
			backgroundColor: route.params.backgroundColor,
			title: route.params.title,
			categoryName: route.params.categoryName,
			cagegoryIcon: route.params.cagegoryIcon,
			categoryType: route.params.categoryType,
			categoryTags: route.params.categoryTags,
			categoryCollection: route.params.categoryCollection
		})
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
					text={route.params.title}
					onBackPress={() => navigation.goBack()}
					SvgIcon={getCategoryIcon()}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onSubmitEditing={() => { }}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor: route.params.backgroundColor }}>
					<SubtitleCard
						text={`todas categorias ${route.params.title}`}
						highlightedText={['todas', ...route.params.title.split(' ')]}
						onPress={viewAllTags}
					/>
					<TagsContainer>
						<FlatList
							data={getFiltredCategoryTags()}
							horizontal
							showsHorizontalScrollIndicator={false}
							ListHeaderComponent={<HorizontalSigh />}
							ListHeaderComponentStyle={{ height: 0 }}
							ItemSeparatorComponent={() => <HorizontalSigh />}
							ListFooterComponentStyle={{ height: 0 }}
							ListFooterComponent={<HorizontalSigh />}
							renderItem={({ item }) => (
								<CategoryCard
									title={item}
									withoutMargin
									onPress={() => viewPostsByTag(item)}
								/>
							)}
						/>
					</TagsContainer>
					<SubtitleCard
						text={'posts de recentes'}
						highlightedText={['recentes']}
						onPress={() => { }}
					/>
					{
						!recentPosts.length
							? (
								<WithoutPostsContainer>
									<WithoutPostsTitle>{'poxa!'}</WithoutPostsTitle>
									<WithoutPostsMessage>{'parece que não temos nenhum post nessa categoria, nosso time já está sabendo e irá resolver!'}</WithoutPostsMessage>
								</WithoutPostsContainer>
							)
							: (
								<FlatList
									data={recentPosts}
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

export { PostCategoryDetails }
