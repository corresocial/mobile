import React, { useState } from 'react'
import { StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'
import AnimalsIcon from '../../../assets/icons/categories/animals.svg'

import { serviceCategories } from '../../serviceScreens/serviceCategories'
import { saleCategories } from '../../saleScreens/saleCategories'
import { vacancyCategories } from '../../vacancyScreens/vacancyCategories'
import { cultureCategories } from '../../cultureScreens/cultureCategories'
import { socialImpactCategories } from '../../socialImpactScreens/socialImpactCategories'

import { PostCategoriesScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { PostCollectionType, PostType, ServiceCategory } from '../../../services/firebase/types'

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

		const filtredCategory = !searchText
			? currentCategory
			: Object.entries(currentCategory).filter((category) => !!category[1].label.match(new RegExp(`${searchText}`, 'i'))?.length)

		return (!searchText ? Object.entries(currentCategory) : filtredCategory as any).map((category: any) => { // TODO Type
			if (category[1].label === 'outros') return null
			return (
				<CategoryCard
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
