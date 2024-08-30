import React from 'react'
import { SvgProps } from 'react-native-svg'

import { Container, ContainerInner, Description, Title } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

interface InfoCardProps {
	height?: string | number
	color: string
	title: string
	titleFontSize?: number
	description?: string
	highlightedWords: string[]
	SvgIcon?: React.FC<SvgProps>
}

function InfoCard({
	height,
	color,
	title,
	titleFontSize = 22,
	description,
	highlightedWords,
	SvgIcon
}: InfoCardProps) {
	return (
		<Container
			style={{ height }}
		>
			<ContainerInner style={{ backgroundColor: color }} hasSvgIcon={!!SvgIcon}>
				{SvgIcon && <SvgIcon height={relativeScreenDensity(40)} width={relativeScreenDensity(40)} />}
				<Title
					style={{
						fontSize: relativeScreenDensity(titleFontSize),
						marginBottom: description ? relativeScreenHeight(2) : 0
					}}
				>
					{showMessageWithHighlight(title, highlightedWords)}
				</Title>
				{
					description && (
						<Description>
							{showMessageWithHighlight(description, highlightedWords)}
						</Description>
					)
				}
			</ContainerInner>
		</Container>
	)
}

export { InfoCard }
