import React, { useState } from 'react'
import uuid from 'react-uuid'

import { PostCollection } from '@services/firebase/types'

import { postMacroCategories } from '@utils/postMacroCategories'

import { Container, ScrollView } from './styles'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { FilterButton } from '@components/_buttons/FilterButton'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface PostFilterProps {
	posts: PostCollection[],
	setHasPostFilter: React.Dispatch<React.SetStateAction<boolean>>,
	setFilteredPosts: React.Dispatch<React.SetStateAction<PostCollection[]>>
}

function PostFilter({ posts, setHasPostFilter, setFilteredPosts }: PostFilterProps) {
	const [selectedPostType, setSelectedPostType] = useState('')
	const [selectedMacroCategories, setSelectedMacroCategories] = useState<string[]>([])

	const getPostTypes = () => {
		return posts.reduce((acc: any[], current: PostCollection) => { // TODO Type
			if (acc.includes(current.postType)) { return [...acc] }
			return [...acc, current.postType]
		}, [])
	}

	const getPostMacroCategories = (postType: string) => {
		return posts.reduce((acc: any[], current: PostCollection) => { // TODO Type
			if (acc.includes(current.macroCategory)) { return [...acc] }
			if (postType === current.postType) { return [...acc, current.macroCategory] }
			return [...acc]
		}, [])
	}

	const toggleSelectedPostType = (postType: string) => {
		setSelectedPostType(selectedPostType ? '' : postType)
		setSelectedMacroCategories([])
	}

	const toggleSelectedMacroCategories = (categoryName: string) => {
		if (selectedMacroCategories.includes(categoryName)) {
			const newSelectedMacroCategories = selectedMacroCategories.filter(
				(category) => category !== categoryName
			)

			setSelectedMacroCategories(newSelectedMacroCategories)
			filtredPostsByMacroCategory(newSelectedMacroCategories)
			return
		}

		setSelectedMacroCategories([...selectedMacroCategories, categoryName])
		filtredPostsByMacroCategory([...selectedMacroCategories, categoryName])
	}

	const filtredPostsByMacroCategory = (currentSelectedMacroCategory: any) => {
		const filteredPosts = posts.filter((post: PostCollection) => {
			const matchs = currentSelectedMacroCategory.map((macroCategory: string) => {
				if (currentSelectedMacroCategory.includes(post.macroCategory as string)) return true
				return false
			}, [])
			return !!matchs.includes(true)
		})
		
		setHasPostFilter(true)
		setFilteredPosts(filteredPosts)
	}

	const renderPostTypes = () => {
		let filterPosts = getPostTypes()

		if (selectedPostType) {
			filterPosts = [selectedPostType]
		}

		return filterPosts.map((postType: string) => (
			<FilterButton
				key={uuid()}
				height={relativeScreenHeight(3.5)}
				backgroundColor={theme.white3}
				backgroundSelected={theme.orange2}
				marginRight={10}
				label={getRelativeMacroTagLabel(postType)}
				fontSize={13}
				selected={selectedPostType === postType}
				onSelect={() => toggleSelectedPostType(postType)}
			/>
		))
	}

	const getRelativeMacroTagLabel = (macroTag: string): string => {
		switch (macroTag) {
			case 'income': return 'renda'
			case 'culture': return 'cultura'
			case 'socialImpact': return 'cidadania'
			default: return ''
		}
	}

	const renderMacroCategories = () => {
		if (!selectedPostType) return <></>

		const macroCategories = getPostMacroCategories(selectedPostType)

		return Object.values(macroCategories).map((macroCategory) => (
			<FilterButton
				key={uuid()}
				height={relativeScreenHeight(2.5)}
				backgroundColor={theme.white3}
				backgroundSelected={theme.orange1}
				marginRight={10}
				label={postMacroCategories[selectedPostType][macroCategory].label} // TODO Type
				fontSize={13}
				selected={selectedMacroCategories.includes(macroCategory)}
				onSelect={() => toggleSelectedMacroCategories(macroCategory)}
			/>
		))
	}

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					<HorizontalSpacing width={relativeScreenWidth(5)} />
					{renderPostTypes()}
					{renderMacroCategories()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { PostFilter }