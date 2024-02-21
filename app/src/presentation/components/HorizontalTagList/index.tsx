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
}

function HorizontalTagList({ tags, selectedColor }: HorizontalTagListProps) {
	const renderTags = () => {
		return tags.map((tag) => {
			const customTag = tag.length !== 3 ? tag : ` ${tag} `

			return (
				< FilterButton
					key={uuid()}
					height={relativeScreenHeight(4)}
					backgroundColor={theme.white3}
					backgroundSelected={selectedColor || theme.orange1}
					marginRight={10}
					label={customTag}
					fontSize={13}
					selected
				/>
			)
		})
	}

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					<HorizontalSpacing width={relativeScreenWidth(5)} />
					{renderTags()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalTagList }
