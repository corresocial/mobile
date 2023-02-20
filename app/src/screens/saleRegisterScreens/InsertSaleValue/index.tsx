import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'

import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { ButtonsContainer, Container } from './styles'
import Check from '../../../assets/icons/check.svg'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { InsertSaleValueScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
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
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ saleValue })
			navigation.goBack()
		} else {
			setSaleDataOnContext({ saleValue })
		}

		if (route.params.bothPaymentType) {
			navigation.navigate('InsertExchangeValue')
		} else {
			navigation.navigate('SelectLocationView')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(28)}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.green2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
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
					validBackgroundColor={theme.green1}
					validBorderBottomColor={theme.green5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					lastInput
					maxLength={100}
					textAlign={'left'}
					fontSize={18}
					placeholder={'ex: 100'}
					keyboardType={'numeric'}
					filterText={filterLeavingOnlyNumbers}
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
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
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
