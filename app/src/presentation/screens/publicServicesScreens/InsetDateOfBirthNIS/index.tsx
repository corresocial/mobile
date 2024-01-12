import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'

import { SmasContext } from '@contexts/SmasContext'

import { InsertDateOfBirthNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { ButtonContainer, Container, InputsContainer, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ProgressBar } from '@components/ProgressBar'

function InsertDateOfBirthNIS({ navigation }: InsertDateOfBirthNISScreenProps) {
	const { setSmasDataOnContext, getNumberOfMissingInfo } = useContext(SmasContext)

	const [day, setDay] = useState<string>('')
	const [month, setMonth] = useState<string>('')
	const [year, setYear] = useState<string>('')

	const [dayIsValid, setDayIsValid] = useState<boolean>(false)
	const [monthIsValid, setMonthIsValid] = useState<boolean>(false)
	const [yearIsValid, setYearIsValid] = useState<boolean>(false)
	const [invalidDateAfterSubmit, setInvalidDateAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		dayInput: useRef<TextInput>(null),
		monthInput: useRef<TextInput>(null),
		yearInput: useRef<TextInput>(null)
	}

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const dayValidation = validateDay(day)
		const monthValidation = validateMonth(month)
		const yearValidation = validateYear(year)
		setDayIsValid(dayValidation)
		setMonthIsValid(monthValidation)
		setYearIsValid(yearValidation)
	}, [day, month, year, keyboardOpened])

	const validateDay = (text: string) => {
		return text.length === 2 && parseInt(text) <= 31 && parseInt(text) > 0
	}

	const validateMonth = (text: string) => {
		return text.length === 2 && parseInt(text) <= 12 && parseInt(text) > 0
	}

	const validateYear = (text: string) => {
		return text.length === 4
	}

	const allFiedsIsValid = () => (dayIsValid && monthIsValid && yearIsValid)

	const existsThisDayOnMonth = () => {
		if (!allFiedsIsValid()) return true
		return numberOfDaysOfMonth() >= parseInt(day)
	}

	const numberOfDaysOfMonth = () => {
		const data = new Date(parseInt(year), parseInt(month), 0)
		return data.getDate()
	}

	const saveDateOfBirthNIS = async () => {
		const formatedDate = `${year}-${month}-${day}T12:00:00`
		setSmasDataOnContext({ dateOfBirth: formatedDate }) // save string

		if (getNumberOfMissingInfo() === 2) {
			// Make request
			return navigation.push('QueryNISResult', {
				success: true,
				NIS: '123456123454'
			})
		}

		navigation.push('SelectNISQueryData')
	}

	const navigateBackwards = () => navigation.goBack()

	const getProgressBarState = () => {
		if (!getNumberOfMissingInfo()) return 3
		return 5 - getNumberOfMissingInfo()
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={invalidDateAfterSubmit ? theme.red2 : theme.pink2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'45%'}
				centralized
				flexDirection={'column'}
				backgroundColor={theme.pink2}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'consultar seu NIS'}
						highlightedWords={['NIS']}
					/>
				</InstructionButtonContainer >
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft>
					<InstructionCard
						fontSize={16}
						message={'por favor nos informe sua data de nascimento'}
						highlightedWords={['sua', 'data', 'de', 'nascimento']}
					>
						<ProgressBar value={getProgressBarState()} range={3} />
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
				justifyContent={'center'}
			>
				<InputsContainer>
					<DefaultInput
						value={day}
						relativeWidth={'28%'}
						textInputRef={inputRefs.dayInput}
						nextInputRef={inputRefs.monthInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.pink1}
						maxLength={2}
						fontSize={22}
						placeholder={'dia'}
						keyboardType={'decimal-pad'}
						filterText={filterLeavingOnlyNumbers}
						invalidTextAfterSubmit={invalidDateAfterSubmit || !existsThisDayOnMonth()}
						validateText={(text: string) => validateDay(text)}
						onChangeText={(text: string) => {
							setDay(text)
							invalidDateAfterSubmit && setInvalidDateAfterSubmit(false)
						}}
					/>
					<DefaultInput
						value={month}
						relativeWidth={'30%'}
						previousInputRef={inputRefs.dayInput}
						textInputRef={inputRefs.monthInput}
						nextInputRef={inputRefs.yearInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.pink1}
						maxLength={2}
						fontSize={22}
						placeholder={'mês'}
						keyboardType={'decimal-pad'}
						filterText={filterLeavingOnlyNumbers}
						invalidTextAfterSubmit={invalidDateAfterSubmit}
						validateText={(text: string) => validateMonth(text)}
						onChangeText={(text: string) => {
							setMonth(text)
							invalidDateAfterSubmit && setInvalidDateAfterSubmit(false)
						}}
					/>
					<DefaultInput
						value={year}
						relativeWidth={'35%'}
						previousInputRef={inputRefs.monthInput}
						textInputRef={inputRefs.yearInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.pink1}
						maxLength={4}
						fontSize={22}
						placeholder={'ano'}
						keyboardType={'decimal-pad'}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						invalidTextAfterSubmit={invalidDateAfterSubmit}
						validateText={(text: string) => validateYear(text)}
						onChangeText={(text: string) => {
							setYear(text)
							invalidDateAfterSubmit && setInvalidDateAfterSubmit(false)
						}}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						allFiedsIsValid() && !keyboardOpened && existsThisDayOnMonth()
						&& (
							<PrimaryButton
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={saveDateOfBirthNIS}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertDateOfBirthNIS }
