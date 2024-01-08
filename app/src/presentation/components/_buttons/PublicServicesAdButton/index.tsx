import React from 'react'
import { useTheme } from 'styled-components/native'

import LogoOutlinedWhiteIcon from '@assets/icons/logo-outlined.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { OptionButton } from '../OptionButton'

interface PublicServicesAdButtonProps {
	customTitle?: string
	onPress: () => void
}

function PublicServicesAdButton({ customTitle = '', onPress }: PublicServicesAdButtonProps) {
	const theme = useTheme()

	return (
		<OptionButton
			color={theme.white3}
			label={customTitle || 'serviços públicos'}
			highlightedWords={[...customTitle.split(' '), 'serviços', 'públicos']}
			labelSize={17}
			relativeHeight={relativeScreenHeight(12)}
			shortDescription={'aqui você pode consultar seu benefício emergencial'}
			shortDescriptionHighlightedWords={['benefício', 'emergencial']}
			SvgIcon={LogoOutlinedWhiteIcon}
			svgIconScale={['65%', '65%']}
			leftSideColor={theme.pink3}
			leftSideWidth={'25%'}
			onPress={onPress}
		/>
	)
}

export { PublicServicesAdButton }
