import React from 'react'

import { theme } from '../../../common/theme'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

import { FinishSubscriptionPaymentByCardScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { PostRange, SubscriptionPlan } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'
import { SmallInstructionCard } from '../../../components/SmallInstructionCard'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'

function FinishSubscriptionPaymentByCard({ navigation }: FinishSubscriptionPaymentByCardScreenProps) {
	const postRange: PostRange | any = 'near' // Route or context // TODO Type
	const subscriptionPlan: SubscriptionPlan | any = 'monthly' // Route or context // TODO Type

	const getRelativePostRangeText = () => {
		const subscriptionPlanText = getRelativeSubscriptionPlanText()
		switch (postRange) {
			case 'near': return showMessageWithHighlight(`plano região${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['região', subscriptionPlanText])
			case 'city': return showMessageWithHighlight(`plano cidade${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['cidade', subscriptionPlanText])
			case 'country': return showMessageWithHighlight(`plano país${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['país', subscriptionPlanText])
			default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
		}
	}

	const getRelativeSubscriptionPlanText = () => {
		switch (subscriptionPlan) {
			case 'monthly': return 'mensal'
			case 'yearly': return 'anual'
			default: return ''
		}
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={theme.orange2}
				relativeHeight={relativeScreenHeight(16)}
				centralized
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					message={'finalizar compra'}
					highlightedWords={['finalizar']}
					fontSize={20}
				/>
			</DefaultHeaderContainer>
			<BodyScrollable>
				<Body>
					<TitleArea>
						<DollarWhiteIcon width={30} height={30} />
						<Title>{showMessageWithHighlight('resumo de valores', ['resumo'])}</Title>
					</TitleArea>
					<SmallInstructionCard text={getRelativePostRangeText()} />
					<VerticalSigh />
					<SmallInstructionCard text={'r$ 20,00'} highlight />

					<PaymentStatusArea>
						<SmallButton
							color={theme.green3}
							onPress={() => { }}
							SvgIcon={CardWhiteIcon}
							svgScale={['60%', '60%']}
							height={relativeScreenHeight(7)}
							relativeWidth={relativeScreenHeight(10)}
						/>
						<PaymentStatusText>{showMessageWithHighlight('adicionar \ncartão de crédito', ['adicionar'])}</PaymentStatusText>
					</PaymentStatusArea>
					<VerticalSigh height={350} />
					{/* Remove */}
					<PrimaryButton
						color={theme.green3}
						label={'usar cartão'}
						highlightedWords={['cartão']}
						fontSize={18}
						labelColor={theme.white3}
						SecondSvgIcon={CardWhiteIcon}
						onPress={() => { }}
					/>
				</Body>
			</BodyScrollable>
		</Container >
	)
}

export { FinishSubscriptionPaymentByCard }
