import React from 'react'

import { IconName } from '@assets/icons/iconMap/types'

import { Container, RightLabel, Title } from './styles'
import { theme } from '@common/theme'

import { IconComponent } from '@newComponents/IconComponent'
import { StandardButton } from '@newComponents/StandardButton'

interface ContextHeaderProps {
	title: string
	color?: string
	rightLabel?: string
	icon?: IconName
	onBack?: () => void
	onClose?: () => void
}

function ContextHeader({ title, color = 'transparent', rightLabel, icon, onBack, onClose }: ContextHeaderProps) {
	return (
		<Container color={color}>
			{onBack && <StandardButton icon={'arrowLeft'} onPress={onBack} />}
			{onClose && <StandardButton icon={'x'} backgroundColor={theme.colors.red[3]} onPress={onClose} />}
			{icon && <IconComponent relativeWidth={35} relativeHeight={35} iconName={icon} />}
			<Title>{title}</Title>
			{rightLabel && <RightLabel>{rightLabel}</RightLabel>}
		</Container>
	)
}

export { ContextHeader }
