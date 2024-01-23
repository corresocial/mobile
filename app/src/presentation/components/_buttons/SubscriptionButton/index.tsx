import React from 'react'
import { useTheme } from 'styled-components/native'

import LogoOutlinedWhiteIcon from '@assets/icons/logo-outlined.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { OptionButton } from '../OptionButton'

interface SubscriptionButtonProps {
	customTitle?: string
	onPress: () => void
}

function SubscriptionButton({ customTitle = '', onPress }: SubscriptionButtonProps) {
	const theme = useTheme()

	return (
		<OptionButton
			color={theme.white3}
			label={customTitle || 'apoie o corre.'}
			highlightedWords={[...customTitle.split(' '), 'apoie', 'o', 'corre']}
			labelSize={17}
			relativeHeight={relativeScreenHeight(12)}
			shortDescription={'com uma assinatura mensal você alcança muito mais clientes e ajuda cidadãos do nosso país'}
			SvgIcon={LogoOutlinedWhiteIcon}
			svgIconScale={['65%', '65%']}
			leftSideColor={theme.orange3}
			leftSideWidth={'25%'}
			onPress={onPress}
		/>
	)
}

export { SubscriptionButton }
