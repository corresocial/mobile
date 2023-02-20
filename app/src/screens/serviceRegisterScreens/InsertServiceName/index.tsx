import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import Check from '../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertServiceNameScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertServiceName({ route, navigation }: InsertServiceNameScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [serviceName, setServiceName] = useState<string>(route.params?.initialValue || '')
	const [serviceNameIsValid, setServiceNameIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		serviceNameInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateServiceName(serviceName)
		setServiceNameIsValid(validation)
	}, [serviceName, keyboardOpened])

	const validateServiceName = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveServiceName = () => {
		if (serviceNameIsValid) {
			if (editModeIsTrue()) {
				addNewUnsavedFieldToEditContext({ title: serviceName })
				navigation.goBack()
				return
			}

			setServiceDataOnContext({
				title: serviceName
			})
			navigation.navigate('InsertServicePicture')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'que serviço você vende?'}
					highlightedWords={['que', 'serviço', 'vende']}
				>
					<ProgressBar
						range={5}
						value={1}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={serviceName}
					relativeWidth={'100%'}
					textInputRef={inputRefs.serviceNameInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.purple1}
					validBorderBottomColor={theme.purple5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: motoboy para entregas'}
					keyboardType={'default'}
					textIsValid={serviceNameIsValid && !keyboardOpened}
					validateText={(text: string) => validateServiceName(text)}
					onChangeText={(text: string) => setServiceName(text)}
				/>
				<ButtonsContainer>
					{
						serviceNameIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveServiceName}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertServiceName }
