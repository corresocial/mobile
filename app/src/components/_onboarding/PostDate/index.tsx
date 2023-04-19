import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar } from 'react-native'

import { ButtonContainer, Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { relativeScreenHeight } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers, formatDate } from '../../../common/auxiliaryFunctions'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { LineInput } from '../../LineInput'
import { BackButton } from '../../_buttons/BackButton'
import { ProgressBar } from '../../ProgressBar'
import { SkipButton } from '../../_buttons/SkipButton'

interface PostDateProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	progress: [value: number, range: number]
	editMode?: boolean
	initialValue?: Date | string
	startDate?: Date
	keyboardOpened: boolean
	navigateBackwards: () => void
	skipScreen?: () => void
	saveDate: (year: string, month: string, day: string) => void
}

function PostDate({
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	progress,
	editMode,
	initialValue,
	startDate,
	keyboardOpened,
	navigateBackwards,
	skipScreen,
	saveDate
}: PostDateProps) {
	const initialTime = initialValue ? formatDate(initialValue as Date) : false

	const [day, setDay] = useState<string>(initialTime ? initialTime.split('/')[0] : '')
	const [month, setMonth] = useState<string>(initialTime ? initialTime.split('/')[1] : '')
	const [year, setYear] = useState<string>(initialTime ? initialTime.split('/')[2] : '')

	const [dayIsValid, setDayIsValid] = useState<boolean>(false)
	const [monthIsValid, setMonthIsValid] = useState<boolean>(false)
	const [yearIsValid, setYearIsValid] = useState<boolean>(false)
	const [invalidDateAfterSubmit, setInvalidDateAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		dayInput: useRef<React.MutableRefObject<any>>(null),
		monthInput: useRef<React.MutableRefObject<any>>(null),
		yearInput: useRef<React.MutableRefObject<any>>(null)
	}

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

	const insertedDateIsAfterCurrentDate = () => {
		const insertedDate = new Date(`${year}-${month}-${day}T23:59:59`)
		const currentDate = new Date()
		const currentDateWithoutTimezone = new Date(`${currentDate.getUTCFullYear()}-${(currentDate.getUTCMonth() + 1 < 10) ? `0${currentDate.getUTCMonth() + 1}` : currentDate.getUTCMonth() + 1}-${(currentDate.getUTCDate() < 10) ? `0${currentDate.getUTCDate()}` : currentDate.getUTCDate()}`)
		return insertedDate >= currentDateWithoutTimezone
	}

	const endDateIsBiggerOfStartDate = () => {
		if (editMode) return true

		const insertedDate = new Date(`${year}-${month}-${day}T23:59:59`)
		const contextStartDate = startDate || new Date()
		return contextStartDate.getTime() < insertedDate.getTime()
	}

	const savePostDate = () => {
		if (startDate) {
			if (!endDateIsBiggerOfStartDate()) {
				setInvalidDateAfterSubmit(true)
				return
			}
		} else if (!insertedDateIsAfterCurrentDate()) {
			setInvalidDateAfterSubmit(true)
			return
		}

		saveDate(year, month, day)
	}

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
			outputRange: [backgroundColor, theme.red2],
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={invalidDateAfterSubmit ? theme.red2 : backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={!invalidDateAfterSubmit ? relativeScreenHeight(24) : relativeScreenHeight(28)}
				relativeHeight={!invalidDateAfterSubmit ? relativeScreenHeight(24) : relativeScreenHeight(28)}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={
						invalidDateAfterSubmit
							? startDate ? 'a data informada antecede a data de início' : 'a data informada antecede a data atual'
							: customTitle || 'quando começa?'
					}
					highlightedWords={
						invalidDateAfterSubmit
							? ['data', 'de', 'início', 'data', 'atual']
							: customHighlight || ['começa']
					}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
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
						validBackgroundColor={validationColor}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.black4}
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
						validBackgroundColor={validationColor}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.black4}
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
						validBackgroundColor={validationColor}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.black4}
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
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={savePostDate}
							/>
						)
					}
				</ButtonContainer>
				{
					(!dayIsValid || !monthIsValid || !yearIsValid) && !keyboardOpened
						? (
							<SkipButton onPress={skipScreen} />
						)
						: <></>
				}
			</FormContainer>
		</Container>
	)
}

export { PostDate }
