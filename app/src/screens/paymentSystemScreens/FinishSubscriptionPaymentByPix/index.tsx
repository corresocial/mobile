import React, { useContext, useEffect, useState } from 'react'
import { Clipboard } from 'react-native'

import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, QRCodeArea, TimerArea, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import PixWhiteIcon from '../../../assets/icons/pix-white.svg'
import CopyWhiteIcon from '../../../assets/icons/copy-white.svg'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { getRangeSubscriptionPlanText } from '../../../utils/subscription/commonMessages'

import { FinishSubscriptionPaymentByPixScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'
import { SmallInstructionCard } from '../../../components/SmallInstructionCard'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Timer } from '../../../components/Timer'
import { CustomQRCode } from '../../../components/CustomQRCode'

function FinishSubscriptionPaymentByPix({ navigation }: FinishSubscriptionPaymentByPixScreenProps) {
	const { subscriptionDataContext } = useContext(SubscriptionContext)

	const { postRange, subscriptionPlan } = subscriptionDataContext

	const defaultPixKeyExpiryTimeInMinutes = 5

	const [pixKey, setPixKey] = useState('https://corre.social')
	const [pixKeyExpiryTimeInMinutes, setPixKeyExpiryTimeInMinutes] = useState(defaultPixKeyExpiryTimeInMinutes)
	const [pixKeyHasExpired, setPixKeyHasExpired] = useState(true)
	const [resetTimer, setResetTimer] = useState(false)
	const [keyWasJustCopied, setKeyWasJustCopied] = useState(false)

	useEffect(() => {
		navigation.addListener('focus', () => {
			if (pixKeyHasExpired) {
				generateNewPixKey()
			}
		})
	}, [navigation])

	const generateNewPixKey = () => {
		console.log('Nova chave pix')
		setPixKey('https://corre.social')
		setPixKeyHasExpired(false)
		setPixKeyExpiryTimeInMinutes(defaultPixKeyExpiryTimeInMinutes)
		restartPixKeyExpiryTimer()
	}

	const restartPixKeyExpiryTimer = () => {
		setResetTimer(!resetTimer)
	}

	const copyToClipboard = () => {
		if (pixKey) {
			Clipboard.setString(pixKey)
			setKeyWasJustCopied(true)
			setTimeout(() => {
				setKeyWasJustCopied(false)
			}, 3000)
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
					<SmallInstructionCard text={getRangeSubscriptionPlanText(postRange, subscriptionPlan)} />
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
							initialTimeInMinutes={pixKeyExpiryTimeInMinutes}
							label={'tempo para pagar  - '}
							resetTimer={resetTimer}
							onTimeIsOver={generateNewPixKey}
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
