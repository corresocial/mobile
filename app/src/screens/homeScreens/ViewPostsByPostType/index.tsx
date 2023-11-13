import React, { useContext, useState } from 'react'

import { theme } from '../../../common/theme'
import { Body, Container, ContainerPadding, Header, InputContainer, MacroCategoryContainer } from './styles'
import CashWhiteIcon from '../../../assets/icons/cash-white.svg'
import SaleWhiteIcon from '../../../assets/icons/sale-white.svg'
import ServiceWhiteIcon from '../../../assets/icons/service-white.svg'
import VacancyWhiteIcon from '../../../assets/icons/vacancy-white.svg'

import { ViewPostsByPostTypeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'
import { PostCollection, PostCollectionRemote, PostRange, PostType } from '../../../services/firebase/types'

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

	const filterPostsByCategory = () => {
		return {
			nearby: locationDataContext.feedPosts.nearby.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || [],
			city: locationDataContext.feedPosts.city.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || [],
			country: locationDataContext.feedPosts.country.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || []
		}
	}

	const filterPostsByRange = (post: PostCollectionRemote) => {
		if (!post) return false

		if (locationDataContext.searchParams.postType === 'income'
			&& (
				post.postType === 'sale'
				|| post.postType === 'service'
				|| post.postType === 'vacancy'
			)) {
			return true
		}

		return post.postType === locationDataContext.searchParams.postType
			&& !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length
	}

	const filteredFeedPosts = filterPostsByCategory()

	/* const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', { currentTagSelected: tagName })
	}

	const viewAllTags = async () => {
		navigation.navigate('ViewAllTags')
	} */

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
			case 'culture': return CashWhiteIcon
			case 'socialImpact': return CashWhiteIcon
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
					buttonLabels={['vendas', 'serviços', 'vagas']}
					buttonValues={['income', 'service', 'vacancy']}
					buttonIcons={[SaleWhiteIcon, ServiceWhiteIcon, VacancyWhiteIcon]}
				/>
			)
			case 'socialImpact': return (
				<CatalogPostTypeButtons
					buttonLabels={['vendas', 'serviços', 'vagas']}
					buttonValues={['income', 'service', 'vacancy']}
					buttonIcons={[SaleWhiteIcon, ServiceWhiteIcon, VacancyWhiteIcon]}
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
		return (filteredFeedPosts.nearby.length > 0 || filteredFeedPosts.city.length > 0 || filteredFeedPosts.country.length > 0)
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
