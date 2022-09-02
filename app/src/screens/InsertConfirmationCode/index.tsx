import { Animated } from 'react-native';
import React, { useContext, useRef, useState } from 'react'
import { UserCredential } from 'firebase/auth';

import { Container, InputsContainer } from './styles';
import { theme } from '../../common/theme';

import { UserIdentification } from './types';
import { filterLeavingOnlyNumbers } from '../../common/auxiliaryFunctions';

import { InsertConfirmationCodeScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AuthContext } from '../../contexts/AuthContext';

function InsertConfirmationCode({ navigation, route }: InsertConfirmationCodeScreenProps) {

	const { validateVerificationCode } = useContext(AuthContext)

	const [inputCode01, setInputCode01] = useState<string>('')
	const [inputCode02, setInputCode02] = useState<string>('')
	const [inputCode03, setInputCode03] = useState<string>('')
	const [inputCode04, setInputCode04] = useState<string>('')
	const [inputCode05, setInputCode05] = useState<string>('')
	const [inputCode06, setInputCode06] = useState<string>('')

	const [invalidCodeAfterSubmit, setInvaliCodeAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		inputCodeRef01: useRef<React.MutableRefObject<any>>(null),
		inputCodeRef02: useRef<React.MutableRefObject<any>>(null),
		inputCodeRef03: useRef<React.MutableRefObject<any>>(null),
		inputCodeRef04: useRef<React.MutableRefObject<any>>(null),
		inputCodeRef05: useRef<React.MutableRefObject<any>>(null),
		inputCodeRef06: useRef<React.MutableRefObject<any>>(null)
	}

	const inputsConfig = [
		{
			field: inputCode01,
			set: setInputCode01,
			ref: inputRefs.inputCodeRef01
		},
		{
			field: inputCode02,
			set: setInputCode02,
			ref: inputRefs.inputCodeRef02
		},
		{
			field: inputCode03,
			set: setInputCode03,
			ref: inputRefs.inputCodeRef03
		},
		{
			field: inputCode04,
			set: setInputCode04,
			ref: inputRefs.inputCodeRef04
		},
		{
			field: inputCode05,
			set: setInputCode05,
			ref: inputRefs.inputCodeRef05
		},
		{
			field: inputCode06,
			set: setInputCode06,
			ref: inputRefs.inputCodeRef06
		},
	]

	const validateCode = (text: string) => {
		const isValid = text.length == 1
		if (isValid) {
			setInvaliCodeAfterSubmit(false)
			return true
		}
		return false
	}

	const sendCompletePhoneToNextScreen = () => {
		const completeCode = mergeAllInputCodes()
		const completeCodeIsValid = completeCode.length == 6 // Need server side validation

		if (completeCodeIsValid) {
			const userPhone = route.params.userPhone
			const verificationCodeId = route.params.verificationCodeId as string

			validateVerificationCode(verificationCodeId, completeCode).then(async (userCredential: UserCredential) => {
				if (typeof userCredential !== 'string') {
					return navigation.navigate('InsertName', {
						userPhone,
						userIdentification: await extractUserIdentification(userCredential)
					})
				} else {
					setInvaliCodeAfterSubmit(true)
				}
			})
		} else {
			!completeCodeIsValid && setInvaliCodeAfterSubmit(true)
		}
	}

	const extractUserIdentification  = async ({ user }: UserCredential) => {
		const userIdentification: UserIdentification = {
			uid: user.uid,
			authTime: (await user.getIdTokenResult()).authTime,
			accessToken: (await user.getIdTokenResult()).token,
			tokenExpirationTime: (await user.getIdTokenResult()).expirationTime,
			refreshToken: user.refreshToken
		}

		return userIdentification
	}

	const mergeAllInputCodes = () => {
		return inputsConfig.reduce((amount, current) => amount + current.field, '')
	}

	const someInvalidFieldSubimitted = () => {
		return invalidCodeAfterSubmit
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = someInvalidFieldSubimitted()

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
		<Container >
			<DefaultHeaderContainer
				relativeHeight='55%'
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionCard
					message={
						someInvalidFieldSubimitted()
							? 'opa! parece que o \ncódigo tá errado'
							: 'passa o código que\nte mandamos aí'
					}
					highlightedWords={
						someInvalidFieldSubimitted()
							? ['\ncódigo', 'tá', 'errado']
							: ['código']
					}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					{
						inputsConfig.map((inputConfig, index) => {
							const isFirstInput = index == 0
							const isLastInput = index == inputsConfig.length - 1 && true
							return (
								<LineInput key={index}
									value={inputConfig.field}
									relativeWidth={'14%'}
									textInputRef={inputConfig.ref}
									lastInput={isLastInput}
									previousInputRef={!isFirstInput && inputsConfig[index - 1].ref}
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
									filterText={filterLeavingOnlyNumbers}
									validateText={(text: string) => validateCode(text)}
									onChangeText={(text: string) => inputConfig.set(text)}
								/>
							)
						})
					}
				</InputsContainer>
				<PrimaryButton
					color={someInvalidFieldSubimitted() ? theme.red3 : theme.blue3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='continuar'
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					onPress={sendCompletePhoneToNextScreen}
				/>
			</FormContainer>
		</Container>
	);
}

export { InsertConfirmationCode }

/*   // UserCredentials
{
  "_redirectEventId": undefined,
  "apiKey": "AIzaSyDbh8TC2OOx2Cqw8cwOC80kOwrLy8kbBHA",
  "appName": "[DEFAULT]",
  "createdAt": "1648148841053",
  "displayName": undefined,
  "email": undefined,
  "emailVerified": false,
  "isAnonymous": false,
  "lastLoginAt": "1662071675223",
  "phoneNumber": "+5512123451234",
  "photoURL": undefined,
  "providerData": Array [
	Object {
	  "displayName": null,
	  "email": null,
	  "phoneNumber": "+5512123451234",
	  "photoURL": null,
	  "providerId": "phone",
	  "uid": "+5512123451234",
	},
  ],
  "stsTokenManager": Object {
	"accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyZmEwZjE2NmJmZjZiODU5N2FjMGFlMDRlNTllZmYxOTk1N2MyYmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ycmVzb2NpYWwtNjY4NDAiLCJhdWQiOiJjb3JyZXNvY2lhbC02Njg0MCIsImF1dGhfdGltZSI6MTY2MjA3MTY3NSwidXNlcl9pZCI6IlJNQ0pBdVVoTGpTbUF1M2tnalR6UmpqWjJqQjIiLCJzdWIiOiJSTUNKQXVVaExqU21BdTNrZ2pUelJqaloyakIyIiwiaWF0IjoxNjYyMDcxNjc1LCJleHAiOjE2NjIwNzUyNzUsInBob25lX251bWJlciI6Iis1NTEyMTIzNDUxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrNTUxMjEyMzQ1MTIzNCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.e4ATxiRKeNmQj-gZxfe83KLiIcaMy4Ryx3vHYJVyJiofmw86k8f11gY-LRQhhOo5m7GLLS-cmSCy496Zdtxh7iDSFBMQgSiv-Sm-TBDb6ueen8ZFOR2uym2ibMvlBeE9pVXimbGZE6s1hBS7jKlw1Ao7ouLvAOcT7WvSdqjrQidtrREuvSUrqelo-UqHQjAY8qfJIXlCn_yVYY3kHHKFZgGuzA2m2wm-CegFRo3yEDTSwaC8QpZVxog4G6KTATV5GsYMxTVZMySgqglYSxikHE6GKzmoPqd9b9bk0tg641b81NvIj6VBEDwIiq7jdbfsmX8PB2bv7_ss7j3rluQD2w",
	"expirationTime": 1662075262057,
	"refreshToken": "AOEOulZKLwcD2xls_qCm5Gkvnj4fWYTdkafLe96D2BIK_rV6k2Dqru0xxebEnbw7vCE4MnNM4goueLxjoBaZtwMPdB4rO8mhFpmy8OVNN6csgb4CqqfFXi7e9BCKdVYgnY8tiCTDLj5kITMWf4VH3k1veIekp8koUiVzTJsX6vNIrmEHcv4nSqDDBmDJHwXxJlRCy22A98AN2y5vKtkVMcYTpXIPLmSv1A",
  },
  "tenantId": undefined,
  "uid": "RMCJAuUhLjSmAu3kgjTzRjjZ2jB2",
}
 */