import React from 'react'

import { Container, Text } from './styles'
import { relativeScreenDensity } from '@common/screenDimensions'

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
				style={{ fontSize: relativeScreenDensity(fontSize) }}
				numberOfLines={numberOfLines}
			>
				{text}
			</Text>
		</Container>
	)
}

export { LeftLineCard }
