import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TextInput } from 'react-native'

import { ButtonContainer, Container, InputsContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { filterLeavingOnlyNumbers, formatHour } from '../../../common/auxiliaryFunctions'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { LineInput } from '../../LineInput'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { BackButton } from '../../_buttons/BackButton'
import { SkipButton } from '../../_buttons/SkipButton'

interface PostTimeProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	editMode?: boolean
	startDate?: Date
	endDate?: Date
	startTime?: Date
	initialValue?: Date | string
	keyboardOpened: boolean
	navigateBackwards: () => void
	skipScreen?: () => void
	saveTime: (hour: string, minutes: string) => void
}

function PostTime({
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	editMode,
	startDate,
	endDate,
	startTime,
	initialValue,
	keyboardOpened,
	navigateBackwards,
	skipScreen,
	saveTime
}: PostTimeProps) {
	const initialTime = initialValue ? formatHour(initialValue as Date) : false

	const [hours, setHours] = useState<string>(initialTime ? initialTime.split(':')[0] : '')
	const [minutes, setMinutes] = useState<string>(initialTime ? initialTime.split(':')[1] : '')
	const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
	const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
	const [invalidTimeAfterSubmit, setInvalidTimeAfterSubmit] = useState<boolean>(false)

	useEffect(() => {
		const hoursValidation = validateHours(hours)
		const minutesValidation = validateMinutes(minutes)
		setHoursIsValid(hoursValidation)
		setMinutesIsValid(minutesValidation)
	}, [hours, minutes, keyboardOpened])

	const inputRefs = {
		hoursInput: useRef<TextInput>(null),
		minutesInput: useRef<TextInput>(null)
	}

	const validateHours = (text: string) => {
		const isValid = text.length === 2 && parseInt(text) < 24
		if (isValid) {
			return true
		}
		return false
	}

	const validateMinutes = (text: string) => {
		const isValid = text.length === 2 && parseInt(text) < 60
		if (isValid) {
			return true
		}
		return false
	}

	const endTimeIsBiggerOfStartTime = () => {
		if (!startTime) return true

		const registredStartHour = new Date(startTime)
		const endHour = new Date()
		endHour.setHours(parseInt(hours), parseInt(minutes))
		return registredStartHour.getTime() < endHour.getTime()
	}

	const closingDateTimeIsAfterOpening = () => {
		if (editMode) return true
		const registredStartDate = new Date(startDate as Date)
		const registredEndDate = new Date(endDate as Date)
		registredStartDate.setHours(startTime?.getHours() || 0, startTime?.getMinutes() || 0)
		registredEndDate.setHours(parseInt(hours), parseInt(minutes))
		console.log(registredStartDate)
		console.log(registredEndDate)
		console.log(registredStartDate.getTime() < registredEndDate.getTime())
		console.log(registredStartDate < registredEndDate)
		registredEndDate.getTime()
		return registredStartDate.getTime() < registredEndDate.getTime()
	}

	const savePostTime = () => {
		if (editMode) {
			saveTime(hours, minutes)
			return
		}

		if (startDate && endDate) {
			if (!closingDateTimeIsAfterOpening()) {
				setInvalidTimeAfterSubmit(true)
				return
			}
		}

		if (startTime && !startDate && !endDate) {
			if (!endTimeIsBiggerOfStartTime()) {
				setInvalidTimeAfterSubmit(true)
				return
			}
		}
		saveTime(hours, minutes)
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = invalidTimeAfterSubmit

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
			<StatusBar backgroundColor={invalidTimeAfterSubmit ? theme.red2 : backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={!invalidTimeAfterSubmit ? relativeScreenHeight(24) : relativeScreenHeight(28)}
				relativeHeight={!invalidTimeAfterSubmit ? relativeScreenHeight(24) : relativeScreenHeight(28)}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={
						invalidTimeAfterSubmit
							? 'o horário informado antecede o horário de início'
							: customTitle || 'que horas você começa?'
					}
					highlightedWords={
						invalidTimeAfterSubmit
							? ['antecede', 'horário', 'de', 'início']
							: customHighlight || ['que', 'horas', 'começa']
					}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<InputsContainer>
					<LineInput
						value={hours}
						relativeWidth={'40%'}
						textInputRef={inputRefs.hoursInput}
						nextInputRef={inputRefs.minutesInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={validationColor}
						validBorderBottomColor={theme.black4}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.black4}
						maxLength={2}
						fontSize={22}
						placeholder={'08'}
						keyboardType={'decimal-pad'}
						invalidTextAfterSubmit={invalidTimeAfterSubmit}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateHours(text)}
						onChangeText={(text: string) => {
							setHours(text)
							invalidTimeAfterSubmit && setInvalidTimeAfterSubmit(false)
						}}
					/>
					<TwoPoints>{':'}</TwoPoints>
					<LineInput
						value={minutes}
						relativeWidth={'40%'}
						textInputRef={inputRefs.minutesInput}
						previousInputRef={inputRefs.hoursInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={validationColor}
						validBorderBottomColor={theme.black4}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.black4}
						maxLength={2}
						fontSize={22}
						placeholder={'00'}
						keyboardType={'decimal-pad'}
						lastInput
						invalidTextAfterSubmit={invalidTimeAfterSubmit}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateMinutes(text)}
						onChangeText={(text: string) => {
							setMinutes(text)
							invalidTimeAfterSubmit && setInvalidTimeAfterSubmit(false)
						}}
					/>

				</InputsContainer>
				<ButtonContainer>
					{
						hoursIsValid && minutesIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={savePostTime}
							/>
						)
					}
				</ButtonContainer>
				{
					(!hoursIsValid || !minutesIsValid) && !keyboardOpened
						? (
							<SkipButton onPress={skipScreen} />
						)
						: <></>
				}
			</FormContainer>
		</Container>
	)
}

export { PostTime }
