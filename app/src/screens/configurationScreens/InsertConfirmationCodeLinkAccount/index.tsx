import { Animated, Platform, StatusBar, TextInput } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { RFValue } from 'react-native-responsive-fontsize'
import { ButtonContainer, Container, InputsContainer, InstructionButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'

import { InsertConfirmationCodeLinkAccountScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { Loader } from '../../../components/Loader'
import { BackButton } from '../../../components/_buttons/BackButton'
import { Id } from '../../../services/firebase/types'
import Firebase from '../../../services/firebase'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { linkAuthProvider } from '../../../services/firebase/user/linkAuthProvider'
import { updateUserPrivateData } from '../../../services/firebase/user/updateUserPrivateData'
import { getPhoneAuthCredential } from '../../../services/firebase/user/getPhoneAuthCredential'
import { DefaultInput } from '../../../components/_inputs/DefaultInput'

function InsertConfirmationCodeLinkAccount({ navigation, route }: InsertConfirmationCodeLinkAccountScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const recaptchaVerifier = React.useRef(null)
	const firebaseConfig = Firebase ? Firebase.options : undefined

	const [inputCode01, setInputCode01] = useState<string>('')
	const [inputCode02, setInputCode02] = useState<string>('')
	const [inputCode03, setInputCode03] = useState<string>('')
	const [inputCode04, setInputCode04] = useState<string>('')
	const [inputCode05, setInputCode05] = useState<string>('')
	const [inputCode06, setInputCode06] = useState<string>('')

	const [invalidCodeAfterSubmit, setInvalidCodeAfterSubmit] = useState<boolean>(false)
	const [expiredCodeAfterSubmit, setExpiredCodeAfterSubmit] = useState<boolean>(false)
	const [insertedCodeIsValid, setInsertedCodeIsValid] = useState<boolean>(false)
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
			text: 'passa o código SMS que\nte mandamos no número:',
			highlightedWords: ['código', 'SMS']
		},
		clientSideError: {
			text: 'opa! parece que o \ncódigo tá errado',
			highlightedWords: ['\ncódigo', 'tá', 'errado']
		},
		serverSideError: {
			expired: {
				text: 'opa! parece que o código expirou',
				highlightedWords: ['código', 'expirou']
			},
			invalid: {
				text: 'opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
				highlightedWords: ['do', 'nosso', 'lado,']
			}
		}
	}

	useEffect(() => {
		const validation = allInputCodesIsValid()
		setInsertedCodeIsValid(validation)
	}, [expiredCodeAfterSubmit])

	const validateCode = (text: string) => {
		const isValid = text.length === 1
		if (isValid) {
			setInvalidCodeAfterSubmit(false)
			setExpiredCodeAfterSubmit(false)
			return true
		}
		return false
	}

	const sendConfirmationCode = async () => {
		try {
			setIsLoading(true)

			const completeCode = mergeAllInputCodes()
			const completeCodeIsValid = completeCode.length === 6

			if (completeCodeIsValid) {
				const { cellNumber } = route.params
				const verificationCodeId = route.params.verificationCodeId as string

				const phoneAuthCredential = await getPhoneAuthCredential(verificationCodeId, completeCode)

				const linkedUser = await linkAuthProvider(phoneAuthCredential)
				if (!linkedUser) throw new Error('Houve algum erro ao vincular')
				await updateUserPrivateData({ cellNumber: cellNumber || '' }, userDataContext.userId as Id, 'contacts')

				navigateToLinkResultScreen(true, cellNumber)
			} else {
				!completeCodeIsValid && setInvalidCodeAfterSubmit(true)
			}
		} catch (error: any) {
			console.log(error.code)
			verificationCodeErrorTreatment(error.code)
		} finally {
			setIsLoading(false)
		}
	}

	const verificationCodeErrorTreatment = (errorCode: string) => {
		console.log(errorCode)
		if (errorCode === 'auth/code-expired') {
			return setExpiredCodeAfterSubmit(true)
		}
		if (errorCode === 'auth/invalid-verification-code') {
			return setInvalidCodeAfterSubmit(true)
		}
		if (errorCode === 'auth/invalid-verification-id') {
			return setInvalidCodeAfterSubmit(true)
		}
		setHasServerSideError(true)
	}

	const navigateToLinkResultScreen = (wasLinked: boolean, accountIdentifier?: string | null) => {
		navigation.navigate('LinkingAccountResult', { accountIdentifier, wasLinked })
	}

	const allInputCodesIsValid = () => {
		const inputCodeLength = mergeAllInputCodes().length || 0
		return inputCodeLength === 6
	}

	const mergeAllInputCodes = () => inputsConfig.reduce((amount, current) => amount + current.field, '')

	const someInvalidFieldSubimitted = () => invalidCodeAfterSubmit || expiredCodeAfterSubmit

	const getHeaderMessage = () => {
		if (hasServerSideError && expiredCodeAfterSubmit) return headerMessages.serverSideError.expired.text
		if (hasServerSideError && invalidCodeAfterSubmit) return headerMessages.serverSideError.invalid.text
		if (someInvalidFieldSubimitted()) return headerMessages.clientSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError && expiredCodeAfterSubmit) return headerMessages.serverSideError.expired.highlightedWords
		if (hasServerSideError && invalidCodeAfterSubmit) return headerMessages.serverSideError.invalid.highlightedWords
		if (someInvalidFieldSubimitted()) return headerMessages.clientSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const getRelativeHeaderErrorStyle = () => {
		if (expiredCodeAfterSubmit) return theme.yellow2
		if (invalidCodeAfterSubmit) return theme.red2
		return theme.orange2
	}

	const getRelativeInputErrorStyle = () => {
		if (expiredCodeAfterSubmit) return theme.yellow1
		if (invalidCodeAfterSubmit) return theme.red1
		return theme.orange1
	}

	const getFormatedCellNumber = () => {
		const numbetWithoutCountryCode = route.params.cellNumber.slice(3)
		const numberWithDDDSpace = `${numbetWithoutCountryCode.slice(0, 2)} ${numbetWithoutCountryCode.slice(2)}`
		return numberWithDDDSpace
	}

	const navigateBackwards = () => navigation.goBack()

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
			outputRange: [theme.orange2, getRelativeHeaderErrorStyle()],
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<StatusBar backgroundColor={someInvalidFieldSubimitted() || hasServerSideError ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
				languageCode={'pt-BR'}
				attemptInvisibleVerification
			/>
			<DefaultHeaderContainer
				flexDirection={'column'}
				relativeHeight={'55%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionButtonContainer>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						message={getHeaderMessage()}
						highlightedWords={getHeaderHighlightedWords()}
						fontSize={16}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft>
					<InstructionCard
						fontSize={16}
						borderLeftWidth={RFValue(4)}
						message={getFormatedCellNumber()}
						highlightedWords={getFormatedCellNumber().split(' ')}

					>
						{/* <SmartphoneWhiteIcon width={50} height={50} /> */}
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer >
				<InputsContainer>
					{
						inputsConfig.map((inputConfig, index) => {
							const isFirstInput = index === 0
							const isLastInput = index === inputsConfig.length - 1 && true
							return (
								<DefaultInput
									key={inputConfig.key}
									value={inputConfig.field}
									relativeWidth={'14%'}
									textInputRef={inputConfig.ref}
									lastInput={isLastInput}
									fontSize={17}
									hasMultipleInputs
									previousInputRef={isLastInput ? null : !isFirstInput && inputsConfig[index - 1].ref}
									nextInputRef={!isLastInput && inputsConfig[index + 1].ref}
									defaultBackgroundColor={theme.white2}
									validBackgroundColor={theme.orange1}
									invalidBackgroundColor={getRelativeInputErrorStyle()}
									maxLength={1}
									textIsValid={insertedCodeIsValid}
									invalidTextAfterSubmit={invalidCodeAfterSubmit || expiredCodeAfterSubmit}
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
							: allInputCodesIsValid() && !expiredCodeAfterSubmit && (
								<PrimaryButton
									color={theme.green3}
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
		</Container >
	)
}

export { InsertConfirmationCodeLinkAccount }
