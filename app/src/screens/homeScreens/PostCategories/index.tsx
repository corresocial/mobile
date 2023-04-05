import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import uuid from 'react-uuid'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'
import { saleCategories } from '../../../utils/postsCategories/saleCategories'
import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'
import { cultureCategories } from '../../../utils/postsCategories/cultureCategories'
import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'
import { sortPostCategories } from '../../../common/auxiliaryFunctions'

import { PostCategoriesScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'
import { MacroCategory, PostType } from '../../../services/firebase/types'

import { LocationContext } from '../../../contexts/LocationContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { getCatalogIcons } from '../../../services/notion/getCatalogIcons'

type CategoryEntries = [string & { label: string, value: string, slug: string, tags: string[] }]

function PostCategories({ route, navigation }: PostCategoriesScreenProps) {
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [catalogIcons, setCatalogIcons] = useState([])
	const [searchText, setSearchText] = useState('')

	const { nearbyPosts } = locationDataContext

	useEffect(() => {
		setPostTypeOnSearchParams()
		loadCatalogIcons()
	}, [])

	const loadCatalogIcons = async () => {
		return getCatalogIcons()
			.then((icons) => {
				setCatalogIcons(icons)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const setPostTypeOnSearchParams = () => {
		setLocationDataOnContext({ searchParams: { ...locationDataContext.searchParams, postType: route.params.postType } })
	}

	const getRelativeColor = () => {
		switch (route.params.postType) {
			case 'service': return theme.purple2
			case 'sale': return theme.green2
			case 'vacancy': return theme.yellow2
			case 'culture': return theme.blue2
			case 'socialImpact': return theme.pink2
			default: return theme.orange2
		}
	}

	const getInactiveCardColor = () => {
		switch (route.params.postType) {
			case 'service': return theme.purple1
			case 'sale': return theme.green1
			case 'vacancy': return theme.yellow1
			case 'culture': return theme.blue1
			case 'socialImpact': return theme.pink1
			default: return theme.orange1
		}
	}

	const getRelativeCategory = () => {
		switch (route.params.postType) {
			case 'service': return serviceCategories
			case 'sale': return saleCategories
			case 'vacancy': return vacancyCategories
			case 'culture': return cultureCategories
			case 'socialImpact': return socialImpactCategories
			default: return null
		}
	}

	const getRelativeIconUrl = (categorySlug: string) => {
		if (!catalogIcons.length) return ''
		const icon = catalogIcons.reduce((total: any, current: any) => { // TODO Type
			if (current.iconSlug === categorySlug) {
				return current
			}
			return total
		}, {})

		return icon.iconUri || ''
	}

	const getRelativeTitle = () => {
		switch (route.params.postType) {
			case 'service': return 'serviços' as PostType
			case 'sale': return 'comércio' as PostType
			case 'vacancy': return 'vagas' as PostType
			case 'culture': return 'culturas' as PostType
			case 'socialImpact': return 'impacto social' as PostType
			default: return 'posts'
		}
	}

	const renderCategories = () => {
		const currentCategory = getRelativeCategory()
		if (!currentCategory) {
			return (
				<CategoryCard
					hasElements={false}
					title={'sem catagorias'}
					svgUri={''}
					onPress={() => { }}
				/>
			)
		}

		const filtredCategories = !searchText
			? currentCategory
			: filterCategories(currentCategory)

		const ordenedCategories = Object.values(filtredCategories).sort(sortPostCategories as (a: unknown, b: unknown) => (number))

		return Object.entries(ordenedCategories as CategoryEntries).map((category) => {
			if (category[1].label === 'outros') return null

			return (
				<CategoryCard
					hasElements={!!(nearbyPosts.filter((post) => post.category === category[1].value)).length}
					inactiveColor={getInactiveCardColor()}
					key={uuid()}
					title={category[1].label}
					svgUri={getRelativeIconUrl(category[1].slug)}
					onPress={() => navigateToCategoryDetails(category[1])}
				/>
			)
		})
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
			backgroundColor: getRelativeColor(),
			inactiveColor: getInactiveCardColor(),
			categoryName: categorySelected.value,
			categoryTitle: categorySelected.label,
			categoryIcon: getRelativeIconUrl(categorySelected.slug),
			categoryTags: categorySelected.tags
		}

		setLocationDataOnContext({ currentCategory })
		navigation.navigate('PostCategoryDetails')
	}

	const navigateToResultScreen = () => {
		const currentCategory = {
			backgroundColor: getRelativeColor(),
			inactiveColor: getInactiveCardColor(),
			categoryName: '',
			categoryTitle: '',
			categoryIcon: '',
			categoryTags: ['']
		}

		setLocationDataOnContext({ currentCategory })
		const customSearchParams = { ...locationDataContext.searchParams, searchText }
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
				<Body style={{ backgroundColor: getRelativeColor() }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<SelectButtonsContainer backgroundColor={'transparent'} noPadding>
							{renderCategories()}
						</SelectButtonsContainer>
						<LastSigh />
					</ScrollView>
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { PostCategories }
