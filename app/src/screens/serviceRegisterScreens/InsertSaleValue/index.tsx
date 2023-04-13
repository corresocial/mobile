import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSaleValueScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [saleValue, setSaleValue] = useState<string>(route.params?.initialValue || '')
	const [saleValueIsValid, setSaleValueIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		saleValueInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateSaleValue(saleValue)
		setSaleValueIsValid(validation)
	}, [saleValue, keyboardOpened])

	const validateSaleValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSaleValue = () => {
		if (saleValueIsValid) {
			if (editModeIsTrue()) {
				addNewUnsavedFieldToEditContext({ saleValue })
				navigation.goBack()
				return
			}

			setServiceDataOnContext({ saleValue })
			if (route.params.bothPaymentType) {
				navigation.navigate('InsertExchangeValue')
			} else {
				navigation.navigate('SelectServiceRange')
			}
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(22)}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'por quanto você vende?'}
					highlightedWords={['quanto']}
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
					value={saleValue}
					relativeWidth={'100%'}
					textInputRef={inputRefs.saleValueInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.purple1}
					validBorderBottomColor={theme.purple5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					lastInput
					maxLength={100}
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: 15 reais a hora'}
					keyboardType={'default'}
					textIsValid={saleValueIsValid && !keyboardOpened}
					validateText={(text: string) => validateSaleValue(text)}
					onChangeText={(text: string) => setSaleValue(text)}
				/>
				<ButtonsContainer>
					{
						saleValueIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={saveSaleValue}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertSaleValue }
