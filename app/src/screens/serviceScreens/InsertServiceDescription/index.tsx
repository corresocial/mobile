import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Check from '../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertServiceDescriptionScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { EditContext } from '../../../contexts/EditContext'
import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function InsertServiceDescription({ route, navigation }: InsertServiceDescriptionScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { setEditDataOnContext } = useContext(EditContext)

	const [serviceDescription, setServiceDescription] = useState<string>(route.params?.initialValue || '')
	const [serviceDescriptionIsValid, setServiceDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		serviceDescriptionInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateServiceDescription(serviceDescription)
		setServiceDescriptionIsValid(validation)
	}, [serviceDescription, keyboardOpened])

	const validateServiceDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveServiceDescription = () => {
		if (serviceDescriptionIsValid) {
			if (editModeIsTrue()) {
				setEditDataOnContext({
					description: serviceDescription
				})
				navigation.goBack()
				return
			}

			setServiceDataOnContext({
				description: serviceDescription
			})
			navigation.navigate('InsertServiceName')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={screenHeight * 0.28}
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'escreva uma descrição para o seu serviço'}
					highlightedWords={['descrição', 'seu', 'serviço']}
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
					value={serviceDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={2}
					textInputRef={inputRefs.serviceDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.purple1}
					validBorderBottomColor={theme.purple5}
					multiline
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: trabalho de mecânico, tenho 33 anos, etc...'}
					keyboardType={'default'}
					textIsValid={serviceDescriptionIsValid && !keyboardOpened}
					validateText={(text: string) => validateServiceDescription(text)}
					onChangeText={(text: string) => setServiceDescription(text)}
				/>
				<ButtonsContainer>
					{
						serviceDescriptionIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveServiceDescription}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertServiceDescription }
