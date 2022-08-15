import { Alert, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react'

import { Container, InputsContainer } from './styles';

import { InsertPhoneScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { theme } from '../../common/theme';
import { filterLeavingOnlyNumbers } from '../../common/auxiliaryFunctions';

export function InsertPhone({navigation}: InsertPhoneScreenProps) {

	const [DDD, setDDD] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidPhoneAfterSubmit, setInvalidPhoneAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		DDDInput: useRef<React.MutableRefObject<any>>(null),
		phoneInput: useRef<React.MutableRefObject<any>>(null)
	}

	const validateDDD = (text: string) => {
		const isValid = text.length == 2
		if (isValid) {
			setInvalidDDDAfterSubmit(false)
			return true
		}
		return false
	}

	const validatePhone = (text: string) => {
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

	const sendCompletePhoneToNextScreen = () => {
		const DDDIsValid = validateDDD(DDD)
		const phoneIsValid = validatePhone(phone)

		if (DDDIsValid && phoneIsValid) {
			if(DDD === '00') {// TODO Dev Only
				return navigation.navigate('InsertPassword', {userPhone: `${DDD}${phone}`})
			}
			return navigation.navigate('InsertConfirmationCode', {userPhone: `${DDD}${phone}`})

		} else {
			!DDDIsValid && setInvalidDDDAfterSubmit(true)
			!phoneIsValid && setInvalidPhoneAfterSubmit(true)
		}
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
			outputRange: [theme.background.seventh, theme.background.eleventh],
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
							? 'ih, parece que o seu telefone não é válido'
							: 'passa o seu telefone aí pra gente'}
					highlightedWords={
						someInvalidFieldSubimitted()
							? ['telefone', 'não', 'é', 'válido']
							: ['telefone']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.background.tertiary}>
				<InputsContainer>
					<LineInput
						value={DDD}
						relativeWidth={'18%'}
						textInputRef={inputRefs.DDDInput}
						nextInputRef={inputRefs.phoneInput}
						defaultBackgroundColor={theme.background.tertiary}
						defaultBorderBottomColor={theme.background.quaternary}
						validBackgroundColor={theme.background.eighth}
						validBorderBottomColor={theme.background.fifth}
						invalidBackgroundColor={theme.background.twelfth}
						invalidBorderBottomColor={theme.background.ninth}
						maxLength={2}
						invalidTextAfterSubmit={invalidDDDAfterSubmit} 
						placeholder={'22'}
						keyboardType={'decimal-pad'}
						filterText={filterLeavingOnlyNumbers as any} // TODO Type
						validateText={(text: string) => validateDDD(text)}
						onChangeText={(text: string) => setDDD(text)}
					/>
					<LineInput
						value={phone}
						relativeWidth={'77%'}
						textInputRef={inputRefs.phoneInput}
						previousInputRef={inputRefs.DDDInput}
						defaultBackgroundColor={theme.background.tertiary}
						defaultBorderBottomColor={theme.background.quaternary}
						validBackgroundColor={theme.background.eighth}
						validBorderBottomColor={theme.background.fifth}
						invalidBackgroundColor={theme.background.twelfth}
						invalidBorderBottomColor={theme.background.ninth}
						maxLength={9}
						invalidTextAfterSubmit={invalidPhoneAfterSubmit}
						placeholder={'984848484'}
						keyboardType={'decimal-pad'}
						lastInput={true}
						filterText={filterLeavingOnlyNumbers as any} // TODO Type
						validateText={(text: string) => validatePhone(text)}
						onChangeText={(text: string) => setPhone(text)}
					/>
				</InputsContainer>
				<PrimaryButton
					color={theme.background.sixth}
					iconName={'arrow-right'}
					iconColor={theme.font.tertiary}
					label='continuar'
					labelColor={theme.font.tertiary}
					highlightedWords={['continuar']}
					onPress={sendCompletePhoneToNextScreen}
				/>
			</FormContainer>
		</Container>
	);
}