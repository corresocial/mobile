import React, { useState } from 'react'
import { DimensionValue, TextStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import {
	ButtonLabel,
	TouchableContainer,
	ContainerSurface,
	ContainerBottom,
	LeftArea,
	LabelDescriptionArea,
	Description,
	ShortDescription,
	LeftSideText
} from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface OptionButtonProps {
	color?: string
	label: string
	selected?: boolean
	labelColor?: string
	labelSize?: number
	relativeHeight?: DimensionValue
	labelAlign?: TextStyle['textAlign']
	SvgIcon?: React.FC<SvgProps>
	SecondSvgIcon?: React.FC<SvgProps>
	svgIconScale?: [height: string, width: string]
	secondSvgIconScale?: [height: string, width: string]
	leftSideColor?: string
	selectedSideColor?: string
	leftSideWidth?: DimensionValue
	leftSideText?: string
	leftSideTextColor?: string | boolean
	highlightedWords?: string[]
	description?: string
	shortDescription?: string
	shortDescriptionFontSize?: number
	shortDescriptionHighlightedWords?: string[]
	onPress: () => void
}

function OptionButton({
	color,
	label,
	selected,
	labelColor,
	labelSize = 22,
	relativeHeight,
	labelAlign = 'center',
	highlightedWords,
	SvgIcon,
	SecondSvgIcon,
	svgIconScale,
	secondSvgIconScale,
	leftSideColor = theme.colors.orange[2],
	selectedSideColor,
	leftSideWidth,
	leftSideText,
	leftSideTextColor,
	description,
	shortDescription,
	shortDescriptionFontSize,
	shortDescriptionHighlightedWords = [],
	onPress
}: OptionButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress()
	}

	const heightWithoutDescription = relativeHeight || relativeScreenHeight(10)

	const buttomWithDescriptionHeight = description ? relativeScreenHeight(19) : relativeHeight

	return (
		<TouchableContainer
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					height: description || shortDescription ? buttomWithDescriptionHeight : heightWithoutDescription
				}}
			>
				<ContainerSurface
					buttonPressed={buttonPressed}
					style={{ backgroundColor: color || theme.colors.white[3] }}
				>
					<LeftArea
						style={{
							backgroundColor: (selected ? selectedSideColor : leftSideColor) as string,
							width: leftSideWidth as DimensionValue
						}}
					>
						{SvgIcon && <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />}
						{SecondSvgIcon && <SecondSvgIcon height={secondSvgIconScale?.[0] || svgIconScale?.[0]} width={secondSvgIconScale?.[1] || svgIconScale?.[1]} />}
						{
							leftSideText && (
								<LeftSideText leftSideTextColor={leftSideTextColor as string}>
									{showMessageWithHighlight(leftSideText, ['incluso', '\ngrátis', 'seu', '35,00', '60,00'])}
								</LeftSideText>
							)
						}
					</LeftArea>
					<LabelDescriptionArea>
						<ButtonLabel style={{
							color: labelColor,
							textAlign: labelAlign,
							fontSize: relativeScreenDensity(labelSize),
						}}
						>
							{showMessageWithHighlight(label, highlightedWords)}
						</ButtonLabel>
						{
							description
							&& (
								<Description>
									{description}
								</Description>
							)
						}
						{
							shortDescription
							&& (
								<ShortDescription fontSize={shortDescriptionFontSize} >
									{showMessageWithHighlight(shortDescription, shortDescriptionHighlightedWords)}
								</ShortDescription>
							)
						}
					</LabelDescriptionArea>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableContainer >
	)
}

export { OptionButton }
