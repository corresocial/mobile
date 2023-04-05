import React, { useContext, useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import uuid from 'react-uuid'

import { RFValue } from 'react-native-responsive-fontsize'
import { Body, Container, Header, InputContainer, LastSigh, SearchInput } from './styles'
import { theme } from '../../../common/theme'
import LoupIcon from '../../../assets/icons/loup.svg'

import { ViewAllTagsScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { CategoryCard } from '../../../components/_cards/CategoryCard'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { sortArray } from '../../../common/auxiliaryFunctions'
import { LocationContext } from '../../../contexts/LocationContext'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'

function ViewAllTags({ navigation }: ViewAllTagsScreenProps) {
	const { locationDataContext } = useContext(LocationContext)

	const { nearbyPosts } = locationDataContext

	const [searchText, setSearchText] = useState('')

	const renderFiltredCategories = () => {
		const { inactiveColor } = locationDataContext.currentCategory
		let { categoryTags } = locationDataContext.currentCategory

		if (searchText) {
			categoryTags = categoryTags.filter((tag) => !!tag.match(new RegExp(`${searchText}`, 'i'))?.length)
		}

		categoryTags = categoryTags.sort(sortArray)

		return categoryTags.map((tagName: string) => {
			if (tagName === 'outros') return null
			return (
				<CategoryCard
					hasElements={!!((nearbyPosts.map((post) => post.tags.filter((tag) => tag === tagName))).filter((element) => element.map((e) => e.length > 0).length).length)}
					inactiveColor={inactiveColor}
					key={uuid()}
					title={tagName}
					onPress={() => viewPostsByTag(tagName)}
				/>
			)
		})
	}

	const viewPostsByTag = (tagName: string) => {
		navigation.navigate('ViewPostsByTag', { currentTagSelected: tagName })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={`categorias ${locationDataContext.currentCategory.categoryTitle}`}
					highlightedWords={locationDataContext.currentCategory.categoryTitle.split(' ')}
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
				<Body style={{ backgroundColor: locationDataContext.currentCategory.backgroundColor }}>
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
