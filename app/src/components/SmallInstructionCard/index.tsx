import React from 'react'

import { Container, CustomText } from './styles'

interface SmallInstructionCardProps {
	text?: any
	highlight?: boolean
}

function SmallInstructionCard({ text, highlight }: SmallInstructionCardProps) {
	return (
		<Container highlight={highlight}>
			<CustomText highlight={highlight}>{text}</CustomText>
		</Container>
	)
}

export { SmallInstructionCard }
