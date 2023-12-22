import React from 'react'
import uuid from 'react-uuid'

import { Container, ScrollView } from './styles'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { FilterButton } from '@components/_buttons/FilterButton'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface HorizontalTagListProps {
	tags: string[]
	selectedColor?: string
	selectedTags?: string[]
	filterSelectedTags?: (tag: string) => string
	onSelectTag: (tag: string) => void
}

function HorizontalTagList({
	tags,
	selectedColor,
	selectedTags = [],
	filterSelectedTags,
	onSelectTag,
}: HorizontalTagListProps) {
	const renderTags = () => {
		const ordenedSelectedTags = tags.filter((tag) => selectedTags.includes(tag))
		const ordenedUnselectedTags = tags.filter((tag) => !selectedTags.includes(tag))

		let ordenedTags = [...ordenedSelectedTags, ...ordenedUnselectedTags]

		if (filterSelectedTags) {
			ordenedTags = ordenedTags.map((tag) => filterSelectedTags(tag))
		}

		return ordenedTags.map((tag) => {
			const customTag = tag.length !== 3 ? tag : ` ${tag} `

			return (
				< FilterButton
					key={uuid()}
					height={relativeScreenHeight(3.5)}
					backgroundColor={theme.white3}
					backgroundSelected={selectedColor || theme.orange1}
					marginRight={10}
					label={customTag}
					fontSize={13}
					selected={selectedTags.includes(tag)}
					onSelect={() => onSelectTag && onSelectTag(tag)}
				/>
			)
		})
	}

	return (
		<Container >
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				<Container>
					<HorizontalSpacing width={relativeScreenWidth(5)} />
					{renderTags()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalTagList }
