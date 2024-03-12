import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TextInput } from 'react-native'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { ButtonContainer, Container, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DataVisualizerInput } from '@components/_inputs/DataVisualizerInput'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

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
					<DataVisualizerInput
						openPickerOnTouch
						pickerType={'date'}
						fields={['dia', 'mês', 'ano']}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={validationColor}
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
