import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, StatusBar, TextInput } from 'react-native'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { ButtonContainer, Container, InputsContainer, TwoPoints } from './styles'
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

const { formatHour } = UiUtils()

interface PostTimeProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
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

	const savePostTime = () => {
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
					fontSize={16}
					message={
						invalidTimeAfterSubmit
							? 'o horário informado antecede o horário de início'
							: customTitle || 'que horas começa?'
					}
					highlightedWords={
						invalidTimeAfterSubmit
							? ['antecede', 'horário', 'de', 'início']
							: customHighlight || ['horas', 'começa']
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
					<DataVisualizerInput></DataVisualizerInput>
					{/* <DefaultInput
						value={hours}
						relativeWidth={'40%'}
						textInputRef={inputRefs.hoursInput}
						nextInputRef={inputRefs.minutesInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={validationColor}
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
					<TwoPoints>{':'}</TwoPoints> */}

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
			</FormContainer>
		</Container>
	)
}

export { PostTime }
