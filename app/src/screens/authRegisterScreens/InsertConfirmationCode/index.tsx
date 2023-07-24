import { Alert, Animated, Platform, StatusBar, TextInput } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { UserCredential } from 'firebase/auth'

import { ButtonContainer, Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'

import { InsertConfirmationCodeScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'
import { UserIdentification } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { Loader } from '../../../components/Loader'

function InsertConfirmationCode({ navigation, route }: InsertConfirmationCodeScreenProps) {
	const { validateVerificationCode, setRemoteUserOnLocal } = useContext(AuthContext)

	const [inputCode01, setInputCode01] = useState<string>('')
	const [inputCode02, setInputCode02] = useState<string>('')
	const [inputCode03, setInputCode03] = useState<string>('')
	const [inputCode04, setInputCode04] = useState<string>('')
	const [inputCode05, setInputCode05] = useState<string>('')
	const [inputCode06, setInputCode06] = useState<string>('')

	const [invalidCodeAfterSubmit, setInvaliCodeAfterSubmit] = useState<boolean>(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const inputRefs = {
		inputCodeRef01: useRef<TextInput>(null),
		inputCodeRef02: useRef<TextInput>(null),
		inputCodeRef03: useRef<TextInput>(null),
		inputCodeRef04: useRef<TextInput>(null),
		inputCodeRef05: useRef<TextInput>(null),
		inputCodeRef06: useRef<TextInput>(null)
	}

	const inputsConfig = [
		{
			key: 'ic01',
			field: inputCode01,
			set: setInputCode01,
			ref: inputRefs.inputCodeRef01
		},
		{
			key: 'ic02',
			field: inputCode02,
			set: setInputCode02,
			ref: inputRefs.inputCodeRef02
		},
		{
			key: 'ic03',
			field: inputCode03,
			set: setInputCode03,
			ref: inputRefs.inputCodeRef03
		},
		{
			key: 'ic04',
			field: inputCode04,
			set: setInputCode04,
			ref: inputRefs.inputCodeRef04
		},
		{
			key: 'ic05',
			field: inputCode05,
			set: setInputCode05,
			ref: inputRefs.inputCodeRef05
		},
		{
			key: 'ic06',
			field: inputCode06,
			set: setInputCode06,
			ref: inputRefs.inputCodeRef06
		},
	]

	const headerMessages = {
		instruction: {
			text: 'passa o código que\nte mandamos aí',
			highlightedWords: ['código']
		},
		clientSideError: {
			text: 'opa! parece que o \ncódigo tá errado',
			highlightedWords: ['\ncódigo', 'tá', 'errado']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado,']
		}
	}

	const validateCode = (text: string) => {
		const isValid = text.length === 1
		if (isValid) {
			setInvaliCodeAfterSubmit(false)
			return true
		}
		return false
	}

	const sendConfirmationCode = () => {
		try {
			setIsLoading(true)

			const completeCode = mergeAllInputCodes()
			const completeCodeIsValid = completeCode.length === 6

			if (completeCodeIsValid) {
				const { cellNumber } = route.params
				const verificationCodeId = route.params.verificationCodeId as string

				validateVerificationCode(verificationCodeId, completeCode)
					.then(async (userCredential: UserCredential) => {
						const userIdentification = await extractUserIdentification(userCredential)
						await setRemoteUserOnLocal(userIdentification.uid)
						return userIdentification
					})
					.then((userIdentification) => {
						setIsLoading(false)
						navigation.navigate('InsertName', {
							cellNumber,
							userIdentification
						})
					})
			} else {
				!completeCodeIsValid && setInvaliCodeAfterSubmit(true)
			}
		} catch (error: any) {
			setIsLoading(false)
			console.log(error.code)
			verificationCodeErrorTreatment(error.code)
		}
	}

	const verificationCodeErrorTreatment = (errorCode: string) => {
		if (errorCode === 'auth/code-expired') {
			Alert.alert('ops!', 'Seu código de verificação expirou, solicite novamente', [
				{
					text: 'OK', onPress: () => navigation.goBack()
				}
			])
		}
		if (errorCode === 'auth/invalid-verification-code') {
			setInvaliCodeAfterSubmit(true)
		} else {
			setHasServerSideError(true)
		}
	}

	const extractUserIdentification = async ({ user }: UserCredential) => {
		const userIdentification: UserIdentification = {
			uid: user.uid,
			authTime: (await user.getIdTokenResult()).authTime,
			accessToken: (await user.getIdTokenResult()).token,
			tokenExpirationTime: (await user.getIdTokenResult()).expirationTime,
			refreshToken: user.refreshToken
		}

		return userIdentification
	}

	const allInputCodesIsValid = () => {
		const inputCodeLength = mergeAllInputCodes().length || 0
		return inputCodeLength === 6
	}

	const mergeAllInputCodes = () => inputsConfig.reduce((amount, current) => amount + current.field, '')

	const someInvalidFieldSubimitted = () => invalidCodeAfterSubmit

	const getHeaderMessage = () => {
		if (someInvalidFieldSubimitted()) return headerMessages.clientSideError.text
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (someInvalidFieldSubimitted()) return headerMessages.clientSideError.highlightedWords
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = someInvalidFieldSubimitted() || hasServerSideError

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.blue2, theme.red2],
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<StatusBar backgroundColor={someInvalidFieldSubimitted() || hasServerSideError ? theme.red2 : theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionCard
					message={getHeaderMessage()}
					highlightedWords={getHeaderHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					{
						inputsConfig.map((inputConfig, index) => {
							const isFirstInput = index === 0
							const isLastInput = index === inputsConfig.length - 1 && true
							return (
								<LineInput
									key={inputConfig.key}
									value={inputConfig.field}
									relativeWidth={'14%'}
									textInputRef={inputConfig.ref}
									lastInput={isLastInput}
									previousInputRef={isLastInput ? null : !isFirstInput && inputsConfig[index - 1].ref}
									nextInputRef={!isLastInput && inputsConfig[index + 1].ref}
									defaultBackgroundColor={theme.white2}
									defaultBorderBottomColor={theme.black4}
									validBackgroundColor={theme.blue1}
									validBorderBottomColor={theme.blue5}
									invalidBackgroundColor={theme.red1}
									invalidBorderBottomColor={theme.red5}
									maxLength={1}
									invalidTextAfterSubmit={invalidCodeAfterSubmit}
									placeholder={'0'}
									keyboardType={'decimal-pad'}
									selectTextOnFocus
									error={hasServerSideError}
									filterText={filterLeavingOnlyNumbers}
									validateText={(text: string) => validateCode(text)}
									onChangeText={(text: string) => inputConfig.set(text)}
								/>
							)
						})
					}
				</InputsContainer>
				<ButtonContainer>
					{
						isLoading
							? <Loader />
							: allInputCodesIsValid() && (
								<PrimaryButton
									color={someInvalidFieldSubimitted() || hasServerSideError ? theme.red3 : theme.blue3}
									flexDirection={'row-reverse'}
									SvgIcon={CheckWhiteIcon}
									labelColor={theme.white3}
									label={'continuar'}
									highlightedWords={['continuar']}
									startsHidden
									onPress={sendConfirmationCode}
								/>
							)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertConfirmationCode }
