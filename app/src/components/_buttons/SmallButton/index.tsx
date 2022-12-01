import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { SvgProps } from 'react-native-svg'
import { ButtonLabel, ContainerBottom, ContainerSurface, TouchableContainer } from './styles'

interface SmallButtonProps {
	color: string
	label?: string
	fontSize?: number
	SvgIcon?: React.FC<SvgProps>
	relativeWidth?: string | number
	height?: number
	onPress: () => void
}

function SmallButton({
	color,
	label = '',
	fontSize,
	SvgIcon,
	relativeWidth = '100%',
	height = 30,
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
						height: RFValue(height)
					} as { [key: string]: React.CSSProperties }}
				>
					{
						!!SvgIcon && (
							<SvgIcon
								height={RFValue(22)}
								width={RFValue(22)}
							/>
						)
					}
					<ButtonLabel
						style={{
							fontSize,
							marginLeft: label ? RFValue(8) : 0
						}}
					>
						{label}
					</ButtonLabel>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableContainer>
	)
}

export { SmallButton }
