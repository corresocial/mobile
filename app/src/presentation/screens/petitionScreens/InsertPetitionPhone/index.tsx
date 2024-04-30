import React, { useRef, useState } from 'react'
import { StatusBar, Platform, TextInput } from 'react-native'

import { InsertPetitionPhoneScreenProps } from '@routes/Stack/PetitionStack/screenProps'

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

export function InsertPetitionPhone({ route, navigation }: InsertPetitionPhoneScreenProps) {
	const [DDD, setDDD] = useState<string>('')
	const [cellNumber, setCellNumber] = useState<string>('')

	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidCellNumberAfterSubmit, setInvalidCellNumberAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		DDDInput: useRef<TextInput>(null),
		cellNumberInput: useRef<TextInput>(null)
	}

	const validateDDD = (text: string) => {
		setInvalidDDDAfterSubmit(false)
		setInvalidCellNumberAfterSubmit(false)
		return text.length === 2
	}

	const validateCellNumber = (text: string) => {
		setInvalidDDDAfterSubmit(false)
		setInvalidCellNumberAfterSubmit(false)
		return text.length === 9
	}

	const someInvalidFieldSubimitted = () => invalidDDDAfterSubmit || invalidCellNumberAfterSubmit

	const navigateToNextScreen = async () => {
		setInvalidDDDAfterSubmit(false)
		setInvalidCellNumberAfterSubmit(false)

		const DDDIsValid = validateDDD(DDD)
		const cellNumberIsValid = validateCellNumber(cellNumber)

		if (!DDDIsValid) return setInvalidDDDAfterSubmit(true)
		if (!cellNumberIsValid) return setInvalidCellNumberAfterSubmit(true)

		if (DDDIsValid && cellNumberIsValid) {
			const fullCellNumber = `+55${DDD}${cellNumber}`
			console.log(fullCellNumber)
			navigation.navigate('FinishPetitionSignature')
		}
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.purple2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'qual é o seu telefone?'}
					highlightedWords={['telefone?']}
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
						validBackgroundColor={theme.purple1}
						maxLength={2}
						invalidTextAfterSubmit={invalidDDDAfterSubmit}
						placeholder={'12'}
						keyboardType={'decimal-pad'}
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
						validBackgroundColor={theme.purple1}
						maxLength={9}
						invalidTextAfterSubmit={invalidCellNumberAfterSubmit}
						placeholder={'123451234'}
						keyboardType={'decimal-pad'}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateCellNumber(text)}
						onChangeText={(text: string) => setCellNumber(text)}
					/>
				</InputsContainer>
				<PrimaryButton
					color={theme.green3}
					flexDirection={'row-reverse'}
					SvgIcon={CheckWhiteIcon}
					labelColor={theme.white3}
					label={'continuar'}
					highlightedWords={['continuar']}
					startsHidden
					onPress={navigateToNextScreen}
				/>
			</FormContainer>
		</Container>
	)
}
