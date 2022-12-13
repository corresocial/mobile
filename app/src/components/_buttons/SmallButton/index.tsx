import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { ButtonLabel, ContainerBottom, ContainerSurface, TouchableContainer } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface SmallButtonProps {
	color: string
	label?: string
	highlightedWords?: string[]
	fontSize?: number
	SvgIcon?: React.FC<SvgProps>
	svgScale?: number
	relativeWidth?: string | number
	flexDirection?: string
	height?: number
	onPress: () => void
}

function SmallButton({
	color,
	label = '',
	highlightedWords = [],
	fontSize,
	SvgIcon,
	svgScale = RFValue(22),
	relativeWidth = '100%',
	height = 30,
	flexDirection = 'row',
	onPress
}: SmallButtonProps) {
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

	return (
		<TouchableContainer
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					width: typeof (relativeWidth) === 'string' ? relativeWidth : RFValue(relativeWidth),
					height: RFValue(height)
				}}
			>
				<ContainerSurface
					style={{
						backgroundColor: color,
						marginRight: buttonPressed ? RFValue(-4) : 0,
						height: RFValue(height),
						flexDirection,
					} as { [key: string]: React.CSSProperties }}
				>
					{
						!!SvgIcon && (
							<SvgIcon
								height={svgScale}
								width={svgScale}
							/>
						)
					}
					<ButtonLabel
						style={{
							fontSize,
							marginLeft: label && flexDirection === 'row' ? RFValue(8) : 0,
							fontFamily: highlightedWords?.length > 0 ? 'Arvo_400Regular' : 'Arvo_700Bold'
						}}
					>
						{showMessageWithHighlight(label, highlightedWords)}
					</ButtonLabel>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableContainer>
	)
}

export { SmallButton }
