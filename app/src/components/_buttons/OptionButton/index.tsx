import React, { useState } from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { theme } from '@common/theme'

import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import {
	ButtonLabel,
	TouchableContainer,
	ContainerSurface,
	ContainerBottom,
	IconArea,
	LabelDescriptionArea,
	ButtonDescription,
} from './styles'

interface OptionButtonProps {
	color: string;
	label: string;
	labelColor?: string;
	labelSize?: number;
	relativeHeight?: string;
	labelAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
	SvgIcon?: React.FC<SvgProps>;
	svgIconScale?: [height: string, width: string];
	leftSideColor?: string;
	leftSideWidth?: string | number;
	highlightedWords?: string[];
	description?: string;
	onPress: () => void;
}

function OptionButton({
	color,
	label,
	labelColor,
	labelSize = 20,
	relativeHeight,
	labelAlign = 'center',
	highlightedWords,
	SvgIcon,
	svgIconScale,
	leftSideColor = theme.orange2,
	leftSideWidth,
	description,
	onPress,
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

	const heightWithoutDescription = relativeHeight || RFValue(75)

	return (
		<TouchableContainer
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					height: description
						? RFValue(137)
						: heightWithoutDescription,
				}}
			>
				<ContainerSurface
					style={
						{
							backgroundColor: color,
							marginRight: buttonPressed ? RFValue(-7) : 0,
						} as { [key: string]: React.CSSProperties }
					}
				>
					<IconArea
						style={{
							backgroundColor: leftSideColor,
							width: leftSideWidth,
						}}
					>
						{SvgIcon && (
							<SvgIcon
								height={svgIconScale?.[0]}
								width={svgIconScale?.[1]}
							/>
						)}
					</IconArea>
					<LabelDescriptionArea>
						<ButtonLabel
							style={{
								color: labelColor,
								textAlign: labelAlign,
								fontSize: RFValue(labelSize),
							}}
						>
							{showMessageWithHighlight(label, highlightedWords)}
						</ButtonLabel>
						{description && (
							<ButtonDescription>{description}</ButtonDescription>
						)}
					</LabelDescriptionArea>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableContainer>
	)
}

export { OptionButton }
