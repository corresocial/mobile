import React, { useContext, useEffect, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { FeedPosts, Id, PostCollection, PostRange, PostType } from '@domain/post/entity/types'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToPostView } from '@routes/auxMethods'
import { SearchResultScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'

import { Container, Header, InputContainer } from './styles'
import { theme } from '@common/theme'

import { SearchInput } from '@components/_inputs/SearchInput'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

const { searchPostsCloud } = useCloudFunctionService()

const initialFeedPosts = {
	nearby: [],
	city: [],
	country: []
}

function SearchResult({ route, navigation }: SearchResultScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const queryClient = useQueryClient()
	const { executeCachedRequest } = useCacheRepository()

	const [searchText, setSearchText] = useState('')
	const [resultPosts, setResultPosts] = useState<FeedPosts>(initialFeedPosts)

	const { searchByRange } = route.params
	const backgroundColor = searchByRange ? '' : locationDataContext.currentCategory?.backgroundColor

	const searchParamsFromRoute = { ...route.params.searchParams }
	const algoliaSearchText = searchText || searchParamsFromRoute.searchText

	useEffect(() => {
		searchPostByText()
	}, [])

	const searchPostByText = async () => {
		console.log(`SEARCH TEXT: ${algoliaSearchText}`)

		try {
			setLoaderIsVisible(true)

			const queryKey = ['algolia.search', algoliaSearchText || 'common', searchParamsFromRoute]
			const postsFromAlgolia = await executeCachedRequest(
				queryClient,
				queryKey,
				() => searchPostsByAlgolia()
			)

			setResultPosts(postsFromAlgolia)

			if (!searchText) setSearchText(searchParamsFromRoute.searchText || '')
			setLoaderIsVisible(false)
		} catch (error) {
			setLoaderIsVisible(false)
			console.log(error)
		}
	}

	const searchPostsByAlgolia = async () => {
		return searchPostsCloud(algoliaSearchText || '', searchParamsFromRoute as FeedSearchParams, searchByRange || false, userDataContext.userId as Id)
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

	const getRelativePath = () => {
		if (route.params.searchParams.tag) return route.params.searchParams.tag
		if (route.params.searchParams.category) return route.params.categoryLabel
		return getRelativeTitle(locationDataContext.searchParams?.postType as PostType)
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
			navigation.navigate('Profile' as any)
			return
		}
		navigation.navigate('ProfileHome', { userId })
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const postRangeValue = searchByRange ? '' : postRange
		const postsByRange = getPostsByRange(postRange)
		const postType = locationDataContext.searchParams?.postType

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
						onPressKeyboardSubmit={searchPostByText}
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
