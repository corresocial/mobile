import React, { useContext, useEffect, useState } from 'react'
import { Clipboard } from 'react-native'

import { sendEvent } from '@newutils/methods/analyticsEvents'

import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { FinishSubscriptionPaymentByPixScreenProps } from '@routes/Stack/UserStack/screenProps'

import { UiSubscriptionUtils } from '@utils-ui/subscription/UiSubscriptionUtils'

import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, QRCodeArea, TimerArea, Title, TitleArea } from './styles'
import CopyWhiteIcon from '@assets/icons/copy-white.svg'
import DollarWhiteIcon from '@assets/icons/dollar-white.svg'
import PixWhiteIcon from '@assets/icons/pix-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CustomQRCode } from '@components/CustomQRCode'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { Loader } from '@components/Loader'
import { SmallInstructionCard } from '@components/SmallInstructionCard'
import { Timer } from '@components/Timer'

const { getRangeSubscriptionLabelHighlighted } = UiSubscriptionUtils()

function FinishSubscriptionPaymentByPix({ route, navigation }: FinishSubscriptionPaymentByPixScreenProps) {
	const { subscriptionDataContext, updateUserSubscription } = useContext(SubscriptionContext)

	const { subscriptionRange, subscriptionPlan, subscriptionPaymentMethod } = subscriptionDataContext

	const defaultPixKeyExpiryTimeInMinutes = 5

	const [pixKey, setPixKey] = useState('https://corre.social')
	const [pixKeyExpiryTimeInMinutes, setPixKeyExpiryTimeInMinutes] = useState(defaultPixKeyExpiryTimeInMinutes)
	const [pixKeyHasExpired, setPixKeyHasExpired] = useState(true)
	const [resetTimer, setResetTimer] = useState(false)
	const [keyWasJustCopied, setKeyWasJustCopied] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

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

	const performSubscriptionPayment = async () => {
		try {
			setIsLoading(true)
			const userSubscription = {
				subscriptionRange,
				subscriptionPlan,
				subscriptionPaymentMethod
			}

			await updateUserSubscription(userSubscription)

			setIsLoading(false)
			sendEvent('user_subscribed', { subscriptionType: 'paid', subscriptionRange: subscriptionRange })
			navigation.navigate('SubscriptionPaymentResult', { successfulPayment: true, postReview: !!route.params?.postReview })
		} catch (err: any) { // Veirfy stripe erros
			console.log(err)
			setIsLoading(false)
			navigation.navigate('SubscriptionPaymentResult', { successfulPayment: false, postReview: !!route.params?.postReview })
		}
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.colors.orange[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={theme.colors.orange[2]}
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
					<SmallInstructionCard text={getRangeSubscriptionLabelHighlighted(subscriptionRange, subscriptionPlan)} />
					<VerticalSpacing />
					<SmallInstructionCard text={'r$ 20,00'} highlight />

					<PaymentStatusArea>
						<SmallButton
							color={theme.colors.green[3]}
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
						{
							isLoading
								? <Loader flex />
								: (
									<CustomQRCode
										value={pixKey}
										keyWasJustCopied={keyWasJustCopied}
									/>
								)

						}
					</QRCodeArea>

					<PrimaryButton
						color={theme.colors.green[3]}
						label={'copiar código'}
						highlightedWords={['copiar']}
						fontSize={18}
						labelColor={theme.colors.white[3]}
						SecondSvgIcon={CopyWhiteIcon}
						onPress={copyToClipboard}
					/>
					<VerticalSpacing />
					<PrimaryButton
						color={theme.colors.white[2]}
						label={'como funciona?'}
						highlightedWords={['como', 'funciona']}
						SecondSvgIcon={QuestionMarkWhiteIcon}
						onPress={performSubscriptionPayment}
					/>
				</Body>
			</BodyScrollable>
		</Container >
	)
}

export { FinishSubscriptionPaymentByPix }
