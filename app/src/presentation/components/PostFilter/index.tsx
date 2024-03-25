import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'

import { PostType } from '@domain/entities/posts/types'

import { PostCollection } from '@services/firebase/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

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
	const [selectedPostType, setSelectedPostType] = useState<PostType | ''>()
	const [selectedMacroCategories, setSelectedMacroCategories] = useState<MacroCategoriesType[]>([])

	useEffect(() => {
		performFilterPostsByPostTypeAndMacroCategory()
		updateHasPostFilterState()
	}, [selectedPostType, selectedMacroCategories])

	const performFilterPostsByPostTypeAndMacroCategory = () => {
		const filteredPosts = posts.filter((post: PostCollection) => {
			if (
				selectedPostType
				&& !selectedMacroCategories.length
				&& post.postType === selectedPostType
			) return true

			const matchs = selectedMacroCategories.map(() => {
				return selectedMacroCategories.includes(post.macroCategory as MacroCategoriesType)
			}, [])

			return !!matchs.includes(true)
		})

		setFilteredPosts(filteredPosts)
	}

	const updateHasPostFilterState = () => {
		if (selectedPostType || selectedMacroCategories.length) return setHasPostFilter(true)
		setHasPostFilter(false)
	}

	const sortWithCustomOrder = (a: string, b: string) => {
		const customSort = ['income', 'socialImpact', 'culture']
		return customSort.indexOf(a) - customSort.indexOf(b)
	}

	const getPostTypes = () => {
		const postTypes = posts.reduce((acc: any[], current: PostCollection) => {
			if (acc.includes(current.postType)) { return [...acc] }
			return [...acc, current.postType]
		}, [])

		return postTypes.sort(sortWithCustomOrder)
	}

	const getPostMacroCategories = (postType: PostType): MacroCategoriesType[] => {
		return posts.reduce((acc: any[], current: PostCollection) => {
			if (acc.includes(current.macroCategory)) { return [...acc] }
			if (postType === current.postType) { return [...acc, current.macroCategory] }
			return [...acc]
		}, [])
	}

	const toggleSelectedPostType = (postType: PostType) => {
		setSelectedPostType(selectedPostType ? '' : postType)
		setSelectedMacroCategories([])
	}

	const toggleSelectedMacroCategories = (macroCategoryName: MacroCategoriesType) => {
		if (selectedMacroCategories.includes(macroCategoryName)) {
			const newSelectedMacroCategories = selectedMacroCategories.filter(
				(category) => category !== macroCategoryName
			)
			return setSelectedMacroCategories(newSelectedMacroCategories)
		}

		setSelectedMacroCategories([...selectedMacroCategories, macroCategoryName])
	}

	const renderPostTypes = () => {
		let postTypes = getPostTypes()

		if (selectedPostType) {
			postTypes = [selectedPostType]
		}

		return postTypes.map((postType: PostType) => (
			<FilterButton
				key={uuid()}
				height={relativeScreenHeight(4)}
				backgroundColor={theme.white3}
				backgroundSelected={theme.orange1}
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

		return Object.values(macroCategories).map((macroCategory) => {
			const macroCategoryObject = (postMacroCategories[selectedPostType] as Record<string, any>)[macroCategory] // TODO Type
			if (!macroCategoryObject) return <></>

			return (
				<FilterButton
					key={uuid()}
					height={relativeScreenHeight(3.5)}
					backgroundColor={theme.white3}
					backgroundSelected={theme.orange1}
					label={macroCategoryObject.label}
					fontSize={11}
					selected={selectedMacroCategories.includes(macroCategory)}
					onSelect={() => toggleSelectedMacroCategories(macroCategory)}
				/>
			)
		})
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
