import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import { IconName, IconVariation } from '@assets/icons/iconMap/types'

import { Container, TouchableContainer } from './styles'
import { icons } from '@assets/icons/iconMap'
import { relativeScreenDensity } from '@common/screenDimensions'

interface IconComponentProps{
    iconName: IconName
    iconVariation?: IconVariation
    relativeWidth?: number
    relativeHeight?: number
	activeOpacity?: number
    onPress?: () => void
}

function IconComponent({ iconName, iconVariation = 'default', relativeWidth = 20, relativeHeight, activeOpacity = 0.5, onPress }: IconComponentProps) {
	const Icon: FC<SvgProps> | undefined = icons[iconName][iconVariation]

	const width = relativeScreenDensity(relativeWidth) // ACeitar porcentagem
	const height = relativeScreenDensity(relativeHeight ?? relativeWidth)

	if (!Icon) {
		console.warn('ícone não encontrado')
		return null
	}

	return (
		onPress ? (
			<TouchableContainer 
				activeOpacity={activeOpacity}
				width={width} 
				height={height}
				onPress={onPress}
			>
				<Icon 
					width={'100%'} 
					height={'100%'}
				/>
			</TouchableContainer>	
		) : (
			<Container
				width={width} 
				height={height}
			> 
				<Icon 
					width={'100%'} 
					height={'100%'}
				/>
			</Container>
		)
	)
}

export { IconComponent } 