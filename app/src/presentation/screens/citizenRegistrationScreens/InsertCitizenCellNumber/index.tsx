import React, { useRef, useState } from 'react'
import { StatusBar, Platform, TextInput } from 'react-native'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertCitizenCellNumberScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { Container, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'

export function InsertCitizenCellNumber({ route, navigation }: InsertCitizenCellNumberScreenProps) {
	const { saveCitizenRegistrationIdentifier } = useCitizenRegistrationContext()

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

	const saveCellNumber = async () => {
		setInvalidDDDAfterSubmit(false)
		setInvalidCellNumberAfterSubmit(false)

		const DDDIsValid = DDD ? validateDDD(DDD) : true
		const cellNumberIsValid = cellNumber ? validateCellNumber(cellNumber) : true

		if (!DDDIsValid) return setInvalidDDDAfterSubmit(true)
		if (!cellNumberIsValid) return setInvalidCellNumberAfterSubmit(true)

		if (DDDIsValid && cellNumberIsValid) {
			const fullCellNumber = `+55${DDD}${cellNumber}`
			saveCitizenRegistrationIdentifier({ cellNumber: fullCellNumber })
			navigation.navigate('InsertCitizenName')
		}
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.orange2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'Gostaria de deixar o seu telefone para contato?'}
					highlightedWords={['telefone']}
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
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateCellNumber(text)}
						onChangeText={(text: string) => setCellNumber(text)}
					/>
				</InputsContainer>
				{
					(DDD || cellNumber)
						? (
							<PrimaryButton
								color={theme.green3}
								SecondSvgIcon={CheckWhiteIcon}
								labelColor={theme.white3}
								label={'continuar'}
								highlightedWords={['continuar']}
								startsHidden
								onPress={saveCellNumber}
							/>
						)
						: (
							<PrimaryButton
								color={theme.yellow3}
								SecondSvgIcon={DeniedWhiteIcon}
								labelColor={theme.black4}
								label={'não informar'}
								highlightedWords={['não']}
								onPress={saveCellNumber}
							/>
						)
				}
			</FormContainer>
		</Container>
	)
}
