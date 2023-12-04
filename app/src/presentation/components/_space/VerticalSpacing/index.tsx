import React from 'react'

import { Container } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'

interface VerticalSpacingProps {
	height?: number
	bottomNavigatorSpace?: boolean
}

function VerticalSpacing({ height, bottomNavigatorSpace }: VerticalSpacingProps) {
	const customHeight = bottomNavigatorSpace ? relativeScreenHeight(13) : height

	return (
		<Container height={customHeight}>

		</Container>
	)
}

export { VerticalSpacing }
