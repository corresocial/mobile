import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import { IconName, IconVariation } from '@assets/icons/iconMap/types'

import { Container, TouchableContainer } from './styles'
import { icons } from '@assets/icons/iconMap'

interface IconComponentProps {
	iconName: IconName
	iconVariation?: IconVariation
	relativeWidth?: number | string
	relativeHeight?: number | string
	activeOpacity?: number
	onPress?: () => void
}

function IconComponent({ iconName, iconVariation = 'default', relativeWidth = 20, relativeHeight, activeOpacity = 0.5, onPress }: IconComponentProps) {
	if (!iconName) {
		return null
	}

	const Icon: FC<SvgProps> | undefined = icons[iconName][iconVariation]

	if (!Icon) {
		console.warn('Icone ou variação não encontrados')
		return null
	}

	return (
		onPress ? (
			<TouchableContainer
				activeOpacity={activeOpacity}
				width={relativeWidth}
				height={relativeHeight ?? relativeWidth}
				onPress={onPress}
			>
				<Icon
					width={'100%'}
					height={'100%'}
				/>
			</TouchableContainer>
		) : (
			<Container
				width={relativeWidth}
				height={relativeHeight ?? relativeWidth}
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
