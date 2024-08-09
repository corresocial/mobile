import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, StatusBar, Platform, TextInput } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { InsertNameScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { ButtonContainer, Container, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'

function InsertName({ navigation }: InsertNameScreenProps) {
	const { setUserRegisterDataOnContext } = useContext(AuthContext)

	const [inputName, setInputName] = useState<string>('')
	const [nameIsValid, setInputNameIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [invalidNameAfterSubmit, setInvaliNameAfterSubmit] = useState<boolean>(false)
	const [alreadyLoaded, setAlreadyLoaded] = useState<boolean>(false)
	const inputRefs = {
		nameInput: useRef<TextInput>(null),
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
		if (!alreadyLoaded) {
			setAlreadyLoaded(true)
		}

		const validation = validateName(inputName)
		setInputNameIsValid(validation)
	}, [inputName])

	const validateName = (text: string) => {
		const isValid = (text)?.trim().length >= 1
		if (isValid) {
			setInvaliNameAfterSubmit(false)
			return true
		}
		return false
	}

	const sendUserDataToNextScreen = async () => {
		const userNameIsValid = validateName(inputName)
		if (userNameIsValid) {
			setUserRegisterDataOnContext({ name: inputName.trim() })
			navigation.navigate('ProfilePicturePreview')
		} else {
			!userNameIsValid && setInvaliNameAfterSubmit(true)
		}
	}

	const navigateBackwards = () => navigation.goBack()

	const someInvalidFieldSubimitted = () => invalidNameAfterSubmit

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : theme.colors.green[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : theme.colors.green[2]}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={
						someInvalidFieldSubimitted()
							? 'não deu!\nparece que este nome é \nmuito curto '
							: 'boa! \n\nagora escolha o nome do seu perfil'
					}
					highlightedWords={
						someInvalidFieldSubimitted()
							? ['\nmuito', 'curto']
							: ['boa!', 'nome', 'do', 'seu', 'perfil']
					}
				/>
			</DefaultHeaderContainer>
			<FormContainer >
				<InputsContainer>
					<DefaultInput
						value={inputName}
						relativeWidth={'100%'}
						textInputRef={inputRefs.nameInput}
						defaultBackgroundColor={theme.colors.white[2]}
						validBackgroundColor={theme.colors.green[1]}
						maxLength={50}
						fontSize={16}
						multiline
						lastInput
						invalidTextAfterSubmit={invalidNameAfterSubmit}
						placeholder={'qual é o seu nome?'}
						keyboardType={'default'}
						textIsValid={nameIsValid && !keyboardOpened}
						onChangeText={(text: string) => setInputName(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						nameIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								color={someInvalidFieldSubimitted() ? theme.colors.red[3] : theme.colors.green[3]}
								SecondSvgIcon={CheckWhiteIcon}
								labelColor={theme.colors.white[3]}
								label={'continuar'}
								highlightedWords={['continuar']}
								startsHidden={false}
								onPress={sendUserDataToNextScreen}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertName }
