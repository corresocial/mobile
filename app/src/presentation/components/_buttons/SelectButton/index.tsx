import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { ContainerBottom, ContainerSurface, Label } from './styles'
import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface SelectButtonProps {
	width?: string | number
	height?: string | number
	marginVertical?: number
	marginHorizontal?: number
	backgroundColor?: string
	backgroundSelected?: string
	label?: string
	labelColor?: string
	boldLabel?: boolean
	noDisplacement?: boolean
	fontSize?: number
	SvgIcon?: React.FC<SvgProps> | null
	svgIconScale?: [height: string, width: string]
	selected?: boolean
	flexSelected?: 0 | 1
	onSelect?: () => void
}

function SelectButton({
	width = relativeScreenWidth(39),
	height = relativeScreenHeight(9),
	marginVertical = relativeScreenDensity(6),
	marginHorizontal = 0,
	backgroundColor = theme.colors.white[3],
	backgroundSelected,
	label,
	labelColor,
	boldLabel = false,
	noDisplacement = false,
	fontSize = 15,
	SvgIcon,
	svgIconScale,
	selected = false,
	flexSelected = 0,
	onSelect
}: SelectButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

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
					marginVertical: relativeScreenDensity(marginVertical),
					marginHorizontal: relativeScreenDensity(marginHorizontal),
					marginLeft: noDisplacement ? relativeScreenWidth(2.5) : 0,
					flex: selected ? flexSelected : 0,
				} as any}
			>
				<ContainerSurface
					buttonPressed={buttonPressed}
					style={{
						paddingHorizontal: selected ? relativeScreenWidth(2.5) : 0,
						backgroundColor: selected ? backgroundSelected : backgroundColor,
						height,
					} as any}
				>
					<Label
						style={{
							fontSize: relativeScreenDensity(fontSize),
							fontFamily: selected || boldLabel ? 'Arvo_700Bold' : 'Arvo_400Regular',
							color: labelColor,
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
