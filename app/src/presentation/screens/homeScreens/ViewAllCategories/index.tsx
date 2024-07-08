import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { SvgProps } from 'react-native-svg'
import uuid from 'react-uuid'

import { MacroCategory, PostType, PostEntityOptional, PostEntity } from '@domain/post/entity/types'

import { LocationContext } from '@contexts/LocationContext'

import { ViewAllCategoriesScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { MacroCategories, MacroCategoriesType } from '@utils/postMacroCategories/types'

import { UiPostUtils } from '@utils-ui/post/UiPostUtils'
import { postMacroCategories } from '@utils/postMacroCategories'
import { cultureCategories } from '@utils/postsCategories/cultureCategories'
import { saleCategories } from '@utils/postsCategories/saleCategories'
import { serviceCategories } from '@utils/postsCategories/serviceCategories'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'
import { vacancyCategories } from '@utils/postsCategories/vacancyCategories'

import { Body, Container, Header, InputContainer } from './styles'
import { theme } from '@common/theme'

import { CategoryCard } from '@components/_cards/CategoryCard'
import { SelectButtonsContainer } from '@components/_containers/SelectButtonsContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

type CategoryEntries = [string & { label: string, value: string, SvgIcon: React.FC<SvgProps>, tags: string[] }]

const { sortPostCategories } = UiPostUtils()

function ViewAllCategories({ navigation }: ViewAllCategoriesScreenProps) {
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [filteredPosts, setFilteredPosts] = useState<PostEntity[]>()
	const [searchText, setSearchText] = useState('')

	const { inactiveColor } = locationDataContext.currentCategory
	const { postType, macroCategory } = locationDataContext.searchParams

	useEffect(() => {
		const posts = filterPostsByTypeAndMacroCategory()
		setFilteredPosts(posts)
	}, [])

	const filterPostsByTypeAndMacroCategory = () => {
		const feedPosts = [...locationDataContext.feedPosts.nearby, ...locationDataContext.feedPosts.city, ...locationDataContext.feedPosts.country] || []

		return feedPosts.filter((post) => {
			if (
				post.macroCategory === macroCategory
				&& post.postType === postType
			) {
				return true
			}
			return false
		})
	}

	const getRelativeCategory = () => {
		switch (postType) {
			case 'income': {
				switch (macroCategory) {
					case 'service': return serviceCategories
					case 'sale': return saleCategories
					case 'vacancy': return vacancyCategories
					default: return null
				}
			}
			case 'culture': return cultureCategories
			case 'socialImpact': return socialImpactCategories
			default: return null
		}
	}

	const getHeaderTextPath = () => {
		const customPostType = postType as PostType
		const currentPostType: any = postMacroCategories[customPostType] as MacroCategories
		const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
		return currentMacroCategory.label
	}

	const renderFilteredCategories = () => {
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
				<CategoryCard
					hasElements={hasPostsOnCategory(category[1].value)}
					inactiveColor={inactiveColor}
					key={uuid()}
					title={category[1].label}
					SvgIcon={category[1].SvgIcon}
					onPress={() => navigateToCategoryDetails(category[1])}
				/>
			)
		})
	}

	const hasPostsOnCategory = (category: string) => {
		const postsOnCategory = ((filteredPosts || [] as any).filter((post: PostEntityOptional) => post.category === category))
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

		navigation.navigate('SearchResult', { searchParams: customSearchParams })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					textPath={getHeaderTextPath()}
					text={'categorias'}
					highlightedWords={['']}
					path
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
						onSubmitEditing={() => { }}
					/>
				</InputContainer>
			</Header>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor: locationDataContext.currentCategory.backgroundColor }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<VerticalSpacing />
						<SelectButtonsContainer backgroundColor={'transparent'} noPadding>
							{renderFilteredCategories()}
						</SelectButtonsContainer>
						<VerticalSpacing height={10} />
					</ScrollView>
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewAllCategories }
