import React, { useEffect, useRef, useState } from 'react'
import { StatusBar, Platform, TextInput } from 'react-native'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertCitizenCellNumberScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'

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
import { Loader } from '@components/Loader'

const citizenUseCases = new CitizenRegisterUseCases()

export function InsertCitizenCellNumber({ route, navigation }: InsertCitizenCellNumberScreenProps) {
	const { citizenRegistrationIdentifier, saveCitizenRegistrationIdentifier } = useCitizenRegistrationContext()

	const [DDD, setDDD] = useState<string>('')
	const [cellNumber, setCellNumber] = useState<string>('')
	const [loaderIsVisible, setLoaderIsVisible] = useState(false)

	const [invalidDDDAfterSubmit, setInvalidDDDAfterSubmit] = useState<boolean>(false)
	const [invalidCellNumberAfterSubmit, setInvalidCellNumberAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		DDDInput: useRef<TextInput>(null),
		cellNumberInput: useRef<TextInput>(null)
	}

	useEffect(() => {
		if (citizenRegistrationIdentifier.cellNumber) {
			const dddMatch = citizenRegistrationIdentifier.cellNumber.match(/(?<=\+55)\d{2}/)
			const numberMatch = citizenRegistrationIdentifier.cellNumber.match(/\d{9}$/)

			if (!dddMatch || !numberMatch) return
			// Extrair e definir os valores
			setDDD(dddMatch[0])
			setCellNumber(numberMatch[0])
		}
	}, [citizenRegistrationIdentifier.cellNumber]) // Dependência ajustada para evitar dependências vazias

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
		try {
			setInvalidDDDAfterSubmit(false)
			setInvalidCellNumberAfterSubmit(false)

			const DDDIsValid = validateDDD(DDD)
			const cellNumberIsValid = validateCellNumber(cellNumber)

			if (!DDDIsValid) return setInvalidDDDAfterSubmit(true)
			if (!cellNumberIsValid) return setInvalidCellNumberAfterSubmit(true)

			if (DDDIsValid && cellNumberIsValid) {
				setLoaderIsVisible(true)

				const fullCellNumber = `+55${DDD}${cellNumber}`
				const citizenHasAccountOnApp = await citizenUseCases.citizenHasAccountOnApp(useCloudFunctionService, fullCellNumber)
				saveCitizenRegistrationIdentifier({
					cellNumber: fullCellNumber,
					citizenHasAccount: citizenHasAccountOnApp
				})

				setLoaderIsVisible(false)
				navigation.replace('InsertCitizenName')
			}
		} catch (error) {
			console.log(error)
			setLoaderIsVisible(false)
		}
	}

	const skipScreen = () => {
		saveCitizenRegistrationIdentifier({ citizenHasAccount: false })
		navigation.replace('InsertCitizenName')
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : theme.colors.orange[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : theme.colors.orange[2]}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'1 - Gostaria de deixar o seu telefone para contato?'}
					highlightedWords={['1', 'telefone']}
					fontSize={16}
				/>
			</DefaultHeaderContainer>
			<FormContainer >
				<InputsContainer>
					<DefaultInput
						value={DDD}
						defaultValue={citizenRegistrationIdentifier.cellNumber}
						relativeWidth={'30%'}
						textInputRef={inputRefs.DDDInput}
						nextInputRef={inputRefs.cellNumberInput}
						defaultBackgroundColor={theme.colors.white[2]}
						validBackgroundColor={theme.colors.orange[1]}
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
						defaultBackgroundColor={theme.colors.white[2]}
						validBackgroundColor={theme.colors.orange[1]}
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
					loaderIsVisible
						? <Loader />
						: (DDD || cellNumber)
							? (
								<PrimaryButton
									color={theme.colors.green[3]}
									SecondSvgIcon={CheckWhiteIcon}
									labelColor={theme.colors.white[3]}
									label={'continuar'}
									highlightedWords={['continuar']}
									startsHidden
									onPress={saveCellNumber}
								/>
							)
							: (
								<PrimaryButton
									color={theme.colors.yellow[3]}
									SecondSvgIcon={DeniedWhiteIcon}
									labelColor={theme.colors.black[4]}
									label={'não informar'}
									highlightedWords={['não']}
									onPress={skipScreen}
								/>
							)
				}
			</FormContainer>
		</Container>
	)
}
