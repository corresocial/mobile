import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { ContainerBottom, ContainerSurface, Label } from './styles'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'
// REFACTOR REmove direct import
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
	backgroundColor = theme.colors.white[3],
	backgroundSelected,
	label,
	fontSize = 13,
	selected = false,
	onSelect
}: FilterButtonProps) {
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
		<TouchableOpacity
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					height: height as number,
					marginRight: relativeScreenDensity(10),
				}}
			>
				<ContainerSurface
					buttonPressed={buttonPressed || selected}
					style={{ backgroundColor: selected ? backgroundSelected : backgroundColor }}
				>
					<Label
						style={{
							fontSize: fontSize,
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
