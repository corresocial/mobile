import React, { useContext, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native';

import { Container } from './styles';
import { theme } from '../../../common/theme';

import updateUser from '../../../services/Firebase/user/updateUser';
import { RegisterUserData } from '../../../contexts/types';
import { AuthContext } from '../../../contexts/AuthContext';
import { LoaderContext } from '../../../contexts/LoaderContext';

import { InsertProfilePictureScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps';
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { UserCollection } from '../../../services/Firebase/types';
import updateUserPrivateData from '../../../services/Firebase/user/updateUserPrivateData';

function InsertProfilePicture({ navigation, route }: InsertProfilePictureScreenProps) {

	const { setDataOnSecureStore, getDataFromSecureStore } = useContext(AuthContext)
	const {setLoaderIsVisible} = useContext(LoaderContext)
	
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

	const navigateToProfilePicture = () => {
		const userData = getRouteParams()

		setHasServerSideError(false)
		navigation.navigate('ProfilePicturePreview', userData)
	}

	const saveUserData = async () => {
		const userData = getRouteParams()
		const localUserJSON = await getDataFromSecureStore('corre.user')
		const localUser = JSON.parse(localUserJSON as string) || {}

		try {
			setLoaderIsVisible(true)
			await saveInFirebase(userData, localUser.tourPerformed)
			await saveInSecureStore(userData, localUser)
			setLoaderIsVisible(false)
			navigateToNextScreen(localUser.tourPerformed)
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			setHasServerSideError(true)
		}
	}

	const saveInFirebase = async (userData: RegisterUserData, tourPerformed: boolean) => {
		await updateUser(userData.userIdentification.uid, {
			name: userData.userName,
			profilePictureUrl: [],
			tourPerformed: !!tourPerformed,
		})

		await updateUserPrivateData(
			{ cellNumber: userData.cellNumber },
			userData.userIdentification.uid,
			'contacts',
		)
	}

	const saveInSecureStore = async (userData: RegisterUserData, localUser: UserCollection) => {
		await setDataOnSecureStore('corre.user', {
			// ...localUser,
			userId: userData.userIdentification.uid,
			name: userData.userName,
			profilePictureUrl: [],
			identification: userData.userIdentification,
		})
	}

	const navigateToNextScreen = (tourPerformed: boolean) => {
		navigation.navigate('UserStack', { tourPerformed })
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
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
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
					onPress={navigateToProfilePicture}
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