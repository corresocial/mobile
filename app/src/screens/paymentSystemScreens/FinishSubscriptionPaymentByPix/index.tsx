import React, { useEffect, useState } from 'react'
import { Clipboard } from 'react-native'

import { theme } from '../../../common/theme'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, QRCodeArea, TimerArea, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import PixWhiteIcon from '../../../assets/icons/pix-white.svg'
import CopyWhiteIcon from '../../../assets/icons/copy-white.svg'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'

import { FinishSubscriptionPaymentByPixScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
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
import { Timer } from '../../../components/Timer'
import { CustomQRCode } from '../../../components/CustomQRCode'

function FinishSubscriptionPaymentByPix({ navigation }: FinishSubscriptionPaymentByPixScreenProps) {
	const postRange: PostRange | any = 'near' // Route or context // TODO Type
	const subscriptionPlan: SubscriptionPlan | any = 'monthly' // Route or context // TODO Type

	const [pixKey, setPixKey] = useState('https://corre.social')
	const [keyWasJustCopied, setKeyWasJustCopied] = useState(false)

	useEffect(() => {
		setPixKey('https://corre.social')
	})

	const copyToClipboard = () => {
		if (pixKey) {
			Clipboard.setString(pixKey)
			setKeyWasJustCopied(true)
			setTimeout(() => {
				setKeyWasJustCopied(false)
			}, 3000)
		}
	}

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

	const performPayment = () => {
		navigation.navigate('SubscriptionPaymentResult', { successfulPayment: false })
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
							SvgIcon={PixWhiteIcon}
							svgScale={['70%', '70%']}
							height={relativeScreenHeight(7)}
							relativeWidth={relativeScreenHeight(10)}
						/>
						<PaymentStatusText>{showMessageWithHighlight('pix copia e cola \naguardando pagamento', ['\naguardando', 'pagamento'])}</PaymentStatusText>
					</PaymentStatusArea>

					<TimerArea>
						<Timer
							initialTimeInMinutes={5}
							label={'tempo para pagar  - '}
							onTimeIsOver={() => console.log('O tempo acabou')}
						/>
					</TimerArea>

					<QRCodeArea>
						<CustomQRCode
							value={pixKey}
							keyWasJustCopied={keyWasJustCopied}
						/>
					</QRCodeArea>

					<PrimaryButton
						color={theme.green3}
						label={'copiar código'}
						highlightedWords={['copiar']}
						fontSize={18}
						labelColor={theme.white3}
						SecondSvgIcon={CopyWhiteIcon}
						onPress={copyToClipboard}
					/>
					<VerticalSigh />
					<PrimaryButton
						color={theme.white2}
						label={'como funciona?'}
						highlightedWords={['como', 'funciona']}
						SecondSvgIcon={QuestionMarkWhiteIcon}
						onPress={performPayment}
					/>
				</Body>
			</BodyScrollable>
		</Container >
	)
}

export { FinishSubscriptionPaymentByPix }
