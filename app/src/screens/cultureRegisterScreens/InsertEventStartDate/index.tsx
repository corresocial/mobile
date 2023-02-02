import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, Platform, StatusBar } from 'react-native'

import { ButtonContainer, Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers, formatDate } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertEventStartDateScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { BackButton } from '../../../components/_buttons/BackButton'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertEventStartDate({ route, navigation }: InsertEventStartDateScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const initialTime = formatDate(route.params?.initialValue as Date)

	const [day, setDay] = useState<string>(route.params?.initialValue ? initialTime.split('/')[0] : '')
	const [month, setMonth] = useState<string>(route.params?.initialValue ? initialTime.split('/')[1] : '')
	const [year, setYear] = useState<string>(route.params?.initialValue ? initialTime.split('/')[2] : '')

	const [dayIsValid, setDayIsValid] = useState<boolean>(false)
	const [monthIsValid, setMonthIsValid] = useState<boolean>(false)
	const [yearIsValid, setYearIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [invalidDateAfterSubmit, setInvalidDateAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		dayInput: useRef<React.MutableRefObject<any>>(null),
		monthInput: useRef<React.MutableRefObject<any>>(null),
		yearInput: useRef<React.MutableRefObject<any>>(null)
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
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
		const isValid = text.length === 2 && parseInt(text) <= 31 && parseInt(text) > 0
		if (isValid) {
			return true
		}
		return false
	}

	const validateMonth = (text: string) => {
		const isValid = text.length === 2 && parseInt(text) <= 12 && parseInt(text) > 0
		if (isValid) {
			return true
		}
		return false
	}

	const validateYear = (text: string) => {
		const isValid = text.length === 4
		if (isValid) {
			return true
		}
		return false
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

	const insertedDateIsAfterCurrentDate = (insertedYear: string = year) => {
		const insertedDate = new Date(`${insertedYear}-${month}-${day}T23:59:59`)
		const currentDate = new Date()
		const currentDateWithoutTimezone = new Date(`${currentDate.getUTCFullYear()}-${(currentDate.getUTCMonth() + 1 < 10) ? `0${currentDate.getUTCMonth() + 1}` : currentDate.getUTCMonth() + 1}-${(currentDate.getUTCDate() < 10) ? `0${currentDate.getUTCDate()}` : currentDate.getUTCDate()}`)
		return insertedDate >= currentDateWithoutTimezone
	}

	const saveEventStartDate = () => {
		if (!insertedDateIsAfterCurrentDate()) {
			setInvalidDateAfterSubmit(true)
			return
		}

		const eventStartDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ eventStartDate })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ eventStartDate })
		navigation.navigate('InsertEventStartHour')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = invalidDateAfterSubmit

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
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={invalidDateAfterSubmit ? theme.red2 : theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						invalidDateAfterSubmit
							? 'A data de início informada antecede a data atual'
							: 'quando começa?'
					}
					highlightedWords={
						invalidDateAfterSubmit
							? ['data', 'de', 'início', 'data', 'atual']
							: ['começa']
					}
				>
					<ProgressBar
						range={5}
						value={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<InputsContainer>
					<LineInput
						value={day}
						relativeWidth={'30%'}
						textInputRef={inputRefs.dayInput}
						nextInputRef={inputRefs.monthInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
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
					<LineInput
						value={month}
						relativeWidth={'30%'}
						previousInputRef={inputRefs.dayInput}
						textInputRef={inputRefs.monthInput}
						nextInputRef={inputRefs.yearInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
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
					<LineInput
						value={year}
						relativeWidth={'30%'}
						previousInputRef={inputRefs.monthInput}
						textInputRef={inputRefs.yearInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
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
								color={invalidDateAfterSubmit ? theme.red3 : theme.green3}
								iconName={'arrow-right'}
								iconColor={theme.white3}
								label={'continuar'}
								labelColor={theme.white3}
								highlightedWords={['continuar']}
								onPress={saveEventStartDate}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertEventStartDate }
