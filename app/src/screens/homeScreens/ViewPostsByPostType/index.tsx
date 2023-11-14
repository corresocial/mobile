import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'
import { Body, Container, ContainerPadding, Header, InputContainer, MacroCategoryContainer } from './styles'
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
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import CountryWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { ViewPostsByPostTypeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'
import { FeedPosts, PostCollection, PostCollectionRemote, PostRange, PostType } from '../../../services/firebase/types'

import { LocationContext } from '../../../contexts/LocationContext'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { PostCard } from '../../../components/_cards/PostCard'
import { AuthContext } from '../../../contexts/AuthContext'

import { FlatListPosts } from '../../../components/FlatListPosts'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { SearchInput } from '../../../components/_inputs/SearchInput'
import { CatalogPostTypeButtons } from '../../../components/CatalogPostTypeButtons'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'

function ViewPostsByPostType({ navigation }: ViewPostsByPostTypeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [feedPostsByType, setFeedPostsByType] = useState<FeedPosts>({ nearby: [], city: [], country: [] })
	const [filteredFeedPosts, setFilteredFeedPosts] = useState<FeedPosts>({ nearby: [], city: [], country: [] })

	useEffect(() => {
		const posts = filterPostsByPostType()
		setFeedPostsByType(posts as any) // TODO Type
	}, [])

	useEffect(() => {
		if (searchText) {
			const posts = filterPostsByText()
			setFilteredFeedPosts(posts)
		}
	}, [searchText])

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

	const getRelativeBackgroundColor = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return { backgroundColor: theme.green2 }
			case 'culture': return { backgroundColor: theme.blue2 }
			case 'socialImpact': return { backgroundColor: theme.pink2 }
			default: return { backgroundColor: theme.orange2 }
		}
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

	const getRelativeCatalogMacroCategoryButtons = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'income': return (
				<CatalogPostTypeButtons
					buttonLabels={['vendas', 'serviços', 'vagas']}
					buttonValues={['income', 'service', 'vacancy']}
					buttonIcons={[SaleWhiteIcon, ServiceWhiteIcon, VacancyWhiteIcon]}
				/>
			)
			case 'culture': return (
				<CatalogPostTypeButtons
					buttonLabels={['arte', 'eventos', 'educação']}
					buttonValues={['art', 'event', 'education']}
					buttonIcons={[ColorPaletWhiteIcon, CalendarSomedayWhiteIcon, BooksWhiteIcon]}
				/>
			)
			case 'socialImpact': return (
				<CatalogPostTypeButtons
					buttonLabels={['informativos', 'iniciativas', 'doações']}
					buttonValues={['informative', 'iniciative', 'donation']}
					buttonIcons={[PeperInfoWhiteIcon, HeartAndPersonWhiteIcon, HandOnHeartWhiteIcon]}
				/>
			)
			default: return <></>
		}
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

	const hasAnyPost = () => {
		return (feedPostsByType.nearby.length > 0 || feedPostsByType.city.length > 0 || feedPostsByType.country.length > 0)
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
						onSubmitEditing={navigateToResultScreen}
						validBackgroundColor={''}
					/>
				</InputContainer>
			</Header>
			<Body style={getRelativeBackgroundColor()}>
				<MacroCategoryContainer backgroundColor={getRelativeBackgroundColor()}>
					{getRelativeCatalogMacroCategoryButtons()}
				</MacroCategoryContainer>
				{
					(feedPostsByType.nearby && feedPostsByType.nearby.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(searchText ? filteredFeedPosts.nearby : feedPostsByType.nearby)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'posts por perto'}
												highlightedText={['perto']}
												seeMoreText
												SvgIcon={PinWhiteIcon}
												onPress={() => viewPostsByRange('near')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
								/>
							</>
						)
						: <></>
				}
				{
					(feedPostsByType.city && feedPostsByType.city.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(searchText ? filteredFeedPosts.nearby : feedPostsByType.city)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'posts na cidade'}
												highlightedText={['cidade']}
												seeMoreText
												SvgIcon={CityWhiteIcon}
												onPress={() => viewPostsByRange('city')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
								/>
							</>
						)
						: <></>
				}
				{
					(feedPostsByType.country && feedPostsByType.country.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(searchText ? filteredFeedPosts.nearby : feedPostsByType.country)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'posts no país'}
												highlightedText={['país']}
												seeMoreText
												SvgIcon={CountryWhiteIcon}
												onPress={() => viewPostsByRange('country')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
								/>
							</>
						)
						: <></>
				}
				<VerticalSigh height={relativeScreenHeight(10)} />
				{
					!hasAnyPost() && (
						<WithoutPostsMessage
							title={'opa!'}
							message={'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'}
						/>
					)
				}
			</Body>
		</Container>
	)
}

export { ViewPostsByPostType }
