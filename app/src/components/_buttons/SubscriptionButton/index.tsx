import React from 'react'

import { useTheme } from 'styled-components/native'
import LogoOutlinedWhiteIcon from '../../../assets/icons/logo-outlined.svg'
import { OptionButton } from '../OptionButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface SubscriptionButtonProps {
	onPress: () => void
}

function SubscriptionButton({ onPress }: SubscriptionButtonProps) {
	const theme = useTheme()

	return (
		<OptionButton
			color={theme.white3}
			label={'apoie o corre.'}
			highlightedWords={['apoie', 'o', 'corre']}
			labelSize={18}
			relativeHeight={relativeScreenHeight(12)}
			shortDescription={'com uma assinatura mensal você alcança muito mais clientes e ajuda cidadãos do nosso país'}
			SvgIcon={LogoOutlinedWhiteIcon}
			svgIconScale={['65%', '65%']}
			leftSideColor={theme.pink3}
			leftSideWidth={'25%'}
			onPress={onPress}
		/>
	)
}

export { SubscriptionButton }
