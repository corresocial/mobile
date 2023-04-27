import React from 'react'

import { Container } from './styles'

import { relativeScreenHeight } from '../../common/screenDimensions'

interface VerticalSighProps {
	height?: number
	bottomNavigatorSpace?: boolean
}

function VerticalSigh({ height, bottomNavigatorSpace }: VerticalSighProps) {
	const customHeight = bottomNavigatorSpace ? relativeScreenHeight(13) : height

	return (
		<Container height={customHeight}>

		</Container>
	)
}

export { VerticalSigh }
