import React, { useContext, useEffect, useState } from 'react'

import { FeedPosts, PostEntityOptional, PostEntity, PostRange } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToPostView, navigateToProfileView } from '@routes/auxMethods'
import { ViewPostsByPostTypeScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { Container, Header, InputContainer, MacroCategoryContainer } from './styles'
import BooksWhiteIcon from '@assets/icons/books-white.svg'
import CalendarSomedayWhiteIcon from '@assets/icons/calendarSomeday-white.svg'
import CashWhiteIcon from '@assets/icons/cash-white.svg'
import ColorPaletWhiteIcon from '@assets/icons/colorPalet-white.svg'
import CultureWhiteIcon from '@assets/icons/culture-white.svg'
import HandOnHeartWhiteIcon from '@assets/icons/handOnHeart-white.svg'
import HeartAndPersonWhiteIcon from '@assets/icons/heartAndPerson-white.svg'
import PeperInfoWhiteIcon from '@assets/icons/paperInfo-white.svg'
import PublicServicesWhiteIcon from '@assets/icons/publicServices-white.svg'
import SaleWhiteIcon from '@assets/icons/sale-white.svg'
import ServiceWhiteIcon from '@assets/icons/service-white.svg'
import SocialImpactWhiteIcon from '@assets/icons/socialImpact-white.svg'
import VacancyWhiteIcon from '@assets/icons/vacancy-white.svg'
import { theme } from '@common/theme'

import { SearchInput } from '@components/_inputs/SearchInput'
import { CatalogPostTypeButtons } from '@components/CatalogPostTypeButtons'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

function ViewPostsByPostType({ navigation }: ViewPostsByPostTypeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [feedPostsByType, setFeedPostsByType] = useState<FeedPosts>({ nearby: [], city: [], country: [] })
	const [filteredFeedPosts, setFilteredFeedPosts] = useState<FeedPosts>({ nearby: [], city: [], country: [] })

	useEffect(() => {
		setCurrentCategoryColorsOnContext()

		const posts = filterPostsByPostType()
		setFeedPostsByType(posts)
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

		setLocationDataOnContext({ currentCategory: { ...locationDataContext.currentCategory, ...currentCategory } })
	}

	const filterPostsByPostType = () => {
		return {
			nearby: locationDataContext.feedPosts.nearby.filter((post) => postBelongContextPostType(post)) || [],
			city: locationDataContext.feedPosts.city.filter((post) => postBelongContextPostType(post)) || [],
			country: locationDataContext.feedPosts.country.filter((post) => postBelongContextPostType(post)) || []
		}
	}

	const postBelongContextPostType = (post: PostEntity) => {
		if (!post) return false
		return post.postType === locationDataContext.searchParams.postType
	}

	const filterPostsByText = () => {
		return {
			nearby: feedPostsByType.nearby.filter((post) => hasPostDescriptionMatch(post)) || [],
			city: feedPostsByType.city.filter((post) => hasPostDescriptionMatch(post)) || [],
			country: feedPostsByType.country.filter((post) => hasPostDescriptionMatch(post)) || []
		}
	}

	const hasPostDescriptionMatch = (post: PostEntity) => {
		if (!post) return false
		return !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const postsByRange = getPostsByRange(postRange)
		const { postType } = locationDataContext.searchParams

		navigation.navigate('ViewPostsByRange', { postsByRange, postRange, postType })
	}

	const getPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return feedPostsByType.nearby || []
			case 'city': return feedPostsByType.city || []
			case 'country': return feedPostsByType.country || []
		}
	}

	const viewPostViewDetails = (postData: PostEntityOptional) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const navigateToResultScreen = () => {
		const customSearchParams = {
			...locationDataContext.searchParams,
			searchText,
			macroCategory: '' as MacroCategoriesType,
			category: '',
			tag: ''
		}

		navigation.navigate('SearchResult', { searchParams: customSearchParams })
	}

	const navigateToProfile = (userId: string, redirect?: string) => {
		if (userDataContext.userId === userId) {
			return navigateToProfileView(navigation, '', '', redirect)
		}
		navigateToProfileView(navigation, userId, 'Home', redirect)
	}

	const getRelaticeHeaderIcon = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return CashWhiteIcon
			case 'culture': return CultureWhiteIcon
			case 'socialImpact': return SocialImpactWhiteIcon
			default: return CashWhiteIcon
		}
	}

	const getRelaticeHeaderText = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return 'renda'
			case 'culture': return 'cultura'
			case 'socialImpact': return 'cidadania'
			default: return 'posts'
		}
	}

	const getRelativeBackgroundColor = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return theme.green2
			case 'culture': return theme.blue2
			case 'socialImpact': return theme.pink2
			default: return theme.orange2
		}
	}

	const getInactiveCardColor = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return theme.green1
			case 'culture': return theme.blue1
			case 'socialImpact': return theme.pink1
			default: return theme.orange1
		}
	}

	const getRelativeCatalogMacroCategoryButtons = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return (
				<CatalogPostTypeButtons
					buttonLabels={['vendas', 'serviços', 'vagas']}
					buttonValues={['sale', 'service', 'vacancy']}
					buttonIcons={[SaleWhiteIcon, ServiceWhiteIcon, VacancyWhiteIcon]}
					onPress={(macroCategory: MacroCategoriesType) => navigateToPostSubcatery(macroCategory)}
				/>
			)
			case 'culture': return (
				<CatalogPostTypeButtons
					buttonLabels={['arte', 'eventos', 'educação']}
					buttonValues={['art', 'event', 'education']}
					buttonIcons={[ColorPaletWhiteIcon, CalendarSomedayWhiteIcon, BooksWhiteIcon]}
					onPress={(macroCategory: MacroCategoriesType) => navigateToPostSubcatery(macroCategory)}
				/>
			)
			case 'socialImpact': return (
				<CatalogPostTypeButtons
					buttonLabels={['informativos', 'iniciativas', 'doações']}
					buttonValues={['informative', 'iniciative', 'donation']}
					buttonIcons={[PeperInfoWhiteIcon, HeartAndPersonWhiteIcon, HandOnHeartWhiteIcon]}
					onPress={(macroCategory: MacroCategoriesType) => navigateToPostSubcatery(macroCategory)}
				/>
			)
			default: return <></>
		}
	}

	const navigateToPostSubcatery = (macroCategory: MacroCategoriesType | 'publicServices') => {
		if (macroCategory === 'publicServices') {
			navigation.navigate('PublicServicesStack')
			return
		}

		if (macroCategory === 'event') {
			return navigation.navigate('EventsCalendar')
		}

		setLocationDataOnContext({ searchParams: { ...locationDataContext.searchParams, macroCategory } })
		navigation.navigate('PostCategories')
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={getRelaticeHeaderText()}
					SvgIcon={getRelaticeHeaderIcon()}
					smallIconArea
					onBackPress={() => navigation.goBack()}
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
			<FeedByRange
				backgroundColor={getRelativeBackgroundColor()}
				filteredFeedPosts={searchText ? { ...filteredFeedPosts } : { ...feedPostsByType }}
				viewPostsByRange={viewPostsByRange}
				collapseExternalVacancies
				navigateToProfile={navigateToProfile}
				goToPostView={viewPostViewDetails}
			>
				<MacroCategoryContainer backgroundColor={getRelativeBackgroundColor()}>
					{getRelativeCatalogMacroCategoryButtons()}
				</MacroCategoryContainer>
			</FeedByRange>
		</Container>
	)
}

export { ViewPostsByPostType }
