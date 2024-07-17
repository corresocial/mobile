import React, { useState } from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { ButtonText, Container, ContainerBackground } from './styles'
import { theme } from '@common/theme'

import { IconComponent } from '../IconComponent'

interface SelectButtonProps{
    text: string
    icon?: IconName
    reversed?: boolean
    selected?: boolean
    relativeWidth?: number | string
	relativeHeight?: number | string
    selectionColor?: string
	manualSelection?: boolean
    onPress: () => void
}

function SelectButton({ text, icon, reversed, selected = false, relativeWidth = 0, relativeHeight = 50, selectionColor = theme.colors.orange[1], manualSelection, onPress }: SelectButtonProps) {
	const [buttonSelected, setButtonSelected] = useState<boolean>(selected)

	const buttonPressHandler = () => {
		setButtonSelected(!buttonSelected)
		onPress()
	}

	return (
		<Container width={relativeWidth} height={relativeHeight} activeOpacity={1} onPress={buttonPressHandler}>
			<ContainerBackground selectedColor={selectionColor} selected={manualSelection ? selected : buttonSelected} reversed={reversed}>
				{
					icon && <IconComponent iconName={icon}/>
				}
				<ButtonText>{text}</ButtonText>
			</ContainerBackground>
		</Container>
	)
}

export { SelectButton }
