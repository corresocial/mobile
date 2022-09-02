import React, { useContext } from 'react'

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

	const getRouteParams = () => {
		return { ...route.params }
	}

	const navigateToCustomCamera = () => {
		const userData = getRouteParams()
		navigation.navigate('CustomCamera', userData)
	}

	const saveUserData = async () => {
		const userData = getRouteParams()

		await saveInFirebase(userData)
		await saveInSecureStore(userData)
		navigateToNextScreen()
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

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={theme.green2}
			>
				<InstructionCard
					message={'que tal uma foto de perfil?'}
					highlightedWords={['foto', 'de', 'perfil?']}
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