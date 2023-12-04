import React from 'react'
import { StatusBar } from 'react-native'

import { PaymentType } from '@services/firebase/types'

import { ButtonsContainer, Container } from './styles'
import CashWhiteIcon from '@assets/icons/cash-white.svg'
import ExchangeWhiteIcon from '@assets/icons/exchange-white.svg'
import SalesCartWhiteIcon from '@assets/icons/salesCart-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'

import { BackButton } from '../../_buttons/BackButton'
import { OptionButton } from '../../_buttons/OptionButton'
import { SmallButton } from '../../_buttons/SmallButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { HorizontalSpacing } from '../../_space/HorizontalSpacing'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'

interface PaymentMethodProps {
	backgroundColor: string
	itemsColor: string
	customTitle?: string
	customHighlight?: string[]
	isVacancy?: boolean
	skipScreen?: () => void
	savePaymentMethod: (paymentType: PaymentType) => void
	navigateBackwards: () => void
}

function PaymentMethod({
	backgroundColor,
	itemsColor,
	customTitle,
	customHighlight,
	isVacancy,
	skipScreen,
	navigateBackwards,
	savePaymentMethod
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
				{
					skipScreen ? (
						<>
							<HorizontalSpacing />
							<SmallButton
								SvgIcon={TrashWhiteIcon}
								color={theme.red3}
								height={relativeScreenWidth(11)}
								relativeWidth={relativeScreenWidth(11)}
								svgScale={['60%', '60%']}
								onPress={skipScreen}
							/>
						</>
					)
						: <></>
				}
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
						svgIconScale={['70%', '70%']}
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
						svgIconScale={['45%', '70%']}
						secondSvgIconScale={['45%', '55%']}
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
