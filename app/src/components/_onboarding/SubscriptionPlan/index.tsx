import React, { JSXElementConstructor, ReactElement, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { SubscriptionPlan as SubscriptionPlantype } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { BackButton } from '../../_buttons/BackButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { TitleDescriptionButton } from '../../_cards/TitleDescriptionButton'
import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface SubscriptionPlanProps {
	backgroundColor: string
	headerFooterText: string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
	saveSubscriptionPlan: (subscriptionPlan: SubscriptionPlantype) => void
	navigateBackwards: () => void
}

function SubscriptionPlan({ backgroundColor, headerFooterText, saveSubscriptionPlan, navigateBackwards }: SubscriptionPlanProps) {
	const [planSelected, setPlanSelected] = useState<SubscriptionPlantype>()

	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(18)}
				centralized
				backgroundColor={theme.white3}
				footerText={headerFooterText}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'que tipo de assinatura você vai querer?'}
					highlightedWords={['assinatura']}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={backgroundColor}
			>
				<ButtonsContainer>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						activeColor={theme.orange1}
						title={'assinatura mensal'}
						description={'cobrado todo mês no seu cartão, cancele quando quiser'}
						highlightedWords={['assinatura', 'mensal', 'cancele', 'quando', 'quiser']}
						footerValue={'40'}
						selected={planSelected === 'monthly'}
						onPress={() => setPlanSelected('monthly')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						activeColor={theme.orange1}
						title={'assinatura anual'}
						description={'pagamento único com 20% de desconto'}
						highlightedWords={['assinatura', 'anual', '20%', 'de', 'desconto']}
						footerValue={'190'}
						yearly
						selected={planSelected === 'yearly'}
						onPress={() => setPlanSelected('yearly')}
					/>
					{
						planSelected && (
							<PrimaryButton
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={() => saveSubscriptionPlan(planSelected)}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SubscriptionPlan }
