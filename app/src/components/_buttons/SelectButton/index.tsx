import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
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
	svgIconScale?: [height: string, width: string]
	selected?: boolean
	flexSelected?: 0 | 1
	onSelect?: () => void
}

function SelectButton({
	width = relativeScreenWidth(39),
	height = relativeScreenHeight(9),
	marginVertical = RFValue(6),
	marginHorizontal = 0,
	backgroundColor = theme.white3,
	backgroundSelected,
	label,
	boldLabel = false,
	noDisplacement = false,
	fontSize = 15,
	SvgIcon,
	svgIconScale,
	selected = false,
	flexSelected = 0,
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
					marginLeft: noDisplacement ? relativeScreenWidth(2.5) : 0,
					flex: selected ? flexSelected : 0,
				}}
			>
				<ContainerSurface
					style={{
						paddingHorizontal: selected ? relativeScreenWidth(2.5) : 0,
						backgroundColor: selected ? backgroundSelected : backgroundColor,
						transform: [{ translateX: buttonPressed ? 0 : -relativeScreenWidth(selected ? 1.3 : 2) }],
						height,
					}}
				>
					<Label
						style={{
							fontSize: RFValue(fontSize),
							fontFamily: selected || boldLabel ? 'Arvo_700Bold' : 'Arvo_400Regular',
						}}
					>
						{label}
					</Label>
					{SvgIcon && <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />}
				</ContainerSurface>
			</ContainerBottom>
		</TouchableWithoutFeedback >
	)
}

export { SelectButton }
