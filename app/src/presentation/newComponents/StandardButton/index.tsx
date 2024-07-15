import React, { useState } from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { ContainerBackground, ContainerSurface, ButtonText } from './styles'
import { theme } from '@common/theme'

import { IconComponent } from '@newComponents/IconComponent'

interface StandardButtonProps{
	text?: string
	textTheme?: 'light' | 'dark'
	icon?: IconName
	heightPreset?: 'small' | 'medium' | 'large'
	relativeHeight?: number | string
	relativeWidth?: number | string
	reversed?: boolean
	backgroundColor?: string
	onPress: () => void
}

function StandardButton({ text, textTheme = 'dark', icon, heightPreset = 'medium', relativeHeight, relativeWidth = '100%', backgroundColor = theme.colors.white[3], reversed, onPress }: StandardButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

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
	const getButtonHeight = (): string | number => {
		return relativeHeight || getHeightPreset()
	}

	const getHeightPreset = (): number => {
		switch (heightPreset) {
			case 'medium':
				return 45
			case 'small':
				return 40
			case 'large':
				return 50
		}
	}

	return (
		<ContainerBackground isIconButton={!!(icon && !text)} relativeWidth={relativeWidth} relativeHeight={getButtonHeight()}>
			<ContainerSurface
				onPressIn={pressingButton}
				onPressOut={notPressingButton}
				onPress={releaseButton}
				activeOpacity={1}
				backgroundColor={backgroundColor}
				buttonPressed={buttonPressed}
				flexDirection={reversed ? 'row-reverse' : 'row'}
			>
				{
					icon && <IconComponent relativeWidth={'50%'} relativeHeight={'60%'} iconName={icon}/>
				}
				{
					text && <ButtonText textTheme={textTheme}>{text}</ButtonText>
				}
			</ContainerSurface>
		</ContainerBackground>
	)
}

export { StandardButton }
