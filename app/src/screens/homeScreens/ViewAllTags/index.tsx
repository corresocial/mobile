import React, { useState } from 'react'
import { StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { ViewAllTagsScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { sortArray } from '../../../common/auxiliaryFunctions'

function ViewAllTags({ route, navigation }: ViewAllTagsScreenProps) {
	const [searchText, setSearchText] = useState('')

	const renderFiltredCategories = () => {
		let { categoryTags } = route.params

		if (searchText) {
			categoryTags = categoryTags.filter((tag) => !!tag.match(new RegExp(`${searchText}`, 'i'))?.length)
		}

		categoryTags = categoryTags.sort(sortArray)

		return categoryTags.map((tagName: string) => { // TODO Type
			if (tagName === 'outros') return null
			return (
				<CategoryCard
					title={tagName}
					onPress={() => viewPostsByTag(tagName)}
				/>
			)
		})
	}

	const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', {
			backgroundColor: route.params.backgroundColor,
			cagegoryIcon: route.params.cagegoryIcon,
			categoryType: route.params.categoryType,
			categoryCollection: route.params.categoryCollection,
			tagName
		})
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={`categorias ${route.params.title}`}
					highlightedWords={route.params.title.split(' ')}
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
				<Body style={{ backgroundColor: route.params.backgroundColor }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<SelectButtonsContainer backgroundColor={'transparent'} noPadding>
							{renderFiltredCategories()}
						</SelectButtonsContainer>
						<LastSigh />
					</ScrollView>
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewAllTags }
