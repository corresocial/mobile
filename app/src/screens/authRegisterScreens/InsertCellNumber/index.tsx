import { Animated, StatusBar } from 'react-native'
import React, { useContext, useRef, useState } from 'react'

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'

import Firebase from '../../../services/firebase'
import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'

import { InsertCellNumberScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'

const firebaseConfig = Firebase ? Firebase.options : undefined

const headerMessages = {
	instruction: {
		text: 'passa o seu telefone aí pra gente',
		highlightedWords: ['telefone']
	},
	clientSideError: {
		text: 'ih, parece que o seu telefone não é válido',
		highlightedWords: ['telefone', 'não', 'é', 'válido']
	},
	serverSideError: {
		text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
		highlightedWords: ['do', 'nosso', 'lado,']
	}
}

export function InsertCellNumber({ navigation }: InsertCellNumberScreenProps) {
	const { sendSMS } = useContext(AuthContext)

	const recaptchaVerifier = React.useRef(null)

	const [DDD, setDDD] = useState<string>('')
	const [cellNumber, setCellNumber] = useState<string>('')
	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidCellNumberAfterSubmit, setInvalidCellNumberAfterSubmit] = useState<boolean>(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const inputRefs = {
		DDDInput: useRef<React.MutableRefObject<any>>(null),
		cellNumberInput: useRef<React.MutableRefObject<any>>(null)
	}

	const validateDDD = (text: string) => {
		setHasServerSideError(false)

		const isValid = text.length === 2
		if (isValid) {
			setInvalidDDDAfterSubmit(false)
			return true
		}
		return false
	}

	const validateCellNumber = (text: string) => {
		setHasServerSideError(false)

		const isValid = text.length === 9
		if (isValid) {
			setInvalidCellNumberAfterSubmit(false)
			return true
		}
		return false
	}

	const someInvalidFieldSubimitted = () => invalidDDDAfterSubmit || invalidCellNumberAfterSubmit

	const getVeficationCode = async () => {
		const DDDIsValid = validateDDD(DDD)
		const cellNumberIsValid = validateCellNumber(cellNumber)

		const completeCellNumber = `+55${DDD}${cellNumber}`

		if (DDDIsValid && cellNumberIsValid) {
			await sendSMS(completeCellNumber, recaptchaVerifier.current)
				.then((verificationCodeId) => {
					/* setUserDataOnContext({
						cellNumber: completeCellNumber, verificationCodeId
					}) */
					navigation.navigate('InsertConfirmationCode', {
						cellNumber: completeCellNumber, verificationCodeId
					})
				})
				.catch((err) => {
					console.log(err)
					setHasServerSideError(true)
				})
		} else {
			!DDDIsValid && setInvalidDDDAfterSubmit(true)
			!cellNumberIsValid && setInvalidCellNumberAfterSubmit(true)
		}
	}

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
			outputRange: [theme.purple2, theme.red2],
		})
	}

	return (
		<Container >
			<StatusBar backgroundColor={someInvalidFieldSubimitted() || hasServerSideError ? theme.red2 : theme.purple2} barStyle={'dark-content'} />
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
				languageCode={'pt-BR'}
				attemptInvisibleVerification
			/>
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
					<LineInput
						value={DDD}
						relativeWidth={'18%'}
						textInputRef={inputRefs.DDDInput}
						nextInputRef={inputRefs.cellNumberInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.purple1}
						validBorderBottomColor={theme.purple5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						invalidTextAfterSubmit={invalidDDDAfterSubmit}
						placeholder={'12'}
						keyboardType={'decimal-pad'}
						error={hasServerSideError}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateDDD(text)}
						onChangeText={(text: string) => setDDD(text)}
					/>
					<LineInput
						value={cellNumber}
						relativeWidth={'77%'}
						textInputRef={inputRefs.cellNumberInput}
						previousInputRef={inputRefs.DDDInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.purple1}
						validBorderBottomColor={theme.purple5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={9}
						invalidTextAfterSubmit={invalidCellNumberAfterSubmit}
						placeholder={'123451234'}
						keyboardType={'decimal-pad'}
						error={hasServerSideError}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateCellNumber(text)}
						onChangeText={(text: string) => setCellNumber(text)}
					/>
				</InputsContainer>
				<PrimaryButton
					color={someInvalidFieldSubimitted() || hasServerSideError ? theme.red3 : theme.purple3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label={'continuar'}
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					startsHidden
					onPress={getVeficationCode}
				/>
			</FormContainer>
		</Container>
	)
}
