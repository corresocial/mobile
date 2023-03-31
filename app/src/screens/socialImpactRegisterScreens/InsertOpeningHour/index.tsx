import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { theme } from '@common/theme'
import { screenHeight, statusBarHeight } from '@common/screenDimensions'

import {
	filterLeavingOnlyNumbers,
	formatHour,
} from '@common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'

import { InsertOpeningHourScreenProps } from '@routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '@contexts/SocialImpactContext'
import { EditContext } from '@contexts/EditContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { LineInput } from '@components/LineInput'
import { BackButton } from '@components/_buttons/BackButton'
import { ProgressBar } from '@components/ProgressBar'
import {
	ButtonContainer,
	Container,
	InputsContainer,
	TwoPoints,
} from './styles'

function InsertOpeningHour({
	route,
	navigation,
}: InsertOpeningHourScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const initialTime = formatHour(route.params?.initialValue)

	const [hours, setHours] = useState<string>(
		route.params?.initialValue ? initialTime.split(':')[0] : ''
	)
	const [minutes, setMinutes] = useState<string>(
		route.params?.initialValue ? initialTime.split(':')[1] : ''
	)
	const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
	const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		hoursInput: useRef<React.MutableRefObject<any>>(null),
		minutesInput: useRef<React.MutableRefObject<any>>(null),
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
		const hoursValidation = validateHours(hours)
		const minutesValidation = validateMinutes(minutes)
		setHoursIsValid(hoursValidation)
		setMinutesIsValid(minutesValidation)
	}, [hours, minutes, keyboardOpened])

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

	const saveOppeningHour = () => {
		const openingHour = new Date()
		openingHour.setHours(parseInt(hours), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ openingHour })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ openingHour })
		navigation.navigate('InsertClosingHour')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar
				backgroundColor={theme.pink2}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.pink2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'que horas começa?'}
					highlightedWords={['que', 'horas']}
				>
					<ProgressBar range={5} value={5} />
				</InstructionCard>
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
						validBackgroundColor={theme.pink1}
						validBorderBottomColor={theme.pink5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						placeholder={'08'}
						keyboardType={'decimal-pad'}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateHours(text)}
						onChangeText={(text: string) => setHours(text)}
					/>
					<TwoPoints>{':'}</TwoPoints>
					<LineInput
						value={minutes}
						relativeWidth={'40%'}
						textInputRef={inputRefs.minutesInput}
						previousInputRef={inputRefs.hoursInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.pink1}
						validBorderBottomColor={theme.pink5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						placeholder={'00'}
						keyboardType={'decimal-pad'}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateMinutes(text)}
						onChangeText={(text: string) => setMinutes(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{hoursIsValid && minutesIsValid && !keyboardOpened && (
						<PrimaryButton
							color={theme.green3}
							iconName={'arrow-right'}
							iconColor={theme.white3}
							label={'continuar'}
							labelColor={theme.white3}
							highlightedWords={['continuar']}
							onPress={saveOppeningHour}
						/>
					)}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertOpeningHour }
