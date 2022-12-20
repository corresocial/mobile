import React, { useState } from 'react'
import { StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { serviceCategories } from '../../serviceScreens/serviceCategories'
import { saleCategories } from '../../saleScreens/saleCategories'
import { vacancyCategories } from '../../vacancyScreens/vacancyCategories'
import { cultureCategories } from '../../cultureScreens/cultureCategories'
import { socialImpactCategories } from '../../socialImpactScreens/socialImpactCategories'

import { PostCategoriesScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'

function PostCategories({ route, navigation }: PostCategoriesScreenProps) {
	const [searchText, setSearchText] = useState('')

	const getRelativeColor = () => {
		switch (route.params.title) {
			case 'serviços': return theme.purple2
			case 'vendas': return theme.green2
			case 'vagas': return theme.yellow2
			case 'culturas': return theme.blue2
			case 'impacto social': return theme.pink2
			default: return theme.orange2
		}
	}

	const getRelativeCategory = () => {
		switch (route.params.title) {
			case 'serviços': return serviceCategories
			case 'vendas': return saleCategories
			case 'vagas': return vacancyCategories
			case 'culturas': return cultureCategories
			case 'impacto social': return socialImpactCategories
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
					onPress={() => { }}
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
