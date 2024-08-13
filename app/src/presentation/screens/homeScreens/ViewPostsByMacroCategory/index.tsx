import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { FeedPosts, PostType, PostEntityOptional, PostEntity, PostRange } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToPostView, navigateToProfileView } from '@routes/auxMethods'
import { ViewPostsByMacroCategoryScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { postMacroCategories } from '@utils/postMacroCategories'

import { Container, Header, InputContainer } from './styles'
import { theme } from '@common/theme'

import { SearchInput } from '@components/_inputs/SearchInput'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

function ViewPostsByMacroCategory({ route, navigation }: ViewPostsByMacroCategoryScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')

	const [feedPostsByTypeAndMacroCategory, setFeedPostsByTypeAndMacroCategory] = useState<FeedPosts>({ nearby: [], city: [], country: [] })
	const [filteredFeedPosts, setFilteredFeedPosts] = useState<FeedPosts>({ nearby: [], city: [], country: [] })

	const { postType, macroCategory } = (route.params?.macroCategory && route.params.postType) ? route.params : locationDataContext.searchParams
	// CURRENT inative color prop
	const { inactiveColor, backgroundColor } = locationDataContext.currentCategory

	useEffect(() => {
		const posts = filterPostsByPostType()
		setFeedPostsByTypeAndMacroCategory(posts)
		setCurrentCategoryColorsOnContext()
	}, [])

	useEffect(() => {
		if (searchText) {
			const posts = filterPostsByText()
			setFilteredFeedPosts(posts)
		}
	}, [searchText])

	const setCurrentCategoryColorsOnContext = () => {
		const currentCategory = {
			backgroundColor: getRelativeBackgroundColor(),
			inactiveColor: getInactiveCardColor()
		}

		const currentParams = { postType, macroCategory }

		setLocationDataOnContext({
			currentCategory: {
				...locationDataContext.currentCategory,
				...currentCategory
			},
			searchParams: { ...locationDataContext.searchParams, ...currentParams }
		})
	}

	const getRelativeBackgroundColor = () => {
		switch (postType) {
			case 'income': return theme.colors.green[2]
			case 'culture': return theme.colors.blue[2]
			case 'socialImpact': return theme.colors.pink[2]
			default: return theme.colors.orange[2]
		}
	}

	const getInactiveCardColor = () => {
		switch (postType) {
			case 'income': return theme.colors.green[1]
			case 'culture': return theme.colors.blue[1]
			case 'socialImpact': return theme.colors.pink[1]
			default: return theme.colors.orange[1]
		}
	}

	const filterPostsByPostType = () => {
		return {
			nearby: locationDataContext.feedPosts?.nearby.filter((post) => postBelongContextPostType(post)) || [],
			city: locationDataContext.feedPosts?.city.filter((post) => postBelongContextPostType(post)) || [],
			country: locationDataContext.feedPosts?.country.filter((post) => postBelongContextPostType(post)) || []
		}
	}

	const postBelongContextPostType = (post: PostEntityOptional) => {
		if (!post) return false
		return ((post.postType === postType)
			&& post.macroCategory === macroCategory)
	}

	const filterPostsByText = () => {
		return {
			nearby: feedPostsByTypeAndMacroCategory.nearby.filter((post) => hasPostDescriptionMatch(post)) || [],
			city: feedPostsByTypeAndMacroCategory.city.filter((post) => hasPostDescriptionMatch(post)) || [],
			country: feedPostsByTypeAndMacroCategory.country.filter((post) => hasPostDescriptionMatch(post)) || []
		}
	}

	const hasPostDescriptionMatch = (post: PostEntity) => {
		if (!post) return false
		return !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length
	}

	const getRelativeTitle = () => {
		const customPostType = postType as PostType
		const currentPostType: any = postMacroCategories[customPostType]
		const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
		return currentMacroCategory.label
	}

	const getRelativeHeaderIcon = () => {
		const customPostType = postType
		const currentPostType: any = postMacroCategories[customPostType]
		const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
		return currentMacroCategory.SvgIcon
	}

	const navigateToProfile = (userId: string, redirect?: string) => {
		if (userDataContext.userId === userId) {
			return navigateToProfileView(navigation, '', '', redirect)
		}
		navigateToProfileView(navigation, userId, 'Home', redirect)
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const postsByRange = getPostsByRange(postRange)
		const postTypeFromRoute = postType

		navigation.navigate('ViewPostsByRange', { postsByRange, postRange, postType: postTypeFromRoute, collapseExternalVacancies: false })
	}

	const getPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return feedPostsByTypeAndMacroCategory.nearby || []
			case 'city': return feedPostsByTypeAndMacroCategory.city || []
			case 'country': return feedPostsByTypeAndMacroCategory.country || []
		}
	}

	const viewPostDetails = (postData: PostEntityOptional) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const navigateToResultScreen = () => {
		const currentCategory = {
			categoryName: '',
			categoryTitle: '',
			categorySvgIcon: null,
			categoryTags: ['']
		}

		setLocationDataOnContext({ currentCategory: { ...locationDataContext.currentCategory, ...currentCategory } })

		const customSearchParams = {
			...locationDataContext.searchParams,
			searchText,
			category: '',
			tag: ''
		}

		navigation.navigate('SearchResult', { searchParams: customSearchParams })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={getRelativeTitle()}
					SvgIcon={getRelativeHeaderIcon()}
				/>
				<InputContainer>
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						clearOnSubmit
						onChangeText={(text: string) => setSearchText(text)}
						onPressKeyboardSubmit={navigateToResultScreen}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1, backgroundColor }}>
				<FeedByRange
					backgroundColor={backgroundColor}
					filteredFeedPosts={searchText ? { ...filteredFeedPosts } : { ...feedPostsByTypeAndMacroCategory }}
					viewPostsByRange={viewPostsByRange}
					collapseExternalVacancies={false}
					navigateToProfile={navigateToProfile}
					goToPostView={viewPostDetails}
				/>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewPostsByMacroCategory }
