import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'
import Check from '../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSaleTitleScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertSaleTitle({ navigation }: InsertSaleTitleScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)

	const [saleTitle, setSaleTitle] = useState<string>('')
	const [saleTitleIsValid, setSaleTitleIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		titleInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateSaleTitle(saleTitle)
		setSaleTitleIsValid(validation)
	}, [saleTitle, keyboardOpened])

	const validateSaleTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSaleTitle = () => {
		if (saleTitleIsValid) {
			setSaleDataOnContext({
				title: saleTitle
			})
			navigation.navigate('InsertItemDescription')
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={screenHeight * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.green2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'qual vai ser o título do seu anúncio?'}
					highlightedWords={['título', 'anúnciow']}
				>
					<ProgressBar
						range={5}
						value={2}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={saleTitle}
					relativeWidth={'100%'}
					textInputRef={inputRefs.titleInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.green1}
					validBorderBottomColor={theme.green5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: televisão 40"'}
					keyboardType={'default'}
					textIsValid={saleTitleIsValid && !keyboardOpened}
					validateText={(text: string) => validateSaleTitle(text)}
					onChangeText={(text: string) => setSaleTitle(text)}
				/>
				<ButtonsContainer>
					{
						saleTitleIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveSaleTitle}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertSaleTitle }
