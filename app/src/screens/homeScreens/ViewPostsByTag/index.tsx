import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, ContainerPadding, Header, InputContainer, SearchInput } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { PostCollection, PostCollectionRemote, PostRange, PostType } from '../../../services/firebase/types'
import { ViewPostsByTagScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { LocationContext } from '../../../contexts/LocationContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { PostCard } from '../../../components/_cards/PostCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { FlatListPosts } from '../../../components/FlatListPosts'
import { VerticalSigh } from '../../../components/VerticalSigh'

function ViewPostsByTag({ route, navigation }: ViewPostsByTagScreenProps) {
	const { locationDataContext } = useContext(LocationContext)
	const { userDataContext } = useContext(AuthContext)

	const [searchText, setSearchText] = useState('')

	const {
		backgroundColor,
		categoryIcon,
		categoryName,
	} = locationDataContext.currentCategory

	const filterPostsByCategory = () => {
		return {
			nearby: locationDataContext.feedPosts.nearby.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || [],
			city: locationDataContext.feedPosts.city.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || [],
			country: locationDataContext.feedPosts.country.filter((post: PostCollectionRemote) => filterPostsByRange(post)) || []
		}
	}

	const filterPostsByRange = (post: PostCollectionRemote) => {
		return post.category === categoryName
			&& post.postType === locationDataContext.searchParams.postType
			&& !!post.title.match(new RegExp(`${searchText}`, 'i'))?.length
			&& !!post.tags.includes(route.params.currentTagSelected)
	}

	const filteredFeedPosts = filterPostsByCategory()

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
			tag: route.params.currentTagSelected
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

	const getFirstFiveItems = (items: any[]) => {
		if (!items) return []
		if (items.length >= 5) return items.slice(0, 5)
		return items
	}

	const hasAnyPost = () => {
		return (filteredFeedPosts.nearby.length > 0 || filteredFeedPosts.city.length > 0 || filteredFeedPosts.country.length > 0)
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

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={route.params.currentTagSelected}
					svgUri={categoryIcon}
					path
					onBackPress={() => navigation.goBack()}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onSubmitEditing={navigateToResultScreen}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor }}>
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
									// flatListIsLoading={flatListIsLoading}
									// onEndReached={refreshFlatlist}
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
									// flatListIsLoading={flatListIsLoading}
									// onEndReached={refreshFlatlist}
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
									// flatListIsLoading={flatListIsLoading}
									// onEndReached={refreshFlatlist}
									/>
									<VerticalSigh height={relativeScreenHeight(10)} />
								</>
							)
							: <></>
					}
					{
						!hasAnyPost() && (
							<WithoutPostsMessage
								title={'opa!'}
								message={
									'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'
								}
							/>
						)
					}
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewPostsByTag }
