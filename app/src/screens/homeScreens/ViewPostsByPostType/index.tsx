import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'
import { Container, Header, InputContainer, MacroCategoryContainer } from './styles'
import CashWhiteIcon from '../../../assets/icons/cash-white.svg'
import SaleWhiteIcon from '../../../assets/icons/sale-white.svg'
import ServiceWhiteIcon from '../../../assets/icons/service-white.svg'
import VacancyWhiteIcon from '../../../assets/icons/vacancy-white.svg'
import SocialImpactWhiteIcon from '../../../assets/icons/socialImpact-white.svg'
import CultureWhiteIcon from '../../../assets/icons/culture-white.svg'
import ColorPaletWhiteIcon from '../../../assets/icons/colorPalet-white.svg'
import CalendarSomedayWhiteIcon from '../../../assets/icons/calendarSomeday-white.svg'
import BooksWhiteIcon from '../../../assets/icons/books-white.svg'
import HandOnHeartWhiteIcon from '../../../assets/icons/handOnHeart-white.svg'
import HeartAndPersonWhiteIcon from '../../../assets/icons/heartAndPerson-white.svg'
import PeperInfoWhiteIcon from '../../../assets/icons/paperInfo-white.svg'

import { ViewPostsByPostTypeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'
import { FeedPosts, PostCollection, PostCollectionRemote, PostRange, PostType } from '../../../services/firebase/types'

import { LocationContext } from '../../../contexts/LocationContext'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SearchInput } from '../../../components/_inputs/SearchInput'
import { CatalogPostTypeButtons } from '../../../components/CatalogPostTypeButtons'
import { FeedByRange } from '../../../components/FeedByRange'

function ViewPostsByPostType({ navigation }: ViewPostsByPostTypeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [feedPostsByType, setFeedPostsByType] = useState<FeedPosts>({ nearby: [], city: [], country: [] })
	const [filteredFeedPosts, setFilteredFeedPosts] = useState<FeedPosts>({ nearby: [], city: [], country: [] })

	useEffect(() => {
		setCurrentCategoryColorsOnContext()

		const posts = filterPostsByPostType()
		setFeedPostsByType(posts as any) // TODO Type
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
			nearby: locationDataContext.feedPosts.nearby.filter((post: PostCollectionRemote) => postBelongContextPostType(post)) || [],
			city: locationDataContext.feedPosts.city.filter((post: PostCollectionRemote) => postBelongContextPostType(post)) || [],
			country: locationDataContext.feedPosts.country.filter((post: PostCollectionRemote) => postBelongContextPostType(post)) || []
		}
	}

	const postBelongContextPostType = (post: PostCollectionRemote) => {
		if (!post) return false

		if (locationDataContext.searchParams.postType === 'income'
			&& (
				post.postType === 'sale' // TODO Temporary
				|| post.postType === 'service'
				|| post.postType === 'vacancy'
			)) {
			return true
		}

		return post.postType === locationDataContext.searchParams.postType
	}

	const filterPostsByText = () => {
		return {
			nearby: feedPostsByType.nearby.filter((post: PostCollectionRemote) => hasPostDescriptionMatch(post)) || [],
			city: feedPostsByType.city.filter((post: PostCollectionRemote) => hasPostDescriptionMatch(post)) || [],
			country: feedPostsByType.country.filter((post: PostCollectionRemote) => hasPostDescriptionMatch(post)) || []
		}
	}

	const hasPostDescriptionMatch = (post: PostCollectionRemote) => {
		if (!post) return false
		return !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length
	}

	const viewPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return navigation.navigate('ViewPostsByRange', {
				postsByRange: feedPostsByType.nearby,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			case 'city': return navigation.navigate('ViewPostsByRange', {
				postsByRange: feedPostsByType.city,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType

			})
			case 'country': return navigation.navigate('ViewPostsByRange', {
				postsByRange: feedPostsByType.country,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			default: return false
		}
	}

	const goToPostView = (post: PostCollection | any) => { // TODO Type
		switch (post.postType) {
			case 'income': {
				switch (post[`${post.postType}Type`]) {
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

	const navigateToResultScreen = () => {
		const customSearchParams = {
			...locationDataContext.searchParams,
			searchText,
			macroCategory: '',
			category: '',
			tag: ''
		}
		navigation.navigate('SearchResult', { searchParams: customSearchParams })
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
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
					onPress={(macroCategory: string) => navigateToPostSubcatery(macroCategory)}
				/>
			)
			case 'culture': return (
				<CatalogPostTypeButtons
					buttonLabels={['arte', 'eventos', 'educação']}
					buttonValues={['art', 'event', 'education']}
					buttonIcons={[ColorPaletWhiteIcon, CalendarSomedayWhiteIcon, BooksWhiteIcon]}
					onPress={(macroCategory: string) => navigateToPostSubcatery(macroCategory)}
				/>
			)
			case 'socialImpact': return (
				<CatalogPostTypeButtons
					buttonLabels={['informativos', 'iniciativas', 'doações']}
					buttonValues={['informative', 'iniciative', 'donation']}
					buttonIcons={[PeperInfoWhiteIcon, HeartAndPersonWhiteIcon, HandOnHeartWhiteIcon]}
					onPress={(macroCategory: string) => navigateToPostSubcatery(macroCategory)}
				/>
			)
			default: return <></>
		}
	}

	const navigateToPostSubcatery = (macroCategory: string) => {
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
						onChangeText={(text: string) => setSearchText(text)}
						onPressKeyboardSubmit={navigateToResultScreen}
						validBackgroundColor={''}
					/>
				</InputContainer>
			</Header>
			<FeedByRange
				backgroundColor={getRelativeBackgroundColor()}
				filteredFeedPosts={searchText ? { ...filteredFeedPosts } : { ...feedPostsByType }}
				viewPostsByRange={viewPostsByRange}
				navigateToProfile={navigateToProfile}
				goToPostView={goToPostView}
			>
				<MacroCategoryContainer backgroundColor={getRelativeBackgroundColor()}>
					{getRelativeCatalogMacroCategoryButtons()}
				</MacroCategoryContainer>
			</FeedByRange>
		</Container>
	)
}

export { ViewPostsByPostType }
