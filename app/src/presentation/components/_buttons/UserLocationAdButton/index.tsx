import React from 'react'
import { useTheme } from 'styled-components/native'

import CityWhiteIcon from '@assets/icons/city-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { OptionButton } from '../OptionButton'

interface UserLocationAdButtonProps {
	customTitle?: string
	onPress: () => void
}

function UserLocationAdButton({ customTitle = '', onPress }: UserLocationAdButtonProps) {
	const theme = useTheme()

	return (
		<OptionButton
			color={theme.colors.white[3]}
			label={customTitle || 'você aí de Londrina'}
			highlightedWords={[...customTitle.split(' '), 'Londrina']}
			labelSize={17}
			relativeHeight={relativeScreenHeight(12)}
			shortDescription={'receba notificações da prefeitura sobre o que acontece na cidade'}
			shortDescriptionHighlightedWords={['benefício', 'emergencial']}
			SvgIcon={CityWhiteIcon}
			svgIconScale={['65%', '65%']}
			leftSideColor={theme.colors.yellow[3]}
			leftSideWidth={'25%'}
			onPress={onPress}
		/>
	)
}

export { UserLocationAdButton }
