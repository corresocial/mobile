import React from 'react'
import { useTheme } from 'styled-components/native'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import LogoOutlinedWhiteIcon from '@assets/icons/logo-outlined.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { OptionButton } from '../OptionButton'

interface SubscriptionButtonProps {
	customTitle?: string
	onPress: () => void
}

function SubscriptionButton({ customTitle = '', onPress }: SubscriptionButtonProps) {
	const theme = useTheme()

	const userRange = checkFreeTrialRange('city')

	const promotionTitle = 'PROMOÇÃO'
	const promotionText = 'aproveite 3 meses gratuitos de nosso aplicativo para alcançar a cidade ou o país todo com suas postagens!'

	return (
		<OptionButton
			color={theme.colors.white[3]}
			label={
				userRange.betweenRange
					? customTitle || promotionTitle
					: customTitle || 'apoie o corre.'
			}
			highlightedWords={[...(customTitle).split(' '), 'apoie', 'o', 'corre', 'PROMOÇÃO']}
			labelSize={17}
			relativeHeight={relativeScreenHeight(12)}
			shortDescription={
				userRange.betweenRange
					? promotionText
					: 'com uma assinatura mensal você alcança muito mais clientes e ajuda cidadãos do nosso país'
			}
			SvgIcon={LogoOutlinedWhiteIcon}
			svgIconScale={['65%', '65%']}
			leftSideColor={theme.colors.orange[3]}
			leftSideWidth={'25%'}
			onPress={onPress}
		/>
	)
}

export { SubscriptionButton }
