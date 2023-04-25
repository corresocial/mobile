import React, { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, HorizontalSigh, InputContainer, LastSigh, SearchInput, TagsContainer, VerticalSigh } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { PostCollection } from '../../../services/firebase/types'
import { PostCategoryDetailsScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { sortArray } from '../../../common/auxiliaryFunctions'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { AuthContext } from '../../../contexts/AuthContext'

function PostCategoryDetails({ navigation }: PostCategoryDetailsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [recentPosts, setRecentPosts] = useState<PostCollection[]>([])

	const { nearbyPosts } = locationDataContext

	useEffect(() => {
		getRecentPosts()
	}, [])

	const {
		backgroundColor,
		categoryIcon,
		categoryName,
		categoryTags,
		categoryTitle,
		inactiveColor
	} = locationDataContext.currentCategory

	const getRecentPosts = async () => {
		const filteredPosts = locationDataContext.nearbyPosts.filter((post) => post.category === categoryName)
		setRecentPosts(filteredPosts)
	}

	const getFiltredCategoryTags = () => {
		if (!searchText) return categoryTags.sort(sortArray)
		const filtredTags = categoryTags.filter((tag) => !!tag.match(new RegExp(`${searchText}`, 'i'))?.length)
		return filtredTags.sort(sortArray)
	}

	const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', { currentTagSelected: tagName })
	}

	const viewAllTags = async () => {
		navigation.navigate('ViewAllTags')
	}

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

	const navigateToResultScreen = () => {
		const customSearchParams = {
			...locationDataContext.searchParams,
			searchText,
			category: locationDataContext.currentCategory.categoryName,
		}
		navigation.navigate('SearchResult', { searchParams: customSearchParams, categoryLabel: locationDataContext.currentCategory.categoryTitle, })
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={categoryTitle}
					svgUri={categoryIcon}
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onSubmitEditing={navigateToResultScreen}
					/>
				</InputContainer>
			</Header>
			<Body style={{ backgroundColor }}>
				<SubtitleCard
					text={`todas categorias ${categoryTitle}`}
					highlightedText={['todas', ...categoryTitle.split(' ')]}
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
								hasElements={!!(nearbyPosts.filter((post) => post.category === categoryName && post.tags.includes(item))).length}
								inactiveColor={inactiveColor}
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
							<WithoutPostsMessage
								title={'poxa!'}
								message={'parece que não temos nenhum post nessa categoria, nosso time já está sabendo e irá resolver!'}
							/>
						)
						: (
							<FlatList
								data={recentPosts}
								renderItem={({ item }) => (
									<PostCard
										post={item}
										owner={item.owner}
										navigateToProfile={navigateToProfile}
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
		</Container>
	)
}

export { PostCategoryDetails }
