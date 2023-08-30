import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import SalesCartWhiteIcon from '../../../assets/icons/salesCart-white.svg'
import ExchangeWhiteIcon from '../../../assets/icons/exchange-white.svg'
import CashWhiteIcon from '../../../assets/icons/cash-white.svg'

import { PaymentType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { BackButton } from '../../_buttons/BackButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { OptionButton } from '../../_buttons/OptionButton'

interface PaymentMethodProps {
	backgroundColor: string
	itemsColor: string
	customTitle?: string
	customHighlight?: string[]
	isVacancy?: boolean
	savePaymentMethod: (paymentType: PaymentType) => void
	navigateBackwards: () => void
}

function PaymentMethod({
	backgroundColor,
	itemsColor,
	customTitle,
	customHighlight,
	isVacancy,
	savePaymentMethod,
	navigateBackwards
}: PaymentMethodProps) {
	return (
		<Container>
			<StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(28)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={customTitle || 'você vende, aceita troca ou os dois ?'}
					highlightedWords={customHighlight || ['vende', 'aceita', 'troca', 'os', 'dois']}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
			>
				<ButtonsContainer>
					<OptionButton
						label={isVacancy ? 'um \npagamento' : 'somente \nvenda'}
						highlightedWords={isVacancy ? ['\npagamento'] : ['\nvenda']}
						labelSize={18}
						relativeHeight={'22%'}
						SvgIcon={isVacancy ? CashWhiteIcon : SalesCartWhiteIcon}
						svgIconScale={['55%', '55%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePaymentMethod('sale')}
					/>
					<OptionButton
						label={isVacancy ? 'uma \ntroca' : 'somente \ntroca'}
						highlightedWords={['\ntroca']}
						labelSize={18}
						relativeHeight={'22%'}
						SvgIcon={isVacancy ? ExchangeWhiteIcon : CashWhiteIcon}
						svgIconScale={['55%', '55%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePaymentMethod('exchange')}
					/>
					<OptionButton
						label={`${isVacancy ? 'pagamento' : 'venda'} \nou troca`}
						highlightedWords={['venda', 'troca', 'pagamento']}
						labelSize={18}
						relativeHeight={'23%'}
						SvgIcon={isVacancy ? CashWhiteIcon : SalesCartWhiteIcon}
						SecondSvgIcon={ExchangeWhiteIcon}
						svgIconScale={['45%', '55%']}
						leftSideColor={itemsColor}
						leftSideWidth={'25%'}
						onPress={() => savePaymentMethod('both')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PaymentMethod }
