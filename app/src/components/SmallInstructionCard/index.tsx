import React from 'react'

import { Container, CustomText } from './styles'

interface SmallInstructionCardProps {
	text?: any
	highlight?: boolean
	error?: boolean
}

function SmallInstructionCard({ text, highlight, error }: SmallInstructionCardProps) {
	return (
		<Container highlight={highlight} error={error}>
			<CustomText highlight={highlight}>{text}</CustomText>
		</Container>
	)
}

export { SmallInstructionCard }
