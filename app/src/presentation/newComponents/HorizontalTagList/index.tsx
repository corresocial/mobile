import React from 'react'
import uuid from 'react-uuid'

import { Container, ScrollView } from './styles'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { FilterButton } from '@components/_buttons/FilterButton'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface HorizontalTagListProps {
	tags: string[]
	selectedColor?: string
}

function HorizontalTagList({ tags, selectedColor }: HorizontalTagListProps) {
	if (!tags || (tags && !tags.length) || (tags && !tags[0])) return <></>

	const renderTags = () => {
		return tags.map((tag) => {
			const customTag = tag.length !== 3 ? tag : ` ${tag} `

			return (
				<FilterButton
					key={uuid()}
					height={relativeScreenHeight(3.5)}
					backgroundColor={theme.colors.white[1]}
					backgroundSelected={selectedColor || theme.colors.orange[3]}
					label={customTag}
					fontSize={theme.fontSizes[2]}
					selected
				/>
			)
		})
	}

	return (
		<Container >
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					<HorizontalSpacing width={relativeScreenDensity(15)} />
					{renderTags()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalTagList }
