import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { InsertEntryValueScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertEntryValue({ route, navigation }: InsertEntryValueScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [entryValue, setEntryValue] = useState<string>(route.params?.initialValue || '')
	const [entryValueIsValid, setEntryValueIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		entryValueInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateEntryValue(entryValue)
		setEntryValueIsValid(validation)
	}, [entryValue, keyboardOpened])

	const validateEntryValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveEntryValue = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ entryValue })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ entryValue })
		navigation.navigate('SelectEventPlaceModality')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={'28%'}
				centralized
				backgroundColor={theme.blue2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'quanto custa para entrar?'}
					highlightedWords={['quanto', 'custa']}
				>
					<ProgressBar
						range={cultureDataContext.cultureType === 'artistProfile' ? 3 : 5}
						value={2}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={entryValue}
					relativeWidth={'100%'}
					textInputRef={inputRefs.entryValueInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.blue1}
					validBorderBottomColor={theme.blue5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					fontSize={16}
					lastInput
					textAlign={'left'}
					placeholder={'ex: 20 reais + 1kg de alimento'}
					keyboardType={'default'}
					textIsValid={entryValueIsValid && !keyboardOpened}
					validateText={(text: string) => validateEntryValue(text)}
					onChangeText={(text: string) => setEntryValue(text)}
				/>
				<ButtonsContainer>
					{
						entryValueIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={saveEntryValue}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertEntryValue }
