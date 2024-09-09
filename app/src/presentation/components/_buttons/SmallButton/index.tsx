import React, { useState } from 'react'
import { ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import {
	ButtonLabel,
	ContainerBottom,
	ContainerSurface,
	TouchableContainer,
} from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface SmallButtonProps {
	color?: string
	label?: string
	labelColor?: string
	highlightedWords?: string[]
	fontSize?: number
	SvgIcon?: React.FC<SvgProps>
	SecondSvgIcon?: React.FC<SvgProps>
	svgScale?: [height: string, width: string]
	secondSvgScale?: [height: string, width: string]
	relativeWidth?: string | number
	height?: number
	textMarginTop?: boolean
	rounded?: boolean
	halfRounded?: boolean
	flexDirection?: ViewStyle['flexDirection']
	onPress: () => void,
	onPressStart?: () => void,
	onPressRelease?: () => void
}

function SmallButton({
	color = 'white',
	label = '',
	labelColor = theme.colors.white[3],
	highlightedWords = [],
	fontSize = 13,
	SvgIcon,
	SecondSvgIcon,
	svgScale = label ? ['50%', '15%'] : ['50%', '80%'],
	secondSvgScale = label ? ['50%', '15%'] : ['50%', '80%'],
	relativeWidth = '100%',
	height = 30,
	rounded = false,
	textMarginTop = false,
	halfRounded = false,
	flexDirection = 'row',
	onPress,
	onPressStart,
	onPressRelease
}: SmallButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
		onPressStart?.()
	}

	function notPressingButton() {
		setButtomPressed(false)
		onPressRelease?.()
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
				relativeWidth={relativeWidth}
				height={height}
				rounded={rounded}
				halfRounded={halfRounded}
			>
				<ContainerSurface
					backgroundColor={color}
					buttonPressed={buttonPressed}
					flexDirection={flexDirection}
					rounded={rounded}
					halfRounded={halfRounded}
				>
					{
						!!SvgIcon && (
							<SvgIcon height={svgScale[0]} width={svgScale[1]} />
						)
					}
					{
						!!SecondSvgIcon && (
							<SecondSvgIcon height={secondSvgScale[0]} width={secondSvgScale[1]} style={{ marginTop: relativeScreenDensity(4) }} />
						)
					}
					{
						label && (
							<ButtonLabel
								style={{
									fontSize: relativeScreenDensity(fontSize),
									marginLeft: label && flexDirection === 'row' ? relativeScreenDensity(8) : 0,
									fontWeight: highlightedWords?.length > 0 ? 400 : 700,
									color: labelColor,
									marginTop: textMarginTop ? relativeScreenDensity(5) : 0
								}}
							>
								{showMessageWithHighlight(label, highlightedWords)}
							</ButtonLabel>
						)
					}
				</ContainerSurface>
			</ContainerBottom>
		</TouchableContainer>
	)
}

export { SmallButton }
