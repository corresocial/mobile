import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TextInput } from 'react-native'

import { ButtonContainer, Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import TrashWhiteIcon from '../../../assets/icons/trash-white.svg'

import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { BackButton } from '../../_buttons/BackButton'
import { DefaultInput } from '../../_inputs/DefaultInput'
import { HorizontalSpacing } from '../../_space/HorizontalSpacing'
import { SmallButton } from '../../_buttons/SmallButton'
import { UiUtils } from '../../../utils-ui/common/UiUtils'

const { formatDate } = UiUtils()

interface PostDateProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	initialValue?: Date | string
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
	initialValue,
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
		dayInput: useRef<TextInput>(null),
		monthInput: useRef<TextInput>(null),
		yearInput: useRef<TextInput>(null)
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

	const savePostDate = () => {
		if (!insertedDateIsAfterCurrentDate()) {
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
					fontSize={16}
					message={
						invalidDateAfterSubmit
							? 'a data informada antecede a data atual'
							: customTitle || 'que dia começa?'
					}
					highlightedWords={
						invalidDateAfterSubmit
							? ['data', 'atual']
							: customHighlight || ['dia', 'começa']
					}
				/>
				{
					skipScreen ? (
						<>
							<HorizontalSpacing />
							<SmallButton
								SvgIcon={TrashWhiteIcon}
								color={theme.red3}
								height={relativeScreenWidth(11)}
								relativeWidth={relativeScreenWidth(11)}
								svgScale={['60%', '60%']}
								onPress={skipScreen}
							/>
						</>
					)
						: <></>
				}
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
						validBackgroundColor={validationColor}
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
						validBackgroundColor={validationColor}
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
						validBackgroundColor={validationColor}
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
								onPress={savePostDate}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { PostDate }
