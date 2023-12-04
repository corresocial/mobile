import React, { useContext, useEffect, useState } from 'react'

import { Container, Header, InputContainer } from './styles'
import { theme } from '../../../common/theme'

import { FeedPosts, Id, PostCollection, PostRange, PostType } from '../../../../services/firebase/types'
import { SearchResultScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../../contexts/LocationContext'
import { AuthContext } from '../../../../contexts/AuthContext'
import { LoaderContext } from '../../../../contexts/LoaderContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { searchPostsCloud } from '../../../../services/cloudFunctions/searchPostsCloud'
import { FeedByRange } from '../../../components/FeedByRange'
import { SearchInput } from '../../../components/_inputs/SearchInput'
import { navigateToPostView } from '../../../routes/auxMethods'

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

	useEffect(() => {
		searchPostByText()
	}, [])

	const searchPostByText = async () => {
		const searchParamsFromRoute = { ...route.params.searchParams }

		const algoliaSearchText = searchText || searchParamsFromRoute.searchText

		console.log(`SEARCH TEXT: ${algoliaSearchText}`)

		setLoaderIsVisible(true)
		// await searchPosts(algoliaSearchText, searchParamsFromRoute, searchByRange)
		await searchPostsCloud(algoliaSearchText, searchParamsFromRoute, searchByRange || false, userDataContext.userId as Id)
			.then((posts) => {
				if (!posts) {
					setResultPosts(initialFeedPosts as FeedPosts)
				} else {
					setResultPosts(posts as FeedPosts)
				}

				if (!searchText) setSearchText(route.params.searchParams.searchText)
				setLoaderIsVisible(false)
			})
			.catch((err) => {
				console.log(err)
				setLoaderIsVisible(false)
			})
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
