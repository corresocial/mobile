import { Animated, Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Check from '../../../assets/icons/check.svg'

import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { EditUserDescriptionScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'

function EditUserDescription({ route, navigation }: EditUserDescriptionScreenProps) {
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)

	const [profileDescription, setProfileDescription] = useState<string>(route.params.userDescription)
	const [profileDescriptionIsValid, setProfileDescriptionIsValid] = useState<boolean>(false)
	const [invalidDescriptionAfterSubmit, setInvaliDescriptionAfterSubmit] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		profileDescriptionInput: useRef<React.MutableRefObject<any>>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const validation = validateProfileDescription(profileDescription)
		setProfileDescriptionIsValid(validation)
	}, [profileDescription, keyboardOpened])

	const validateProfileDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveUserDescription = async () => {
		try {
			await updateRemoteUser()
			await updateLocalUser()
			navigation.goBack()
		} catch (err) {
			console.log(err)
			setInvaliDescriptionAfterSubmit(true)
		}
	}

	const updateRemoteUser = async () => {
		await updateDocField(
			'users',
			route.params.userId,
			'description',
			profileDescription
		)
			.then(() => true)
			.catch((err) => {
				console.log(err)
				throw new Error('erro ao atualizar nome remotamente')
			})
	}

	const updateLocalUser = async () => {
		setUserDataOnContext({ ...userDataContext, description: profileDescription })
		await setDataOnSecureStore('corre.user', { ...userDataContext, description: profileDescription })
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = invalidDescriptionAfterSubmit

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.purple2, theme.red2],
		})
	}

	return (
		<Container >
			<StatusBar backgroundColor={invalidDescriptionAfterSubmit ? theme.red2 : theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={screenHeight * 0.28}
				relativeHeight={'26%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				{/* <BackButton onPress={() => navigation.goBack()} /> */}
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						invalidDescriptionAfterSubmit
							? 'ops! \nparece que algo deu errado do nosso lado! \npor favor tente novamente em alguns instantes'
							: 'edite a descrição do seu perfil'
					}
					highlightedWords={
						invalidDescriptionAfterSubmit
							? ['ops,', '\nparece', 'que', 'algo', 'deu', 'errado', 'do', 'nosso', 'lado!']
							: ['descrição', 'perfil']
					}
				>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={profileDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={2}
					textInputRef={inputRefs.profileDescriptionInput}
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
					invalidTextAfterSubmit={invalidDescriptionAfterSubmit}
					textIsValid={profileDescriptionIsValid && !keyboardOpened}
					validateText={(text: string) => validateProfileDescription(text)}
					onChangeText={(text: string) => setProfileDescription(text)}
				/>
				<ButtonsContainer>
					{
						profileDescriptionIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row'}
								color={invalidDescriptionAfterSubmit ? theme.red3 : theme.green3}
								label={'salvar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveUserDescription}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { EditUserDescription }
