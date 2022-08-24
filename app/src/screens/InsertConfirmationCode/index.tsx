import {  Animated } from 'react-native';
import React, { useRef, useState } from 'react'

import { Container, InputsContainer } from './styles';

import { theme } from '../../common/theme';
import { InsertConfirmationCodeScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { filterLeavingOnlyNumbers } from '../../common/auxiliaryFunctions';

function InsertConfirmationCode({ navigation, route }: InsertConfirmationCodeScreenProps) {

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
		const userPhone = route.params.userPhone

		if (completeCodeIsValid) {
			// navigation.navigate('InsertConfirmationCode', { userPhone }) // Navigation to this screen
			navigation.navigate('InsertName', {userPhone})

		} else {
			!completeCodeIsValid && setInvaliCodeAfterSubmit(true)
		}
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