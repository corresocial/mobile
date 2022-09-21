import { Alert, Animated } from 'react-native';
import React, { useContext, useRef, useState } from 'react'


import { Container, InputsContainer } from './styles';
import { theme } from '../../common/theme';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Firebase from '../../services/Firebase/Firebase';
const firebaseConfig = Firebase ? Firebase.options : undefined;
import { AuthContext } from '../../contexts/AuthContext';

import { filterLeavingOnlyNumbers } from '../../common/auxiliaryFunctions';
import { InsertPhoneScreenProps } from '../../routes/Stack/stackScreenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';

export function InsertPhone({ navigation }: InsertPhoneScreenProps) {

	const { sendSMS } = useContext(AuthContext);
	const recaptchaVerifier = React.useRef(null);

	const [DDD, setDDD] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidPhoneAfterSubmit, setInvalidPhoneAfterSubmit] = useState<boolean>(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const inputRefs = {
		DDDInput: useRef<React.MutableRefObject<any>>(null),
		phoneInput: useRef<React.MutableRefObject<any>>(null)
	}

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

	const validateDDD = (text: string) => {
		setHasServerSideError(false)

		const isValid = text.length == 2
		if (isValid) {
			setInvalidDDDAfterSubmit(false)
			return true
		}
		return false
	}

	const validatePhone = (text: string) => {
		setHasServerSideError(false)

		const isValid = text.length == 9
		if (isValid) {
			setInvalidPhoneAfterSubmit(false)
			return true
		}
		return false
	}

	const someInvalidFieldSubimitted = () => {
		return invalidDDDAfterSubmit || invalidPhoneAfterSubmit
	}

	const getVeficationCode = async () => {
		const DDDIsValid = validateDDD(DDD)
		const phoneIsValid = validatePhone(phone)

		const completePhone = `+55${DDD}${phone}`

		if (DDDIsValid && phoneIsValid) {
			await sendSMS(completePhone, recaptchaVerifier.current) 
				.then(verificationCodeId => {
					return navigation.navigate('InsertConfirmationCode', { userPhone: completePhone, verificationCodeId: verificationCodeId })
				})
				.catch((err) => {
					console.log(err)
					setHasServerSideError(true)
				})
		} else {
			!DDDIsValid && setInvalidDDDAfterSubmit(true)
			!phoneIsValid && setInvalidPhoneAfterSubmit(true)
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
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
				languageCode="pt-BR"
				attemptInvisibleVerification
			/>
			<DefaultHeaderContainer
				relativeHeight='55%'
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
						nextInputRef={inputRefs.phoneInput}
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
						value={phone}
						relativeWidth={'77%'}
						textInputRef={inputRefs.phoneInput}
						previousInputRef={inputRefs.DDDInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.purple1}
						validBorderBottomColor={theme.purple5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={9}
						invalidTextAfterSubmit={invalidPhoneAfterSubmit}
						placeholder={'123451234'}
						keyboardType={'decimal-pad'}
						error={hasServerSideError}
						lastInput={true}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validatePhone(text)}
						onChangeText={(text: string) => setPhone(text)}
					/>
				</InputsContainer>
				<PrimaryButton
					color={someInvalidFieldSubimitted() || hasServerSideError ? theme.red3 : theme.purple3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='continuar'
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					onPress={getVeficationCode}
				/>
			</FormContainer>
		</Container>
	);
}