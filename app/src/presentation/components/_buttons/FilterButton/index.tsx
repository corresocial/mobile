import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { ContainerBottom, ContainerSurface, Label } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface FilterButtonProps {
	height?: string | number
	backgroundColor?: string
	backgroundSelected?: string
	label?: string
	fontSize?: number
	selected?: boolean
	onSelect?: () => void
}

function FilterButton({
	height = relativeScreenHeight(9),
	backgroundColor = theme.white3,
	backgroundSelected,
	label,
	fontSize = 13,
	selected = false,
	onSelect
}: FilterButtonProps) {
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
		<TouchableOpacity
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					height,
					marginRight: RFValue(10),
				}}
			>
				<ContainerSurface
					style={{
						backgroundColor: selected ? backgroundSelected : backgroundColor,
						marginRight: selected ? RFValue(-4) : buttonPressed ? RFValue(-5) : 0
					}}
				>
					<Label
						style={{
							fontSize: RFValue(fontSize),
							fontFamily: 'Arvo_400Regular'
						}}
					>
						{label}
					</Label>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableOpacity>
	)
}

export { FilterButton }
