import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Keyboard } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, ContainerPadding, FilterButtons, Header, InputContainer, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'
import ChatWhiteIcon from '../../../assets/icons/chatTabIconInactive.svg'
import PaperListIcon from '../../../assets/icons/paperList.svg'

import { FeedPosts, Id, PostCollection, PostRange, PostType } from '../../../services/firebase/types'
import { SearchResultScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PostCard } from '../../../components/_cards/PostCard'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { searchPosts } from '../../../services/algolia/searchPost'
import { searchPostsCloud } from '../../../services/cloudFunctions/searchPostsCloud'
import { FlatListPosts } from '../../../components/FlatListPosts'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { VerticalSigh } from '../../../components/VerticalSigh'

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
	const [resultProfiles] = useState<any[]>([]) // setResultProfiles
	const [postResultsIsVisible, setPostResultsIsVisible] = useState(true)
	const [profileResultsIsVisible, setProfileResultsIsVisible] = useState(false)

	const [keyboardOpened, setKeyboardOpened] = useState(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		searchPostByText()
	}, [])

	const searchPostByText = async () => {
		const searchParamsFromRoute = { ...route.params.searchParams }

		const algoliaSearchText = searchText || searchParamsFromRoute.searchText

		console.log(`SEARCH TEXT: ${algoliaSearchText}`)

		setLoaderIsVisible(true)
		// await searchPostsCloud(algoliaSearchText, searchParamsFromRoute, userDataContext.userId as Id)
		await searchPosts(algoliaSearchText, searchParamsFromRoute)
			.then((posts) => {
				setResultPosts(posts as FeedPosts)
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
			case 'service': return 'serviços' as PostType
			case 'sale': return 'comércio' as PostType
			case 'vacancy': return 'vagas' as PostType
			case 'culture': return 'culturas' as PostType
			case 'socialImpact': return 'impacto social' as PostType
			default: return 'posts'
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

	const getOneToneMoreLight = () => {
		switch (locationDataContext.searchParams.postType) {
			case 'service': return theme.purple1
			case 'sale': return theme.green1
			case 'vacancy': return theme.yellow1
			case 'socialImpact': return theme.pink1
			case 'culture': return theme.blue1
			default: return 'white'
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
				postRange,
				postType: locationDataContext.searchParams.postType as PostType
			})
			case 'city': return navigation.navigate('ViewPostsByRange', {
				postsByRange: resultPosts.city,
				postRange,
				postType: locationDataContext.searchParams.postType as PostType

			})
			case 'country': return navigation.navigate('ViewPostsByRange', {
				postsByRange: resultPosts.country,
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
		return ((resultPosts && resultPosts.nearby.length > 0) || (resultPosts && resultPosts.city.length > 0) || (resultPosts && resultPosts.country.length > 0))
	}

	const currentCategoryColorLight = getOneToneMoreLight()

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={getRelativePath()}
					// SvgIcon={getCategoryIcon()}
					showResults
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
						onSubmitEditing={searchPostByText}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor: locationDataContext.currentCategory.backgroundColor }}>
					<FilterButtons>
						<SelectButton
							backgroundColor={theme.white3}
							backgroundSelected={currentCategoryColorLight}
							label={'posts'}
							boldLabel
							noDisplacement
							height={'100%'}
							width={'42%'}
							selected={postResultsIsVisible}
							SvgIcon={ChatWhiteIcon}
							svgIconScale={['60%', '25%']}
							onSelect={() => {
								setPostResultsIsVisible(true)
								setProfileResultsIsVisible(false)
							}}
						/>
						<SelectButton
							backgroundColor={theme.white3}
							backgroundSelected={currentCategoryColorLight}
							label={'perfis'}
							boldLabel
							noDisplacement
							height={'100%'}
							width={'42%'}
							selected={profileResultsIsVisible}
							SvgIcon={PaperListIcon}
							svgIconScale={['60%', '25%']}
							onSelect={() => {
								setProfileResultsIsVisible(true)
								setPostResultsIsVisible(false)
							}}
						/>
					</FilterButtons>
					{
						postResultsIsVisible && (
							<>
								{
									(resultPosts.nearby && resultPosts.nearby.length)
										? (
											<>
												<FlatListPosts
													data={getFirstFiveItems(resultPosts.nearby)}
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
									(resultPosts.city && resultPosts.city.length)
										? (
											<>
												<FlatListPosts
													data={getFirstFiveItems(resultPosts.city)}
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
									(resultPosts.country && resultPosts.country.length)
										? (
											<>
												<FlatListPosts
													data={getFirstFiveItems(resultPosts.country)}
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
											</>
										)
										: <></>
								}
								<VerticalSigh height={!keyboardOpened ? relativeScreenHeight(12) : relativeScreenHeight(3)} />
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
							</>
						)
					}
					{
						profileResultsIsVisible && (
							!resultProfiles.length && (
								<WithoutPostsMessage
									title={'poxa!'}
									message={'esse mecanismo ainda não foi implementado no corre., mas logo logo tá aí'}
								/>
							)
						)
					}
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { SearchResult }
