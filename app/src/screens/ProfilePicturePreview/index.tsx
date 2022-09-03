import React, { useContext, useEffect } from 'react'
import { Alert } from 'react-native';

import { Container } from './styles';

import { theme } from '../../common/theme';

import updateUser from '../../services/Firebase/user/update';
import { AuthContext } from '../../contexts/AuthContext';
import { RegisterUserData } from './types';

import { ProfilePicturePreviewScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { PhotoPortrait } from '../../components/PhotoPortrait';
import uploadImage from '../../services/Firebase/user/upload';
import { getDownloadURL, UploadTask } from 'firebase/storage';
import { UserCollection } from '../../services/Firebase/user/types';

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {

	const { setDataOnSecureStore } = useContext(AuthContext)

	const getRouteParams = () => {
		return { ...route.params }
	}

	const saveUserData = async () => {
		const userData = getRouteParams()

		if (!userData.profilePictureUri) return

		await uploadImage(userData.profilePictureUri, 'users', userData.userIdentification.uid)
			.then(
				({ uploadTask, blob }: any) => { // TODO Type
					uploadTask.on(
						'state_change', () => {console.log('Mudando...')}, // Set default load
						(error: any) => { console.log(error) },
						async () => {
							blob.close()
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async (profilePictureURL) => {
									await updateUser(userData.userIdentification.uid, {
										name: userData.userName,
										img_url: [profilePictureURL as string]
									})

									await saveInSecureStore({
										name: userData.userName,
										img_url: [profilePictureURL],
									})

									navigateToNextScreen()

								})
								.catch(err => console.log(err))
						},
					);
				},
			)
			.catch(err => console.log(err))

	}

	const saveInSecureStore = async (userData: UserCollection) => {
		await setDataOnSecureStore('corre.user', userData)
	}

	const navigateToNextScreen = () => {
		return navigation.navigate('WelcomeNewUser', { userName: route.params.userName })
	}

	const backToCustomCamera = () => {
		const userData = {
			...route.params,
		}
		navigation.navigate('InsertProfilePicture', userData) //TODO navigation.goBack() do not working
		navigation.navigate('CustomCamera', userData)
	}

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={'65%'}
				centralized
				justifyContent={'flex-end'}
				backgroundColor={theme.green2}
			>
				<PhotoPortrait pictureUri={route.params.profilePictureUri} />
				<InstructionCard
					message={'ficou boa ?'}
					highlightedWords={['boa']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					color={theme.green3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='tá ótima, continuar'
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					onPress={saveUserData}
				/>
				<PrimaryButton
					color={theme.yellow3}
					iconName={'images'}
					iconColor={theme.black4}
					label='nem, escolher outra'
					labelColor={theme.black4}
					highlightedWords={['escolher', 'outra']}
					onPress={backToCustomCamera}
				/>
			</FormContainer>
		</Container>
	);
}

export { ProfilePicturePreview }