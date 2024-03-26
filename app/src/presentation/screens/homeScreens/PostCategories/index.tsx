import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { SvgProps } from 'react-native-svg'
import uuid from 'react-uuid'

import { FeedPosts, MacroCategory, PostType, PostCollection, PostCollectionRemote, PostRange } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToPostView } from '@routes/auxMethods'
import { PostCategoriesScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { postMacroCategories } from '@utils/postMacroCategories'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'
import { saleCategories } from '@utils/postsCategories/saleCategories'
import { serviceCategories } from '@utils/postsCategories/serviceCategories'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'
import { vacancyCategories } from '@utils/postsCategories/vacancyCategories'

import { CategoryCardContainer, Container, Header, InputContainer } from './styles'
import OthersWhiteIcon from '@assets/icons/categories/others.svg'
import { theme } from '@common/theme'

import { CategoryCard } from '@components/_cards/CategoryCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { SearchInput } from '@components/_inputs/SearchInput'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

type CategoryEntries = [string & { label: string, value: string, SvgIcon: React.FC<SvgProps>, tags: string[] }]

const { sortPostCategories } = UiPostUtils()

function PostCategories({ navigation }: PostCategoriesScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')
	const [filteredPosts, setFilteredPosts] = useState<PostCollectionRemote[]>()

	const [feedPostsByTypeAndMacroCategory, setFeedPostsByTypeAndMacroCategory] = useState<FeedPosts>({ nearby: [], city: [], country: [] })
	const [filteredFeedPosts, setFilteredFeedPosts] = useState<FeedPosts>({ nearby: [], city: [], country: [] })

	const { postType, macroCategory } = locationDataContext.searchParams
	const { inactiveColor, backgroundColor } = locationDataContext.currentCategory

	useEffect(() => {
		const posts = filterPostsByPostType()
		setFeedPostsByTypeAndMacroCategory(posts)
	}, [])

	useEffect(() => {
		const posts = filterPostsByTypeAndMacroCategory()
		setFilteredPosts(posts)
	}, [feedPostsByTypeAndMacroCategory])

	useEffect(() => {
		if (searchText) {
			const posts = filterPostsByText()
			setFilteredFeedPosts(posts)
		}
	}, [searchText])

	const filterPostsByPostType = () => {
		return {
			nearby: locationDataContext.feedPosts?.nearby.filter((post: PostCollectionRemote) => postBelongContextPostType(post)) || [],
			city: locationDataContext.feedPosts?.city.filter((post: PostCollectionRemote) => postBelongContextPostType(post)) || [],
			country: locationDataContext.feedPosts?.country.filter((post: PostCollectionRemote) => postBelongContextPostType(post)) || []
		}
	}

	const postBelongContextPostType = (post: PostCollection) => {
		if (!post) return false
		return (post.postType === locationDataContext.searchParams?.postType
			&& post.macroCategory === macroCategory)
	}

	const filterPostsByTypeAndMacroCategory = () => {
		const feedPosts = [
			...feedPostsByTypeAndMacroCategory.nearby,
			...feedPostsByTypeAndMacroCategory.city,
			...feedPostsByTypeAndMacroCategory.country
		] || []

		return feedPosts.filter((post: PostCollection) => {
			if (
				post.macroCategory === macroCategory
				&& post.postType === postType
			) {
				return true
			}
			return false
		})
	}

	const filterPostsByText = () => {
		return {
			nearby: feedPostsByTypeAndMacroCategory.nearby.filter((post: PostCollectionRemote) => hasPostDescriptionMatch(post)) || [],
			city: feedPostsByTypeAndMacroCategory.city.filter((post: PostCollectionRemote) => hasPostDescriptionMatch(post)) || [],
			country: feedPostsByTypeAndMacroCategory.country.filter((post: PostCollectionRemote) => hasPostDescriptionMatch(post)) || []
		}
	}

	const hasPostDescriptionMatch = (post: PostCollectionRemote) => {
		if (!post) return false
		return !!post.description.match(new RegExp(`${searchText}`, 'i'))?.length
	}

	const getRelativeCategory = () => {
		switch (postType) {
			case 'income': {
				if (macroCategory === 'service') return serviceCategories
				if (macroCategory === 'sale') return saleCategories
				if (macroCategory === 'vacancy') return vacancyCategories
				return null
			}
			case 'culture': return cultureCategories
			case 'socialImpact': return socialImpactCategories
			default: return null
		}
	}

	const getRelativeTitle = () => {
		const customPostType = postType as PostType
		const currentPostType: any = postMacroCategories[customPostType]
		const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
		return currentMacroCategory.label
	}

	const getRelativeHeaderIcon = () => {
		const customPostType = postType as PostType
		const currentPostType: any = postMacroCategories[customPostType]
		const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
		return currentMacroCategory.SvgIcon
	}

	const hasAnyFilteredCategory = () => {
		const currentCategory = getRelativeCategory()
		const filteredCategories = filterCategories(currentCategory)
		return Object.keys(filteredCategories).length
	}

	const renderCategories = () => {
		const currentCategory = getRelativeCategory()
		if (!currentCategory) {
			return (
				<CategoryCard
					hasElements={false}
					title={'sem catagorias'}
					onPress={() => { }}
				/>
			)
		}

		const filtredCategories = !searchText
			? currentCategory
			: filterCategories(currentCategory)

		const ordenedCategories = Object.values(filtredCategories).sort(sortPostCategories as (a: unknown, b: unknown) => (number))

		return Object.entries(ordenedCategories as CategoryEntries).map((category) => {
			return (
				<Fragment key={uuid()}>
					<CategoryCard
						hasElements={hasPostsOnCategory(category[1].value)}
						inactiveColor={inactiveColor}
						title={category[1].label}
						SvgIcon={category[1].SvgIcon}
						onPress={() => navigateToCategoryDetails(category[1])}
					/>
					<HorizontalSpacing />
				</Fragment >
			)
		})
	}

	const hasPostsOnCategory = (category: string) => {
		const postsOnCategory = ((filteredPosts || [] as any).filter((post: PostCollection) => post.category === category))
		return postsOnCategory ? !!postsOnCategory.length : false
	}

	const filterCategories = (category: any) => {
		const categoryList = Object.entries(category).reduce((acc: {}, categoryItem: any) => { // TODO Type
			if ((categoryItem[1].label as string).match(new RegExp(`${searchText}`, 'i'))?.length) {
				return {
					...acc,
					[categoryItem[0]]: categoryItem[1]
				}
			}
			return acc
		}, {})

		return categoryList
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const postsByRange = getPostsByRange(postRange)
		const postTypeFromRoute = locationDataContext.searchParams?.postType

		navigation.navigate('ViewPostsByRange', { postsByRange, postRange, postType: postTypeFromRoute })
	}

	const getPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return feedPostsByTypeAndMacroCategory.nearby || []
			case 'city': return feedPostsByTypeAndMacroCategory.city || []
			case 'country': return feedPostsByTypeAndMacroCategory.country || []
		}
	}

	const viewPostDetails = (postData: PostCollection) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const navigateToCategoryDetails = (categorySelected: MacroCategory) => {
		const currentCategory = {
			categoryName: categorySelected.value,
			categoryTitle: categorySelected.label,
			categorySvgIcon: categorySelected.SvgIcon,
			categoryTags: categorySelected.tags
		}

		setLocationDataOnContext({ currentCategory: { ...locationDataContext.currentCategory, ...currentCategory } })
		navigation.navigate('PostCategoryDetails')
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
		setSearchText('')

		navigation.navigate('SearchResult', { searchParams: customSearchParams })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
					navigateToProfile={navigateToProfile}
					goToPostView={viewPostDetails}
				>
					{
						(hasAnyFilteredCategory())
							? (
								<>
									<SubtitleCard
										text={'categorias'}
										highlightedText={['categorias']}
										seeMoreText
										SvgIcon={OthersWhiteIcon}
										onPress={() => navigation.navigate('ViewAllCategories')}
									/>
									<ScrollView showsVerticalScrollIndicator={false} horizontal >
										<CategoryCardContainer >
											{renderCategories()}
										</CategoryCardContainer>
									</ScrollView>
								</>
							)
							: <></>
					}
				</FeedByRange>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { PostCategories }
