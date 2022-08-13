import { Alert } from 'react-native';
import React, { useRef, useState } from 'react'

import { Container, InputsContainer } from './styles';

import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { theme } from '../../common/theme';

export function InsertPhone() {

	const [DDD, setDDD] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidPhoneAfterSubmit, setInvalidPhoneAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		DDDInput: useRef<any>(null),   // TODO Type
		phoneInput: useRef<any>(null)
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

	const sendCompletePhone = () => {
		const DDDIsValid = validateDDD(DDD)
		const phoneIsValid = validatePhone(phone)

		if (DDDIsValid && phoneIsValid) {
			Alert.alert('Go!', 'Going to next Screen!')
			console.log(phone)
			// Navigate to InsertPassword or InserCode

		} else {
			!DDDIsValid && setInvalidDDDAfterSubmit(true)
			!phoneIsValid && setInvalidPhoneAfterSubmit(true)
		}
	}

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight='55%'
				backgroundColor={invalidDDDAfterSubmit || invalidPhoneAfterSubmit ? theme.background.tenth : theme.background.seventh}
				centralized
			>
				<InstructionCard
					message={
						invalidDDDAfterSubmit || invalidPhoneAfterSubmit
							? 'ih, parece que o seu telefone não é válido'
							: 'passa o seu telefone aí pra gente'}
					highlightedWords={
						invalidDDDAfterSubmit || invalidPhoneAfterSubmit
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
						invalidBackgroundColor={theme.background.eleventh}
						invalidBorderBottomColor={theme.background.ninth}
						maxLength={2}
						invalidTextAfterSubmit={invalidDDDAfterSubmit}
						placeholder={'22'}
						keyboardType={'decimal-pad'}
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
						invalidBackgroundColor={theme.background.eleventh}
						invalidBorderBottomColor={theme.background.ninth}
						maxLength={9}
						invalidTextAfterSubmit={invalidPhoneAfterSubmit}
						placeholder={'984848484'}
						keyboardType={'decimal-pad'}
						lastInput={true}
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
					onPress={sendCompletePhone}
				/>
			</FormContainer>
		</Container>
	);
}