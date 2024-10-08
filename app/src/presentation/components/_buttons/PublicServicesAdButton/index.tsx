import React from 'react'
import { useTheme } from 'styled-components/native'

import PublicServicesWhiteIcon from '@assets/icons/publicServices-white.svg'
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
			color={theme.colors.white[3]}
			label={customTitle || 'serviços públicos'}
			highlightedWords={[...customTitle.split(' '), 'serviços', 'públicos']}
			labelSize={17}
			relativeHeight={relativeScreenHeight(12)}
			// shortDescription={'você aí de Londrina, agora você pode consultar seus benefícios sociais!'} // SMAS
			// shortDescriptionHighlightedWords={['Londrina,', 'benefícios', 'sociais']} // SMAS
			shortDescription={'você aí de Londrina, EM BREVE poderá consultar seus benefícios!'}
			shortDescriptionHighlightedWords={['Londrina', 'EM', 'BREVE']}
			SvgIcon={PublicServicesWhiteIcon}
			svgIconScale={['65%', '65%']}
			leftSideColor={theme.colors.pink[3]}
			leftSideWidth={'25%'}
			onPress={onPress}
		/>
	)
}

export { PublicServicesAdButton }
