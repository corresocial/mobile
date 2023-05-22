import React from 'react'

import { Container, CustomText } from './styles'

interface PaymentSubtitleProps {
	text?: any
	highlight?: boolean
}

function PaymentSubtitle({ text, highlight }: PaymentSubtitleProps) {
	return (
		<Container>
			<CustomText>{text}</CustomText>
		</Container>
	)
}

export { PaymentSubtitle }
