import React, { useContext, useEffect, useState } from 'react'

import { RFValue } from 'react-native-responsive-fontsize'
import { Container, Header, InputContainer, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup-white.svg'

import { FeedPosts, Id, PostCollection, PostRange, PostType } from '../../../services/firebase/types'
import { SearchResultScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { searchPostsCloud } from '../../../services/cloudFunctions/searchPostsCloud'
import { FeedByRange } from '../../../components/FeedByRange'

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
	const { backgroundColor } = locationDataContext.currentCategory

	useEffect(() => {
		searchPostByText()
	}, [])

	const searchPostByText = async () => {
		const searchParamsFromRoute = { ...route.params.searchParams }

		const algoliaSearchText = searchText || searchParamsFromRoute.searchText

		console.log(`SEARCH TEXT: ${algoliaSearchText}`)

		setLoaderIsVisible(true)
		await searchPostsCloud(algoliaSearchText, searchParamsFromRoute, searchByRange || false, userDataContext.userId as Id)
			// await searchPosts(algoliaSearchText, searchParamsFromRoute, searchByRange)
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
			case 'service': return 'serviços'
			case 'sale': return 'comércio'
			case 'vacancy': return 'vagas'
			case 'culture': return 'culturas'
			case 'socialImpact': return 'impacto social'
			default: return 'posts'
		}
	}

	const goToPostView = (post: PostCollection | any) => { // TODO Type
		switch (post.postType) {
			case 'income': {
				switch (post.macroCategory) {
					case 'sale': return navigation.navigate('ViewSalePostHome', { postData: { ...post } })
					case 'service': return navigation.navigate('ViewServicePostHome', { postData: { ...post } })
					case 'vacancy': return navigation.navigate('ViewVacancyPostHome', { postData: { ...post } })
					default: return false
				}
			}

			case 'service': return navigation.navigate('ViewServicePostHome', { postData: { ...post } })
			case 'sale': return navigation.navigate('ViewSalePostHome', { postData: { ...post } })
			case 'vacancy': return navigation.navigate('ViewVacancyPostHome', { postData: { ...post } })
			case 'socialImpact': return navigation.navigate('ViewSocialImpactPostHome', { postData: { ...post } })
			case 'culture': return navigation.navigate('ViewCulturePostHome', { postData: { ...post } })
			default: return false
		}
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId })
	}

	const viewPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return navigation.navigate('ViewPostsByRange', {
				postsByRange: resultPosts.nearby,
				postRange: searchByRange ? '' : postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			case 'city': return navigation.navigate('ViewPostsByRange', {
				postsByRange: resultPosts.city,
				postRange: searchByRange ? '' : postRange,
				postType: locationDataContext.searchParams.postType as PostType

			})
			case 'country': return navigation.navigate('ViewPostsByRange', {
				postsByRange: resultPosts.country,
				postRange: searchByRange ? '' : postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			default: return false
		}
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={searchByRange ? route.params.categoryLabel : getRelativePath()}
					// SvgIcon={getCategoryIcon()}
					showResults={!searchByRange}
					path={!searchByRange}
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
			<FeedByRange
				backgroundColor={backgroundColor}
				filteredFeedPosts={resultPosts}
				viewPostsByRange={viewPostsByRange}
				navigateToProfile={navigateToProfile}
				goToPostView={goToPostView}
			/>
		</Container>
	)
}

export { SearchResult }
