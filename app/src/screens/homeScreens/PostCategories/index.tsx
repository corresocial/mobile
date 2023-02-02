import React, { useState } from 'react'
import { StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native'
import uuid from 'react-uuid'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'
import AnimalsIcon from '../../../assets/icons/categories/animals.svg'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'
import { saleCategories } from '../../../utils/postsCategories/saleCategories'
import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'
import { cultureCategories } from '../../../utils/postsCategories/cultureCategories'
import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'

import { PostCategoriesScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { PostCollectionType, PostType } from '../../../services/firebase/types'
import { sortPostCategories } from '../../../common/auxiliaryFunctions'

type CategoryEntries = [string & { label: string, value: string, tags: string[] }]

function PostCategories({ route, navigation }: PostCategoriesScreenProps) {
	const [searchText, setSearchText] = useState('')

	const getRelativeColor = () => {
		switch (route.params.title) {
			case 'serviços': return theme.purple2
			case 'comércio': return theme.green2
			case 'vagas': return theme.yellow2
			case 'culturas': return theme.blue2
			case 'impacto social': return theme.pink2
			default: return theme.orange2
		}
	}

	const getRelativeCategory = () => {
		switch (route.params.title) {
			case 'serviços': return serviceCategories
			case 'comércio': return saleCategories
			case 'vagas': return vacancyCategories
			case 'culturas': return cultureCategories
			case 'impacto social': return socialImpactCategories
			default: return null
		}
	}

	const getCategoryType = () => {
		switch (route.params.title) {
			case 'serviços': return 'service' as PostType
			case 'comércio': return 'sale' as PostType
			case 'vagas': return 'vacancy' as PostType
			case 'culturas': return 'culture' as PostType
			case 'impacto social': return 'socialImpact' as PostType
			default: return null
		}
	}

	const getCategoryCollection = () => {
		switch (route.params.title) {
			case 'serviços': return 'services' as PostCollectionType
			case 'comércio': return 'sales' as PostCollectionType
			case 'vagas': return 'vacancies' as PostCollectionType
			case 'culturas': return 'cultures' as PostCollectionType
			case 'impacto social': return 'socialImpacts' as PostCollectionType
			default: return null
		}
	}

	const renderCategories = () => {
		const currentCategory = getRelativeCategory()
		if (!currentCategory) {
			return (
				<CategoryCard
					title={'sem catagorias'}
					SvgIcon={LoupIcon}
					onPress={() => { }}
				/>
			)
		}

		const filtredCategories = !searchText
			? currentCategory
			: filterCategories(currentCategory)

		const ordenedCategories = Object.values(filtredCategories).sort(sortPostCategories as (a: unknown, b: unknown) => number)

		return Object.entries(ordenedCategories as CategoryEntries).map((category) => {
			if (category[1].label === 'outros') return null
			return (
				<CategoryCard
					key={uuid()}
					title={category[1].label}
					SvgIcon={LoupIcon}
					onPress={() => navigation.navigate(
						'PostCategoryDetails',
						{
							backgroundColor: getRelativeColor(),
							title: category[1].label,
							categoryName: category[1].value,
							cagegoryIcon: AnimalsIcon,
							categoryType: getCategoryType() as any,
							categoryCollection: getCategoryCollection() as any,
							categoryTags: category[1].tags,
						}
					)}
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

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={route.params.title}
				/>
				<InputContainer>
					<LoupIcon width={RFValue(25)} height={RFValue(25)} />
					<SearchInput
						value={searchText}
						placeholder={'pesquisar'}
						returnKeyType={'search'}
						onChangeText={(text: string) => setSearchText(text)}
						onSubmitEditing={() => { }}
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
