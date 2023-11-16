import React from 'react'

import { Container } from './styles'

interface HorizontalSpacingProps {
	width?: number
}

function HorizontalSpacing({ width }: HorizontalSpacingProps) {
	return (
		<Container width={width}>

		</Container>
	)
}

export { HorizontalSpacing }
