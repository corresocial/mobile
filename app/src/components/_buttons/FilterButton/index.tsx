import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'
import { ContainerBottom, ContainerSurface, Label } from './styles'

interface FilterButtonProps {
	height?: string | number;
	marginRight?: number;
	backgroundColor?: string;
	backgroundSelected?: string;
	label?: string;
	fontSize?: number;
	selected?: boolean;
	onSelect?: () => void;
}

function FilterButton({
	height = relativeScreenHeight(9),
	marginRight = 0,
	backgroundColor = theme.white3,
	backgroundSelected,
	label,
	fontSize = 15,
	selected = false,
	onSelect,
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
		<TouchableWithoutFeedback
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerBottom
				style={{
					width: label && label.length * RFValue(10),
					height,
					marginRight: RFValue(marginRight),
				}}
			>
				<ContainerSurface
					style={{
						width: label && label.length * RFValue(10),
						backgroundColor: selected
							? backgroundSelected
							: backgroundColor,
						marginRight: selected
							? RFValue(-4)
							: buttonPressed
								? RFValue(-5)
								: 0,
					}}
				>
					<Label
						style={{
							fontSize: RFValue(fontSize),
							fontFamily: 'Arvo_400Regular',
						}}
					>
						{label}
					</Label>
				</ContainerSurface>
			</ContainerBottom>
		</TouchableWithoutFeedback>
	)
}

export { FilterButton }
