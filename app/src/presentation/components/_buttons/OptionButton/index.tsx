import React, { useState } from 'react'
import { TextStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

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
import { theme } from '../../../common/theme'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface OptionButtonProps {
	color?: string
	label: string
	labelColor?: string
	labelSize?: number
	relativeHeight?: string | number
	labelAlign?: TextStyle['textAlign']
	SvgIcon?: React.FC<SvgProps>
	SecondSvgIcon?: React.FC<SvgProps>
	svgIconScale?: [height: string, width: string]
	secondSvgIconScale?: [height: string, width: string]
	leftSideColor?: string
	leftSideWidth?: string | number
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
	labelColor,
	labelSize = 22,
	relativeHeight,
	labelAlign = 'center',
	highlightedWords,
	SvgIcon,
	SecondSvgIcon,
	svgIconScale,
	secondSvgIconScale,
	leftSideColor = theme.orange2,
	leftSideWidth,
	leftSideText,
	leftSideTextColor,
	description,
	shortDescription,
	shortDescriptionFontSize,
	shortDescriptionHighlightedWords = [],
	onPress
}: OptionButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<Boolean>(false)

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
					style={{
						backgroundColor: color || theme.white3,
						marginLeft: buttonPressed ? RFValue(7) : 0
					}}
				>
					<LeftArea
						style={{
							backgroundColor: leftSideColor,
							width: leftSideWidth
						}}
					>
						{SvgIcon && <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />}
						{SecondSvgIcon && <SecondSvgIcon height={secondSvgIconScale?.[0] || svgIconScale?.[0]} width={secondSvgIconScale?.[1] || svgIconScale?.[1]} />}
						{
							leftSideText && (
								<LeftSideText leftSideTextColor={leftSideTextColor}>
									{showMessageWithHighlight(leftSideText, ['incluso', '\ngrátis', 'seu', '35,00', '60,00'])}
								</LeftSideText>
							)
						}
					</LeftArea>
					<LabelDescriptionArea>
						<ButtonLabel style={{
							color: labelColor,
							textAlign: labelAlign,
							fontSize: RFValue(labelSize),
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
