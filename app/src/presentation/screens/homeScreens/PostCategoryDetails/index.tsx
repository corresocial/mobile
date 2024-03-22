import React, { useContext, useState } from 'react'

import { AuthContext } from '@contexts/AuthContext'
import { LocationContext } from '@contexts/LocationContext'

import { FlatListItem } from '@globalTypes/global/types'
import { navigateToPostView } from '@routes/auxMethods'
import { PostCategoryDetailsScreenProps } from '@routes/Stack/HomeStack/stackScreenProps'
import { PostCollection, PostCollectionRemote, PostRange } from '@services/firebase/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, FlatList, Header, InputContainer, TagsContainer } from './styles'
import OtherWhiteIcon from '@assets/icons/categories/others.svg'
import { theme } from '@common/theme'

import { CategoryCard } from '@components/_cards/CategoryCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { SearchInput } from '@components/_inputs/SearchInput'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

const { sortArray } = UiUtils()

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
		return post.macroCategory === locationDataContext.searchParams.macroCategory
			&& post.postType === locationDataContext.searchParams.postType
			&& post.category === categoryName
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
		const allTags = [...categoryTags]

		if (!searchText) {
			return allTags
				.filter((tag, index, array) => array.indexOf(tag) === index)
				.sort(sortArray)
		}

		const filtredTags = allTags
			.filter((tag) => filterTag(tag, searchText))

		return filtredTags.sort(sortArray)
	}

	const hasAnyFilteredCategory = () => {
		const allTags = [...categoryTags, ...getFeedPostsTags()]
		const filtredTags = allTags
			.filter((tag, index, array) => filterTag(tag, searchText) && array.indexOf(tag) === index)
		return filtredTags.length
	}

	const filterTag = (tag: string, matchText: string) => {
		return !!tag.match(new RegExp(`${matchText}`, 'i'))?.length
	}

	const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', { currentTagSelected: tagName })
	}

	const viewAllTags = async () => {
		navigation.navigate('ViewAllTags')
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const postsByRange = getPostsByRange(postRange)
		const { postType } = locationDataContext.searchParams

		navigation.navigate('ViewPostsByRange', { postsByRange, postRange, postType })
	}

	const getPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return filteredFeedPosts.nearby || []
			case 'city': return filteredFeedPosts.city || []
			case 'country': return filteredFeedPosts.country || []
		}
	}

	const viewPostDetails = (postData: PostCollection) => {
		navigateToPostView(postData, navigation, 'Home')
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
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onPressKeyboardSubmit={navigateToResultScreen}
					/>
				</InputContainer>
			</Header>
			<FeedByRange
				backgroundColor={backgroundColor}
				filteredFeedPosts={filteredFeedPosts}
				viewPostsByRange={viewPostsByRange}
				navigateToProfile={navigateToProfile}
				goToPostView={viewPostDetails}
			>
				{
					hasAnyFilteredCategory()
						? (
							<>
								<SubtitleCard
									text={'tags'}
									highlightedText={['tags']}
									SvgIcon={OtherWhiteIcon}
									seeMoreText
									onPress={viewAllTags}
								/>
								<VerticalSpacing />
								<TagsContainer>
									<FlatList
										data={getFiltredCategoryTags()}
										horizontal
										showsHorizontalScrollIndicator={false}
										ListHeaderComponent={<HorizontalSpacing />}
										ListHeaderComponentStyle={{ height: 0 }}
										ItemSeparatorComponent={() => <HorizontalSpacing />}
										ListFooterComponentStyle={{ height: 0 }}
										ListFooterComponent={<HorizontalSpacing />}
										renderItem={({ item }: FlatListItem<string>) => (
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
							</>
						)
						: <></>
				}
			</FeedByRange>
		</Container>
	)
}

export { PostCategoryDetails }
