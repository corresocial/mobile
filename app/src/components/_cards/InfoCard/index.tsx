import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, ContainerInner, Description, Title } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface InfoCardProps {
	height?: string | number
	color: string
	title: string
	titleFontSize?: number
	description: string
	highlightedWords: string[]
}

function InfoCard({
	height,
	color,
	title,
	titleFontSize = 22,
	description,
	highlightedWords
}: InfoCardProps) {
	return (
		<Container
			style={{ height }}
		>
			<ContainerInner style={{ backgroundColor: color }}>
				<Title
					style={{
						fontSize: RFValue(titleFontSize)
					}}
				>
					{showMessageWithHighlight(title, highlightedWords)}
				</Title>
				<Description>
					{showMessageWithHighlight(description, highlightedWords)}
				</Description>
			</ContainerInner>
		</Container>
	)
}

export { InfoCard }
