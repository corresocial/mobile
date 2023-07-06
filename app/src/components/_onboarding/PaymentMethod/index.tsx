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
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { ProgressBar } from '../../ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface PaymentMethodProps {
	backgroundColor: string
	customTitle?: string
	customHighlight?: string[]
	isVacancy?: boolean
	progress: [value: number, range: number]
	savePaymentMethod: (paymentType: PaymentType) => void
	navigateBackwards: () => void
}

function PaymentMethod({
	backgroundColor,
	customTitle,
	customHighlight,
	isVacancy,
	progress,
	savePaymentMethod,
	navigateBackwards
}: PaymentMethodProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={customTitle || 'você vende, aceita troca ou os dois ?'}
					highlightedWords={customHighlight || ['vende', 'aceita', 'troca', 'os', 'dois']}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={backgroundColor}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={isVacancy ? 'um pagamento' : 'somente venda'}
						highlightedWords={['venda', 'pagamento']}
						SecondSvgIcon={isVacancy ? CashWhiteIcon : SalesCartWhiteIcon}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentMethod('sale')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={isVacancy ? 'uma troca' : 'somente troca'}
						highlightedWords={['troca']}
						SecondSvgIcon={ExchangeWhiteIcon}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentMethod('exchange')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={`${isVacancy ? 'pagamento' : 'venda'} \nou troca`}
						highlightedWords={['venda', 'troca', 'pagamento']}
						SvgIcon={ExchangeWhiteIcon}
						SecondSvgIcon={isVacancy ? CashWhiteIcon : SalesCartWhiteIcon}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentMethod('both')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PaymentMethod }
