import React, { useContext, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { cacheRequestConfig } from '@data/cache/methods/requests'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToPostView } from '@routes/auxMethods'
import { SearchResultScreenProps } from '@routes/Stack/HomeStack/stackScreenProps'
import { FeedPosts, Id, PostCollection, PostRange, PostType } from '@services/firebase/types'

import { searchPostsCloud } from '@services/cloudFunctions/searchPostsCloud'

import { Container, Header, InputContainer } from './styles'
import { theme } from '@common/theme'

import { SearchInput } from '@components/_inputs/SearchInput'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

const initialFeedPosts = {
	nearby: [],
	city: [],
	country: []
}

function SearchResult({ route, navigation }: SearchResultScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [searchText, setSearchText] = useState('')
	const [resultPosts, setResultPosts] = useState<FeedPosts>(initialFeedPosts)

	const { searchByRange } = route.params
	const backgroundColor = searchByRange ? '' : locationDataContext.currentCategory.backgroundColor

	const searchParamsFromRoute = { ...route.params.searchParams }
	const algoliaSearchText = searchText || searchParamsFromRoute.searchText

	const algoliaSearchPosts = useQuery({ // TODO Type
		queryKey: ['algolia.search', algoliaSearchText || 'common', searchParamsFromRoute],
		queryFn: () => searchPostsByAlgolia(),
		staleTime: cacheRequestConfig.algoliaPosts.persistenceTime,
		gcTime: cacheRequestConfig.algoliaPosts.persistenceTime
	})

	useEffect(() => {
		searchPostByText()
	}, [])

	const searchPostByText = async () => {
		// await searchPosts(algoliaSearchText, searchParamsFromRoute, searchByRange)
		console.log(`SEARCH TEXT: ${algoliaSearchText}`)

		try {
			setLoaderIsVisible(true)

			let postsFromAlgolia = initialFeedPosts

			if (algoliaSearchPosts.data && hasAnyPost(algoliaSearchPosts.data)) {
				console.log('CACHE')
				postsFromAlgolia = algoliaSearchPosts.data
			} else {
				console.log('REFETCH')
				postsFromAlgolia = await searchPostsByAlgolia()
			}

			setResultPosts(postsFromAlgolia)

			if (!searchText) setSearchText(searchParamsFromRoute.searchText)
			setLoaderIsVisible(false)
		} catch (error) {
			setLoaderIsVisible(false)
			console.log(error)
		}
	}

	const searchPostsByAlgolia = async () => {
		return searchPostsCloud(algoliaSearchText, searchParamsFromRoute, searchByRange || false, userDataContext.userId as Id)
			.then((posts) => {
				if (!posts) {
					return initialFeedPosts
				}
				return posts
			})
			.catch((err) => {
				console.log(err)
				setLoaderIsVisible(false)
			})
	}

	const hasAnyPost = (postsByRange: FeedPosts) => {
		return postsByRange
			&& (
				(postsByRange.nearby && postsByRange.nearby.length > 0)
				|| (postsByRange.city && postsByRange.city.length > 0)
				|| (postsByRange.country && postsByRange.country.length > 0)
			)
	}

	const getRelativePath = () => {
		if (route.params.searchParams.tag) return route.params.searchParams.tag
		if (route.params.searchParams.category) return route.params.categoryLabel
		return getRelativeTitle(locationDataContext.searchParams.postType as PostType)
	}

	const getRelativeTitle = (postType: PostType) => {
		switch (postType) {
			case 'income': return 'renda'
			case 'culture': return 'culturas'
			case 'socialImpact': return 'impacto social'
			default: return 'posts'
		}
	}

	const viewPostDetails = (postData: PostCollection) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId })
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const postRangeValue = searchByRange ? '' : postRange
		const postsByRange = getPostsByRange(postRange)
		const { postType } = locationDataContext.searchParams

		navigation.navigate('ViewPostsByRange', { postsByRange, postRange: postRangeValue, postType })
	}

	const getPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return resultPosts.nearby || []
			case 'city': return resultPosts.city || []
			case 'country': return resultPosts.country || []
		}
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={searchByRange ? route.params.categoryLabel : getRelativePath()}
					showResults={!searchByRange}
					path={!searchByRange}
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onPressKeyboardSubmit={algoliaSearchPosts.refetch}
					/>
				</InputContainer>
			</Header>
			<FeedByRange
				backgroundColor={backgroundColor}
				filteredFeedPosts={resultPosts}
				viewPostsByRange={viewPostsByRange}
				navigateToProfile={navigateToProfile}
				goToPostView={viewPostDetails}
			/>
		</Container>
	)
}

export { SearchResult }
