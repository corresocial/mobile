import React, {useContext, useRef, useState } from 'react'
import { Animated } from 'react-native';

import { Container } from './styles';

import { theme } from '../../common/theme';

import updateUser from '../../services/Firebase/user/update';
import { AuthContext } from '../../contexts/AuthContext';
import { RegisterUserData } from '../ProfilePicturePreview/types';

import { InsertProfilePictureScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { PrimaryButton } from '../../components/PrimaryButton';

function InsertProfilePicture({ navigation, route }: InsertProfilePictureScreenProps) {

	const { setDataOnSecureStore } = useContext(AuthContext)

	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'que tal uma foto de perfil?',
			highlightedWords: ['foto', 'de', 'perfil?']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado,']
		}
	}

	const getRouteParams = () => {
		return { ...route.params }
	}

	const navigateToCustomCamera = () => {
		const userData = getRouteParams()
		setHasServerSideError(false)
		navigation.navigate('CustomCamera', userData)
	}

	const saveUserData = async () => {
		const userData = getRouteParams()

		try {
			await saveInFirebase(userData)
			await saveInSecureStore(userData)
			navigateToNextScreen()
		} catch (err) {
			console.log(err)
			setHasServerSideError(true)
		}
	}

	const saveInFirebase = async (userData: RegisterUserData) => {
		updateUser(userData.userIdentification.uid, {
			name: userData.userName,
		})
	}

	const saveInSecureStore = async (userData: RegisterUserData) => {
		await setDataOnSecureStore('corre.user', userData)
	}

	const navigateToNextScreen = () => {
		navigation.navigate('WelcomeNewUser', { userName: route.params.userName })
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = hasServerSideError

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
		<Container >
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionCard
					message={getHeaderMessage()}
					highlightedWords={getHeaderHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					color={theme.green3}
					iconName={'images'}
					iconColor={theme.white3}
					label='claro, vou adicionar'
					labelColor={theme.white3}
					highlightedWords={['vou', 'adicionar']}
					onPress={navigateToCustomCamera}
				/>
				<PrimaryButton
					color={theme.red3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='nem quero, valew'
					labelColor={theme.white3}
					highlightedWords={['nem', 'quero,']}
					onPress={saveUserData}
				/>
			</FormContainer>
		</Container>
	);
}

export { InsertProfilePicture }