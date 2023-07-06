import React, { useState } from 'react'
import { TextStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	ButtonLabel,
	TouchableContainer,
	ContainerSurface,
	ContainerBottom,
	IconArea,
	LabelDescriptionArea,
	Description,
	ShortDescription
} from './styles'
import { theme } from '../../../common/theme'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface OptionButtonProps {
	color: string
	label: string
	labelColor?: string
	labelSize?: number
	relativeHeight?: string
	labelAlign?: TextStyle['textAlign']
	SvgIcon?: React.FC<SvgProps>
	svgIconScale?: [height: string, width: string]
	leftSideColor?: string
	leftSideWidth?: string | number
	highlightedWords?: string[]
	description?: string
	shortDescription?: string
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
	svgIconScale,
	leftSideColor = theme.orange2,
	leftSideWidth,
	description,
	shortDescription,
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
						backgroundColor: color,
						marginRight: buttonPressed ? RFValue(-7) : 0
					}}
				>
					<IconArea
						style={{
							backgroundColor: leftSideColor,
							width: leftSideWidth
						}}
					>
						{SvgIcon && <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />}
					</IconArea>
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
								<ShortDescription centralized>
									{shortDescription}
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
