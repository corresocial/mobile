import React, { useContext, useState } from 'react'
import { FlatList } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { theme } from '../../../common/theme'
import { Body, Container, ContainerPadding, Header, HorizontalSigh, InputContainer, SearchInput, TagsContainer } from './styles'
import LoupIcon from '../../../assets/icons/loup-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import CountryWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { PostCategoryDetailsScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'
import { PostCollection, PostCollectionRemote, PostRange, PostType } from '../../../services/firebase/types'

import { LocationContext } from '../../../contexts/LocationContext'

import { sortArray } from '../../../common/auxiliaryFunctions'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { AuthContext } from '../../../contexts/AuthContext'

import { FlatListPosts } from '../../../components/FlatListPosts'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'

function PostCategoryDetails({ navigation }: PostCategoryDetailsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')

	const feedPosts = [...locationDataContext.feedPosts.nearby, ...locationDataContext.feedPosts.city, ...locationDataContext.feedPosts.country] || []

	const {
		backgroundColor,
		categorySvgIcon,
		categoryName,
		categoryTags,
		categoryTitle,
		inactiveColor
	} = locationDataContext.currentCategory

	const filterPostsByCategory = () => {
		return {
			nearby: locationDataContext.feedPosts.nearby.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || [],
			city: locationDataContext.feedPosts.city.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || [],
			country: locationDataContext.feedPosts.country.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || []
		}
	}

	const filterPostsByRange = (post: PostCollectionRemote) => {
		return post.category === categoryName
			&& post.postType === locationDataContext.searchParams.postType
			&& !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length
	}

	const filteredFeedPosts = filterPostsByCategory()

	const getFeedPostsTags = () => {
		const userPostTags = feedPosts.reduce((acc: any[], current: PostCollection) => {
			if (!current.tags || current.category !== categoryName) return [...acc]
			const filtredCurrentTags = current.tags.filter((tag) => !acc.includes(tag))
			return [...acc, ...filtredCurrentTags as string[]]
		}, [])

		return userPostTags
	}

	const getFiltredCategoryTags = () => {
		const allTags = [...categoryTags, ...getFeedPostsTags()]

		if (!searchText) {
			return allTags
				.filter((tag, index, array) => array.indexOf(tag) === index)
				.sort(sortArray)
		}

		const filtredTags = allTags
			.filter((tag) => !!tag.match(new RegExp(`${searchText}`, 'i'))?.length)

		return filtredTags.sort(sortArray)
	}

	const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', { currentTagSelected: tagName })
	}

	const viewAllTags = async () => {
		navigation.navigate('ViewAllTags')
	}

	const viewPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return navigation.navigate('ViewPostsByRange', {
				postsByRange: filteredFeedPosts.nearby,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			case 'city': return navigation.navigate('ViewPostsByRange', {
				postsByRange: filteredFeedPosts.city,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType

			})
			case 'country': return navigation.navigate('ViewPostsByRange', {
				postsByRange: filteredFeedPosts.country,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			default: return false
		}
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
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const getFirstFiveItems = (items: any[]) => {
		if (!items) return []
		if (items.length >= 5) return items.slice(0, 5)
		return items
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

	/* const hasAnyPost = () => {
		return (filteredFeedPosts.nearby.length > 0 || filteredFeedPosts.city.length > 0 || filteredFeedPosts.country.length > 0)
	} */

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={categoryTitle}
					SvgIcon={categorySvgIcon}
					smallIconArea
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
				{
					<>
						<VerticalSigh />
						<SubtitleCard
							text={`todas categorias ${categoryTitle}`}
							highlightedText={['todas', ...categoryTitle.split(' ')]}
							onPress={viewAllTags}
						/>
						<VerticalSigh />
					</>
				}
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
								hasElements={!!(feedPosts.filter((post) => post.category === categoryName && post.tags.includes(item) && post.postType === locationDataContext.searchParams.postType)).length}
								inactiveColor={inactiveColor}
								title={item}
								withoutMargin
								onPress={() => viewPostsByTag(item)}
							/>
						)}
					/>
				</TagsContainer>
				{
					(filteredFeedPosts.nearby && filteredFeedPosts.nearby.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(filteredFeedPosts.nearby)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'perto de você'}
												highlightedText={['perto']}
												seeMoreText
												SvgIcon={PinWhiteIcon}
												onPress={() => viewPostsByRange('near')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
								// flatListIsLoading={flatListIsLoading}
								// onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				{
					(filteredFeedPosts.city && filteredFeedPosts.city.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(filteredFeedPosts.city)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'na cidade'}
												highlightedText={['cidade']}
												seeMoreText
												SvgIcon={CityWhiteIcon}
												onPress={() => viewPostsByRange('city')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
								// flatListIsLoading={flatListIsLoading}
								// onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				{
					(filteredFeedPosts.country && filteredFeedPosts.country.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(filteredFeedPosts.country)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'no país'}
												highlightedText={['país']}
												seeMoreText
												SvgIcon={CountryWhiteIcon}
												onPress={() => viewPostsByRange('country')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
								// flatListIsLoading={flatListIsLoading}
								// onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				<VerticalSigh height={relativeScreenHeight(10)} />
				{/* {
					!hasAnyPost() && (
						<WithoutPostsMessage
							title={'opa!'}
							message={'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'}
						/>
					)
				} */}
			</Body>
		</Container>
	)
}

export { PostCategoryDetails }
