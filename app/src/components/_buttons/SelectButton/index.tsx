import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import { ContainerBottom, ContainerSurface, Label } from './styles'
import { theme } from '../../../common/theme'

interface SelectButtonProps {
	width?: string | number
	height?: string | number
	marginVertical?: number
	marginHorizontal?: number
	backgroundColor?: string
	backgroundSelected?: string
	label?: string
	boldLabel?: boolean
	noDisplacement?: boolean
	fontSize?: number
	SvgIcon?: React.FC<SvgProps>
	selected?: boolean
	onSelect?: () => void
}

function SelectButton({
	width = screenWidth * 0.39,
	height = screenHeight * 0.09,
	marginVertical = RFValue(6),
	marginHorizontal = 0,
	backgroundColor = theme.white3,
	backgroundSelected,
	label,
	boldLabel = false,
	noDisplacement = false,
	fontSize = 15,
	SvgIcon,
	selected = false,
	onSelect
}: SelectButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<Boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onSelect && onSelect()
	}

	return (
		<TouchableWithoutFeedback
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					width,
					height,
					marginVertical: RFValue(marginVertical),
					marginHorizontal: RFValue(marginHorizontal),
					marginLeft: noDisplacement ? RFValue(8) : 0
				}}
			>
				<ContainerSurface
					style={{
						backgroundColor: selected ? backgroundSelected : backgroundColor,
						marginRight: selected ? RFValue(-4) : buttonPressed ? RFValue(-7) : 0
					}}
				>
					{SvgIcon && <SvgIcon width={'20%'} height={'50%'} />}
					<Label
						style={{
							fontSize: RFValue(fontSize),
							fontFamily: selected || boldLabel ? 'Arvo_700Bold' : 'Arvo_400Regular'
						}}
					>
						{label}
					</Label>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableWithoutFeedback >
	)
}

export { SelectButton }
