import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, Text } from './styles'

interface LeftLineCardProps {
	text: string
	fontSize: number
	height?: string | number
	numberOfLines?: number
}

function LeftLineCard({ text = '', fontSize, height, numberOfLines }: LeftLineCardProps) {
	return (
		<Container style={{ height }}>
			<Text
				style={{ fontSize: RFValue(fontSize) }}
				numberOfLines={numberOfLines}
			>
				{text}
			</Text>
		</Container>
	)
}

export { LeftLineCard }
