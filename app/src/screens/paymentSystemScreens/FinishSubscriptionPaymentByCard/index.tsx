import React, { useState, useRef, useEffect } from 'react'
import { cpf, cnpj } from 'cpf-cnpj-validator'

import { Keyboard, TextInput, View } from 'react-native'
import { theme } from '../../../common/theme'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

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
import { LineInput } from '../../../components/LineInput'

function FinishSubscriptionPaymentByCard({ navigation }: FinishSubscriptionPaymentByCardScreenProps) {
	const postRange: PostRange | any = 'near' // Route or context // TODO Type
	const subscriptionPlan: SubscriptionPlan | any = 'monthly' // Route or context // TODO Type

	const [cardNumber, setCardNumber] = useState('')
	const [cardExpiringDate, setCardExpiringDate] = useState('')
	const [cardCVV, setCardCVV] = useState('')
	const [cardholderName, setCardholderName] = useState('')
	const [holderDocumentNumber, setHolderDocumentNumber] = useState('')

	const [cardholderNameIsValid, setCardholderNameIsValid] = useState(false)
	const [keyboardOpened, setKeyboardOpened] = useState(false)

	const cardNumberRef = useRef<TextInput>(null)
	const cardExpiringDateRef = useRef<TextInput>(null)
	const cardCVVRef = useRef<TextInput>(null)
	const cardholderNameRef = useRef<TextInput>(null)
	const holderDocumentNumberRef = useRef<TextInput>(null)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const validation = validateCardHoldername(cardholderName)
		setCardholderNameIsValid(validation)
	}, [cardholderName, keyboardOpened])

	const validateCardNumber = (value: string) => {
		const cleanedValue = value.replace(/\s/g, '')
		if (/^\d{16}$/.test(cleanedValue)) {
			return true
		}
		return false
	}

	const validateCardExpiringDate = (value: string) => {
		if (/^(0[1-9]|1[0-2])\d{2}$/.test(value)) {
			return true
		}
		return false
	}

	const validateCardCVV = (value: string) => {
		if (/^\d{3,4}$/.test(value)) {
			return true
		}
		return false
	}

	const validateCardHoldername = (value: string) => {
		if (/^[a-zA-Z\s-]+$/.test(value)) {
			return true
		}
		return false
	}

	const validateHolderDocumentNumber = (value: string) => {
		const cleanedValue = value.replace(/\D/g, '')

		if (cleanedValue.length === 11) {
			return cpf.isValid(cleanedValue)
		}

		if (cleanedValue.length === 14) {
			return cnpj.isValid(cleanedValue)
		}

		return false
	}

	const performPayment = () => {
		navigation.navigate('SubscriptionPaymentResult', { successfulPayment: true })
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

	const isCardholderNameFocused = cardholderNameRef.current?.isFocused() ?? false

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
			<BodyScrollable >
				<Body >
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
					<LineInput
						value={cardNumber}
						relativeWidth={'100%'}
						textInputRef={cardNumberRef}
						nextInputRef={cardExpiringDateRef}
						defaultBackgroundColor={theme.white3}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.green1}
						validBorderBottomColor={theme.black4}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						fontSize={16}
						maxLength={16}
						placeholder={'número do cartão'}
						keyboardType={'numeric'}
						validateText={(text: string) => validateCardNumber(text)}
						onChangeText={(text: string) => setCardNumber(text)}
					/>
					<VerticalSigh />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<LineInput
							value={cardExpiringDate}
							relativeWidth={'45%'}
							textInputRef={cardExpiringDateRef}
							nextInputRef={cardCVVRef}
							defaultBackgroundColor={theme.white3}
							defaultBorderBottomColor={theme.black4}
							validBackgroundColor={theme.green1}
							validBorderBottomColor={theme.black4}
							invalidBackgroundColor={theme.red1}
							invalidBorderBottomColor={theme.red5}
							textAlign={'left'}
							fontSize={16}
							maxLength={4}
							placeholder={'validade'}
							keyboardType={'numeric'}
							validateText={(text: string) => validateCardExpiringDate(text)}
							onChangeText={(text: string) => setCardExpiringDate(text)}
						/>
						<LineInput
							value={cardCVV}
							relativeWidth={'45%'}
							textInputRef={cardCVVRef}
							nextInputRef={cardholderNameRef}
							defaultBackgroundColor={theme.white3}
							defaultBorderBottomColor={theme.black4}
							validBackgroundColor={theme.green1}
							validBorderBottomColor={theme.black4}
							invalidBackgroundColor={theme.red1}
							invalidBorderBottomColor={theme.red5}
							textAlign={'left'}
							fontSize={16}
							maxLength={3}
							placeholder={'CVV'}
							keyboardType={'numeric'}
							validateText={(text: string) => validateCardCVV(text)}
							onChangeText={(text: string) => setCardCVV(text)}
						/>
					</View>
					<VerticalSigh />
					<LineInput
						relativeWidth={'100%'}
						value={cardholderName}
						textInputRef={cardholderNameRef}
						nextInputRef={holderDocumentNumberRef}
						defaultBackgroundColor={theme.white3}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.green1}
						validBorderBottomColor={theme.black4}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						fontSize={16}
						placeholder={'nome do titular'}
						keyboardType={'default'}
						textIsValid={cardholderNameIsValid && !isCardholderNameFocused}
						// validateText={(text: string) => validateCardHoldername(text)}
						onChangeText={(text: string) => setCardholderName(text)}
					/>
					<VerticalSigh />
					<LineInput
						value={holderDocumentNumber}
						relativeWidth={'100%'}
						textInputRef={holderDocumentNumberRef}
						lastInput
						defaultBackgroundColor={theme.white3}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.green1}
						validBorderBottomColor={theme.black4}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						fontSize={16}
						maxLength={14}
						placeholder={'CPF/CNPJ do titular'}
						keyboardType={'numeric'}
						validateText={(text: string) => validateHolderDocumentNumber(text)}
						onChangeText={(text: string) => setHolderDocumentNumber(text)}
					/>
					<VerticalSigh height={relativeScreenHeight(5)} />
					<PrimaryButton
						color={theme.green3}
						label={'usar cartão'}
						highlightedWords={['cartão']}
						fontSize={18}
						labelColor={theme.white3}
						SecondSvgIcon={CardWhiteIcon}
						onPress={performPayment}
					/>
				</Body>
			</BodyScrollable>
		</Container >
	)
}

export { FinishSubscriptionPaymentByCard }
