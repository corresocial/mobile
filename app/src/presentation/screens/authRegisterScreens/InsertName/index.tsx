import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, StatusBar, Platform, TextInput } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { ButtonContainer, Container, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { theme } from '../../../common/theme'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { DefaultInput } from '../../../components/_inputs/DefaultInput'
import { InsertNameScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

function InsertName({ navigation, route }: InsertNameScreenProps) {
	const { userDataContext } = useContext(AuthContext)

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
			getUserName()
			setAlreadyLoaded(true)
		}

		const validation = validateName(inputName)
		setInputNameIsValid(validation)
	}, [inputName])

	const getUserName = async () => {
		const name = userDataContext.name || ''
		setInputName(name)
	}

	const getUserProfilePicture = async () => {
		return userDataContext.profilePictureUrl || []
	}

	const validateName = (text: string) => {
		const isValid = (text)?.trim().length >= 1
		if (isValid) {
			setInvaliNameAfterSubmit(false)
			return true
		}
		return false
	}

	const getRouteParams = () => ({
		...route.params
	})

	const sendUserDataToNextScreen = async () => {
		const userNameIsValid = validateName(inputName)
		if (userNameIsValid) {
			const userData = getRouteParams()
			const profilePictureUrl = await getUserProfilePicture()

			if (profilePictureUrl.length) {
				navigation.navigate('InsertProfilePicture', {
					...userData,
					userName: inputName.trim(),
					profilePictureUrl
				})
				return navigation.navigate('ProfilePicturePreview', {
					...userData,
					userName: inputName.trim(),
					profilePictureUrl
				})
			}
			navigation.navigate('InsertProfilePicture', {
				...userData,
				userName: inputName.trim()
			})
		} else {
			!userNameIsValid && setInvaliNameAfterSubmit(true)
		}
	}

	const navigateBackwards = () => navigation.goBack()

	const someInvalidFieldSubimitted = () => invalidNameAfterSubmit

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = someInvalidFieldSubimitted()

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.green2, theme.red2],
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
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
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.green1}
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
								color={someInvalidFieldSubimitted() ? theme.red3 : theme.green3}
								flexDirection={'row-reverse'}
								SvgIcon={CheckWhiteIcon}
								labelColor={theme.white3}
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
