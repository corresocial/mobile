import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { ButtonContainer, Container, InputsContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertEventStartHourScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { BackButton } from '../../../components/_buttons/BackButton'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertEventStartHour({ navigation }: InsertEventStartHourScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)

	const [hours, setHours] = useState<string>('')
	const [minutes, setMinutes] = useState<string>('')
	const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
	const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		hoursInput: useRef<React.MutableRefObject<any>>(null),
		minutesInput: useRef<React.MutableRefObject<any>>(null)
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

	const saveEventStartHour = () => {
		setCultureDataOnContext({
			eventStartHour: new Date(Date.UTC(0, 0, 0, parseInt(hours), parseInt(minutes), 0, 0))
		})
		navigation.navigate('InsertEventEndDate')
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.blue2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'que horas começa?'}
					highlightedWords={['que', 'horas']}
				>
					<ProgressBar
						range={4}
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
						value={hours}
						relativeWidth={'40%'}
						textInputRef={inputRefs.hoursInput}
						nextInputRef={inputRefs.minutesInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						placeholder={'horas'}
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
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						placeholder={'minutos'}
						keyboardType={'decimal-pad'}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateMinutes(text)}
						onChangeText={(text: string) => setMinutes(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						hoursIsValid && minutesIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								color={theme.green3}
								iconName={'arrow-right'}
								iconColor={theme.white3}
								label={'continuar'}
								labelColor={theme.white3}
								highlightedWords={['continuar']}
								onPress={saveEventStartHour}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertEventStartHour }
