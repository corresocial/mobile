import React, { useRef, useState } from 'react'
import { StatusBar, Platform, TextInput } from 'react-native'

import { useUserDomain } from '@domain/user/useUserDomain'

import { InsertCellNumberLinkAccountScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import Firebase from '@infrastructure/firebase/index'
import { useAuthenticationService } from '@services/authentication/useAuthenticationService'
import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'

import { Container, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { CustomRecaptchaModal } from '@components/_modals/RecaptchaFirebaseModal'
import { SocialLoginAlertModal } from '@components/_modals/SocialLoginAlertModal'
import { Loader } from '@components/Loader'

const { requestPhoneVerificationCode } = useUserDomain()

const { checkUserPhoneAlreadyRegistredCloud } = useCloudFunctionService()

const firebaseConfig = Firebase ? Firebase.options : undefined

const headerMessages = {
	instruction: {
		text: 'passa o seu telefone aí pra gente',
		highlightedWords: ['telefone']
	},
	requestLimits: {
		text: 'ih! parece que você solicitou um código muitas vezes. \n\ntente novamente \nem alguns instantantes',
		highlightedWords: ['parece', 'que', 'você', 'solicitou', 'um', 'código', 'muitas', 'vezes']
	},
	clientSideError: {
		text: 'ih, parece que o seu telefone não é válido',
		highlightedWords: ['telefone', 'não', 'é', 'válido']
	},
	serverSideError: {
		text: 'ih! algo deu errado por aqui \n\ntente novamente \nem alguns instantantes',
		highlightedWords: ['algo', 'deu', 'errado', 'por', 'aqui']
	}
}

export function InsertCellNumberLinkAccount({ route, navigation }: InsertCellNumberLinkAccountScreenProps) {
	const recaptchaVerifier = React.useRef(null)

	const [DDD, setDDD] = useState<string>('')
	const [cellNumber, setCellNumber] = useState<string>('')
	const [completeCellNumber, setCompleteCellNumber] = useState<string>('')

	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidCellNumberAfterSubmit, setInvalidCellNumberAfterSubmit] = useState<boolean>(false)
	const [loginAlertModalIsVisible, setLoginAlertModalIsVisible] = React.useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)
	const [requestLimitsAlert, setRequestLimitsAlert] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const inputRefs = {
		DDDInput: useRef<TextInput>(null),
		cellNumberInput: useRef<TextInput>(null)
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
		try {
			setRequestLimitsAlert(false)
			setIsLoading(true)

			const DDDIsValid = validateDDD(DDD)
			const cellNumberIsValid = validateCellNumber(cellNumber)

			const fullCellNumber = `+55${DDD}${cellNumber}`

			if (DDDIsValid && cellNumberIsValid) {
				setCompleteCellNumber(fullCellNumber)
				const phoneAlreadyRegistred = await checkUserPhoneAlreadyRegistredCloud(fullCellNumber)

				console.log(`Usuário já registrado: ${phoneAlreadyRegistred}`)
				if (phoneAlreadyRegistred) {
					toggleLoginAlertModalVisibility()
					setIsLoading(false)
					return
				}

				await requestCellNumberVerificationCode(fullCellNumber)
			} else {
				!DDDIsValid && setInvalidDDDAfterSubmit(true)
				!cellNumberIsValid && setInvalidCellNumberAfterSubmit(true)
			}
		} catch (error: any) {
			if (error.message === 'auth/too-many-requests') {
				setRequestLimitsAlert(true)
				return
			}

			setHasServerSideError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const requestCellNumberVerificationCode = async (fullCellNumber?: string) => {
		const currentCellNumber = fullCellNumber || completeCellNumber

		await requestPhoneVerificationCode(useAuthenticationService, currentCellNumber, recaptchaVerifier.current)
			.then((verificationCodeId) => {
				navigation.navigate('InsertConfirmationCodeLinkAccount', {
					cellNumber: currentCellNumber, verificationCodeId
				})
			})
	}

	const getHeaderMessage = () => {
		if (requestLimitsAlert) return headerMessages.requestLimits.text
		if (someInvalidFieldSubimitted()) return headerMessages.clientSideError.text
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (requestLimitsAlert) return headerMessages.requestLimits.highlightedWords
		if (someInvalidFieldSubimitted()) return headerMessages.clientSideError.highlightedWords
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const navigateBackwards = () => navigation.goBack()

	const toggleLoginAlertModalVisibility = () => {
		setLoginAlertModalIsVisible((previousValue) => !previousValue)
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() || hasServerSideError ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<SocialLoginAlertModal
				visibility={loginAlertModalIsVisible}
				accountIdentifier={completeCellNumber}
				registerMethod
				linking
				closeModal={toggleLoginAlertModalVisibility}
				onPressButton={() => { }}
			/>
			<CustomRecaptchaModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
				languageCode={'pt-BR'}
			/>
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={someInvalidFieldSubimitted() || hasServerSideError ? theme.red2 : theme.orange2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={getHeaderMessage()}
					highlightedWords={getHeaderHighlightedWords()}
					fontSize={16}
				/>
			</DefaultHeaderContainer>
			<FormContainer >
				<InputsContainer>
					<DefaultInput
						value={DDD}
						relativeWidth={'30%'}
						textInputRef={inputRefs.DDDInput}
						nextInputRef={inputRefs.cellNumberInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.orange1}
						maxLength={2}
						invalidTextAfterSubmit={invalidDDDAfterSubmit}
						placeholder={'12'}
						keyboardType={'decimal-pad'}
						error={hasServerSideError}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateDDD(text)}
						onChangeText={(text: string) => setDDD(text)}
					/>
					<DefaultInput
						value={cellNumber}
						relativeWidth={'65%'}
						textInputRef={inputRefs.cellNumberInput}
						previousInputRef={inputRefs.DDDInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.orange1}
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
				{
					isLoading
						? <Loader />
						: (
							<PrimaryButton
								color={theme.green3}
								SecondSvgIcon={CheckWhiteIcon}
								labelColor={theme.white3}
								label={'continuar'}
								highlightedWords={['continuar']}
								startsHidden
								onPress={getVeficationCode}
							/>
						)
				}
			</FormContainer>
		</Container>
	)
}
