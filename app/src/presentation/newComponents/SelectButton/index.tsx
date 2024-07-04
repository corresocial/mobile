import React, { useState } from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { ButtonText, Container, ContainerBackground } from './styles'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { IconComponent } from '../IconComponent'

interface SelectButtonProps{
    text: string
    grow?: boolean
    icon?: IconName
    reversed?: boolean
    selected?: boolean
    relativeWidth?: number // aceitar porcentagem
    selectionColor?: string
    onPress: () => void
}

function SelectButton({ text, grow, icon, reversed, selected = false, relativeWidth = 0, selectionColor = theme.colors.orange[1], onPress }: SelectButtonProps) {
	const [buttonSelected, setButtonSelected] = useState<boolean>(selected)

	const getWidth = (): number | null => {
		return (grow ? relativeScreenWidth(100) : (relativeWidth ? relativeScreenWidth(relativeWidth) : null))
	}

	const buttonPressHandler = () => {
		setButtonSelected(!buttonSelected)
		onPress()
	}

	// definir altura como density (crescer junto com o ícone)

	return (
		<Container width={getWidth()} activeOpacity={1} onPress={buttonPressHandler}>
			<ContainerBackground selectedColor={selectionColor} selected={buttonSelected} reversed={reversed}>
				{
					icon && <IconComponent iconName={icon}/>
				}
				<ButtonText>{text}</ButtonText>
			</ContainerBackground>
		</Container>
	)
}

export { SelectButton }