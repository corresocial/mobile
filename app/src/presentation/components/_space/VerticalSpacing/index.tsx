import React from 'react'

import { Container } from './styles'

interface VerticalSpacingProps {
	height?: number
	relativeDensity?: boolean
	bottomNavigatorSpace?: boolean
}

function VerticalSpacing({ height, relativeDensity, bottomNavigatorSpace }: VerticalSpacingProps) {
	return (
		<Container
			relativeDensity={!!relativeDensity}
			bottomNavigatorSpace={!!bottomNavigatorSpace}
			height={height}
		>

		</Container>
	)
}

export { VerticalSpacing }
