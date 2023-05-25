import React, { useState, useRef, useEffect, useContext } from 'react'
import { cpf, cnpj } from 'cpf-cnpj-validator'

import { Keyboard, TextInput, View } from 'react-native'
import { theme } from '../../../common/theme'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { getRangeSubscriptionPlanText } from '../../../utils/subscription/commonMessages'

import { FinishSubscriptionPaymentByCardScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

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
import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

function FinishSubscriptionPaymentByCard({ navigation }: FinishSubscriptionPaymentByCardScreenProps) {
	const { subscriptionDataContext } = useContext(SubscriptionContext)

	const { postRange, subscriptionPlan } = subscriptionDataContext

	const [cardNumber, setCardNumber] = useState('')
	const [cardExpiringDate, setCardExpiringDate] = useState('')
	const [cardCVV, setCardCVV] = useState('')
	const [cardholderName, setCardholderName] = useState('')
	const [holderDocumentNumber, setHolderDocumentNumber] = useState('')

	const [cardholderNameIsValid, setCardholderNameIsValid] = useState(false)
	const [isCardholderNameFocused, setIsCardholderNameFocused] = useState(false)

	const [keyboardOpened, setKeyboardOpened] = useState(false)

	const cardNumberRef = useRef<TextInput>(null)
	const cardExpiringDateRef = useRef<TextInput>(null)
	const cardCVVRef = useRef<TextInput>(null)
	const cardholderNameRef = useRef<TextInput | null>(null)
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

	const handleFocus = () => {
		setIsCardholderNameFocused(true)
	}

	const handleBlur = () => {
		setIsCardholderNameFocused(false)
	}

	const validateCardNumber = (value: string) => {
		const cleanedValue = value.replace(/\s/g, '')
		if (/^\d{16}$/.test(cleanedValue)) {
			return true
		}
		return false
	}

	const validateCardExpiringDate = (value: string) => {
		if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
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

	const cardDataAreValid = () => {
		const isCardNumberValid = validateCardNumber(cardNumber)
		const isCardExpiringDateValid = validateCardExpiringDate(cardExpiringDate)
		const isCardCVVValid = validateCardCVV(cardCVV)
		const isCardholderNameValid = validateCardHoldername(cardholderName)
		const isHolderDocumentNumberValid = validateHolderDocumentNumber(holderDocumentNumber)

		return (
			isCardNumberValid
			&& isCardExpiringDateValid
			&& isCardCVVValid
			&& isCardholderNameValid
			&& isHolderDocumentNumberValid
		)
	}

	const performPayment = () => {
		console.log({
			cardNumber,
			cardExpiringDate,
			cardCVV,
			cardholderName,
			holderDocumentNumber
		})

		if (cardDataAreValid()) {
			navigation.navigate('SubscriptionPaymentResult', { successfulPayment: true })
		}

		console.log('invalid data')
	}

	const applyCardExpiringDateMask = (text: string) => {
		const cleanedText = text.replace(/\D/g, '')

		let maskedText = cleanedText
		if (cleanedText.length > 2) {
			maskedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`
		}

		setCardExpiringDate(maskedText)
	}

	const renderPaymentStatus = () => {
		return showMessageWithHighlight(
			`adicionar \ncartão de ${subscriptionDataContext.subscriptionPaymentMethod === 'creditCard'
				? 'crédito'
				: 'débito'}`,
			['adicionar']
		)
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
			<BodyScrollable >
				<Body >
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
							SvgIcon={CardWhiteIcon}
							svgScale={['60%', '60%']}
							height={relativeScreenHeight(7)}
							relativeWidth={relativeScreenHeight(10)}
						/>
						<PaymentStatusText>{renderPaymentStatus()}</PaymentStatusText>
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
							maxLength={5}
							placeholder={'validade'}
							keyboardType={'numeric'}
							validateText={(text: string) => validateCardExpiringDate(text)}
							onChangeText={(text: string) => applyCardExpiringDateMask(text)}
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
						textIsValid={cardholderNameIsValid && ((!keyboardOpened && !isCardholderNameFocused) || (keyboardOpened && isCardholderNameFocused))}
						onChangeText={(text: string) => setCardholderName(text)}
						onFocus={handleFocus}
						onBlur={handleBlur}
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
