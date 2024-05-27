import React from 'react'

import { Container } from './styles'

interface VerticalSpacingProps {
	height?: number
	bottomNavigatorSpace?: boolean
}

function VerticalSpacing({ height, bottomNavigatorSpace }: VerticalSpacingProps) {
	return (
		<Container
			bottomNavigatorSpace={!!bottomNavigatorSpace}
			height={height}
		>

		</Container>
	)
}

export { VerticalSpacing }
