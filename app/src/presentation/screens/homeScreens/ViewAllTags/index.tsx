import React, { useContext, useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import uuid from 'react-uuid'

import { LocationContext } from '@contexts/LocationContext'

import { ViewAllTagsScreenProps } from '@routes/Stack/HomeStack/stackScreenProps'
import { PostCollection } from '@services/firebase/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Body, Container, Header, InputContainer } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { CategoryCard } from '@components/_cards/CategoryCard'
import { SelectButtonsContainer } from '@components/_containers/SelectButtonsContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

const { sortArray } = UiUtils()

function ViewAllTags({ navigation }: ViewAllTagsScreenProps) {
	const { locationDataContext } = useContext(LocationContext)

	const [searchText, setSearchText] = useState('')

	const feedPosts = [...locationDataContext.feedPosts.nearby, ...locationDataContext.feedPosts.city, ...locationDataContext.feedPosts.country] || []
	const { inactiveColor, categoryName, categoryTags } = locationDataContext.currentCategory

	const getFeedPostsTags = () => {
		const userPostTags = feedPosts.reduce((acc: any[], current: PostCollection) => {
			if (!current.tags || current.category !== categoryName) return [...acc]
			const filtredCurrentTags = current.tags.filter((tag) => !acc.includes(tag))
			return [...acc, ...filtredCurrentTags as string[]]
		}, [])

		return userPostTags
	}

	const renderFiltredCategories = () => {
		let allTags = [...categoryTags, ...getFeedPostsTags()]

		if (searchText) {
			allTags = allTags
				.filter((tag, index, array) => array.indexOf(tag) === index)
				.filter((tag) => !!tag.match(new RegExp(`${searchText}`, 'i'))?.length)
		}

		allTags = allTags
			.filter((tag, index, array) => array.indexOf(tag) === index)
			.sort(sortArray)

		return allTags.map((tagName: string) => {
			if (tagName === 'outros') return null
			return (
				<CategoryCard
					hasElements={!!((feedPosts.map((post) => post.tags.filter((tag) => post.category === categoryName && tag === tagName && post.postType === locationDataContext.searchParams.postType))).filter((element) => element.map((e) => e.length > 0).length).length)}
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

	const navigateToResultScreen = () => {
		const customSearchParams = {
			...locationDataContext.searchParams,
			searchText,
			category: locationDataContext.currentCategory.categoryName,
		}
		navigation.navigate('SearchResult', { searchParams: customSearchParams, categoryLabel: locationDataContext.currentCategory.categoryTitle, })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					textPath={`${locationDataContext.currentCategory.categoryTitle}`}
					text={'tags'}
					highlightedWords={['']}
					path
					onBackPress={() => navigation.goBack()}
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
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<Body style={{ backgroundColor: locationDataContext.currentCategory.backgroundColor }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<VerticalSpacing />
						<SelectButtonsContainer backgroundColor={'transparent'} noPadding>
							{renderFiltredCategories()}
						</SelectButtonsContainer>
						<VerticalSpacing height={relativeScreenHeight(10)} />
					</ScrollView>
				</Body>
			</KeyboardAvoidingView>
		</Container>
	)
}

export { ViewAllTags }
