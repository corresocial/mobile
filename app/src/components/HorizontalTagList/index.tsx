import React from 'react'
import uuid from 'react-uuid'

import {
	Container,
	ScrollView,
} from './styles'
import { theme } from '../../common/theme'
import { relativeScreenHeight } from '../../common/screenDimensions'

import { FilterButton } from '../_buttons/FilterButton'

interface HorizontalTagListProps {
	tags: string[]
	selectedTags?: string[]
	onSelectTag: (tag: string) => void
}

function HorizontalTagList({
	tags,
	selectedTags = [],
	onSelectTag,
}: HorizontalTagListProps) {
	const renderTags = () => tags.map((tag) => {
		const customTag = tag.length !== 3 ? tag : ` ${tag} `

		return (
			< FilterButton
				key={uuid()}
				height={relativeScreenHeight(4)}
				backgroundColor={theme.white3}
				backgroundSelected={theme.orange1}
				marginRight={10}
				label={customTag}
				fontSize={13}
				selected={selectedTags.includes(tag)}
				onSelect={() => onSelectTag(tag)}
			/>
		)
	})

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					{renderTags()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalTagList }
