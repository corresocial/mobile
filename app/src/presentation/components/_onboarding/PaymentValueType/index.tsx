import React from 'react'

import { theme } from '../../../common/theme'
import HandOnMoneyWhiteIcon from '../../../assets/icons/handOnMoney-white.svg'
import ChatWhiteIcon from '../../../assets/icons/chat-white.svg'

import { SaleValueType } from '../../../../services/firebase/types'

import { PostSelectButton } from '../PostSelectButton'
import { OptionButton } from '../../_buttons/OptionButton'

interface PaymentValueTypeProps {
	backgroundColor: string
	itemsColor: string
	savePaymentValueType: (paymentType: SaleValueType) => void
	navigateBackwards: () => void
}

function PaymentValueType({ backgroundColor, itemsColor, savePaymentValueType, navigateBackwards }: PaymentValueTypeProps) {
	return (
		<PostSelectButton
			title={'tem preço fixo ou fica a combinar?'}
			highlightedWords={['preço', 'fixo', 'a', 'combinar']}
			headerBackgroundColor={backgroundColor}
			backgroundColor={theme.white3}
			navigateBackwards={navigateBackwards}
		>
			<OptionButton
				label={'preço fixo'}
				highlightedWords={['fixo']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={HandOnMoneyWhiteIcon}
				svgIconScale={['70%', '70%']}
				leftSideColor={itemsColor}
				leftSideWidth={'25%'}
				onPress={() => savePaymentValueType('fixed')}
			/>
			<OptionButton
				label={'a combinar'}
				highlightedWords={['combinar']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={ChatWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={itemsColor}
				leftSideWidth={'25%'}
				onPress={() => savePaymentValueType('toMatch')}
			/>
		</PostSelectButton>
	)
}

export { PaymentValueType }
