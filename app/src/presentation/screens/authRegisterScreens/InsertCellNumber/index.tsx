import React, { useEffect, useRef, useState } from 'react'
import { StatusBar, Platform, TextInput } from 'react-native'

import { useUserDomain } from '@domain/user/useUserDomain'

import { useAuthContext } from '@contexts/AuthContext'

import { InsertCellNumberScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

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
import { SocialLoginAlertModal } from '@components/_modals/SocialLoginAlertModal'
import { Loader } from '@components/Loader'

const { requestPhoneVerificationCode } = useUserDomain()

const { checkUserPhoneAlreadyRegistredCloud } = useCloudFunctionService()

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

export function InsertCellNumber({ route, navigation }: InsertCellNumberScreenProps) {
	const { setUserRegisterDataOnContext, setUserAuthDataOnContext } = useAuthContext()

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

	const newUser = route.params?.newUser

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => setIsLoading(false))
		return unsubscribe
	}, [])

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
				if (!newUser && !phoneAlreadyRegistred) {
					toggleLoginAlertModalVisibility()
					setIsLoading(false)
					return
				}

				if (newUser && phoneAlreadyRegistred) {
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
			console.log(error)
			setIsLoading(false)
			if (error.message === 'auth/too-many-requests') {
				setRequestLimitsAlert(true)
				return
			}

			setHasServerSideError(true)
		}
	}

	const requestCellNumberVerificationCode = async (fullCellNumber?: string) => {
		try {
			setLoginAlertModalIsVisible(false)
			// Modal de recaptcha estava sendo impedido de abrir pois o modal de alerta estava intânciado
			setTimeout(async () => {
				const currentCellNumber = fullCellNumber || completeCellNumber
				const verificationCodeId = await requestPhoneVerificationCode(useAuthenticationService, currentCellNumber)

				if (!verificationCodeId) throw new Error('Erro ao solicitar código de verificaçã')

				setUserRegisterDataOnContext({ cellNumber: currentCellNumber, verificationCodeId })
				setUserAuthDataOnContext({ cellNumber: currentCellNumber, verificationCodeId })

				navigation.navigate('InsertConfirmationCode')
			}, 300)
		} catch (err) {
			console.log(err)
			throw err
		}
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
			<StatusBar backgroundColor={someInvalidFieldSubimitted() || hasServerSideError ? theme.colors.red[2] : newUser ? theme.colors.purple[2] : theme.colors.green[2]} barStyle={'dark-content'} />
			<SocialLoginAlertModal
				visibility={loginAlertModalIsVisible}
				accountIdentifier={completeCellNumber}
				registerMethod={newUser}
				closeModal={() => setLoginAlertModalIsVisible(false)}
				onPressButton={requestCellNumberVerificationCode}
			/>
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : newUser ? theme.colors.purple[2] : theme.colors.green[2]}
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
						defaultBackgroundColor={theme.colors.white[2]}
						validBackgroundColor={newUser ? theme.colors.purple[1] : theme.colors.green[1]}
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
						defaultBackgroundColor={theme.colors.white[2]}
						validBackgroundColor={newUser ? theme.colors.purple[1] : theme.colors.green[1]}
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
								color={theme.colors.green[3]}
								SecondSvgIcon={CheckWhiteIcon}
								labelColor={theme.colors.white[3]}
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
