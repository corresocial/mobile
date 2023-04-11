import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertExchangeValueScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertExchangeValue({ route, navigation }: InsertExchangeValueScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [exchangeValue, setExchangeValue] = useState<string>(route.params?.initialValue || '')
	const [exchangeValueIsValid, setExchangeValueIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		exchangeValueInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateExchangeValue(exchangeValue)
		setExchangeValueIsValid(validation)
	}, [exchangeValue, keyboardOpened])

	const validateExchangeValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveExchangeValue = () => {
		const valueIsValid = validateExchangeValue(exchangeValue)
		if (valueIsValid) {
			if (editModeIsTrue()) {
				addNewUnsavedFieldToEditContext({ exchangeValue })
				navigation.goBack()
				return
			}

			setServiceDataOnContext({
				exchangeValue
			})
			navigation.navigate('SelectLocationView')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={'28%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'o que você aceita em troca?'}
					highlightedWords={['o', 'que', 'em', 'troca']}
				>
					<ProgressBar
						range={5}
						value={3}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={exchangeValue}
					relativeWidth={'100%'}
					textInputRef={inputRefs.exchangeValueInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.purple1}
					validBorderBottomColor={theme.purple5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					fontSize={18}
					lastInput
					textAlign={'left'}
					placeholder={'ex: troco por uma marmita'}
					keyboardType={'default'}
					textIsValid={exchangeValueIsValid && !keyboardOpened}
					validateText={(text: string) => validateExchangeValue(text)}
					onChangeText={(text: string) => setExchangeValue(text)}
				/>
				<ButtonsContainer>
					{
						exchangeValueIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={saveExchangeValue}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertExchangeValue }
