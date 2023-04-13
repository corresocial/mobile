import React from 'react'

import { ButtonsContainer, Container, Sigh } from './styles'
import { theme } from '../../../common/theme'
import HandOnMoneyWhiteIcon from '../../../assets/icons/handOnMoney-white.svg'
import ChatIcon from '../../../assets/icons/chatTabIconInactive.svg'

import { SaleValueType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { BackButton } from '../../_buttons/BackButton'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { ProgressBar } from '../../ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'

interface PaymentValueTypeProps {
	backgroundColor: string
	progress: [value: number, range: number]
	savePaymentValueType: (paymentType: SaleValueType) => void
	navigateBackwards: () => void
}

function PaymentValueType({ backgroundColor, progress, savePaymentValueType, navigateBackwards }: PaymentValueTypeProps) {
	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'tem preço fixo ou fica a combinar?'}
					highlightedWords={['preço', 'fixo', 'a', 'combinar']}
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
						label={'preço fixo'}
						highlightedWords={['fixo']}
						SecondSvgIcon={HandOnMoneyWhiteIcon}
						svgIconScale={['80%', '22%']}
						onPress={() => savePaymentValueType('fixed')}
					/>
					<Sigh />
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'a combinar'}
						highlightedWords={['combinar']}
						SecondSvgIcon={ChatIcon}
						svgIconScale={['35%', '18%']}
						onPress={() => savePaymentValueType('toMatch')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PaymentValueType }
