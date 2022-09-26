import React, { useContext, useRef, useState } from 'react'
import { Animated } from 'react-native';
import { getDownloadURL } from 'firebase/storage';

import { Container } from './styles';
import { theme } from '../../common/theme';

import updateUser from '../../services/Firebase/user/update';
import { AuthContext } from '../../contexts/AuthContext';

import { UserCollection } from '../../services/Firebase/user/types';
import { ProfilePicturePreviewScreenProps } from '../../routes/Stack/stackScreenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { PhotoPortrait } from '../../components/PhotoPortrait';
import uploadImage from '../../services/Firebase/user/upload';

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {

	const { setDataOnSecureStore, getDataFromSecureStore } = useContext(AuthContext)

	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'ficou boa ?',
			highlightedWords: ['boa']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado,']
		}
	}

	const getRouteParams = () => {
		return { ...route.params }
	}

	const saveUserData = async () => {
		//navigateToNextScreen()
		const userData = getRouteParams() // TODO uncoment

		if (!userData.profilePictureUri) return

		await uploadImage(userData.profilePictureUri, 'users', userData.userIdentification.uid)
			.then(
				({ uploadTask, blob }: any) => { // TODO Type
					uploadTask.on(
						'state_change', () => { console.log('Uploading...') }, // Set default load
						(err: any) => { throwServerSideError(err) },
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
								.catch(err => throwServerSideError(err))
						},
					);
				},
			)
			.catch(err => throwServerSideError(err))
	}

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const saveInSecureStore = async (userData: UserCollection) => {
		const localUser = await getObjectLocalUser()
		await setDataOnSecureStore('corre.user', {...localUser, ...userData})
	}

	const getObjectLocalUser = async () => {
		const userJSON = await getDataFromSecureStore('corre.user')
		if (!userJSON) return false
		const userObject = await JSON.parse(userJSON)
		return userObject
	}

	const navigateToNextScreen = async () => {
		setHasServerSideError(false)
		return navigation.navigate('UserStack')
	}

	const backToCustomCamera = () => {
		const userData = getRouteParams()
		navigation.navigate('InsertProfilePicture', userData) //TODO navigation.goBack() do not working
		navigation.navigate('CustomCamera', userData)
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
				relativeHeight={!hasServerSideError ? '65%' : '68%'}
				centralized
				justifyContent={'flex-end'}
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				 <PhotoPortrait pictureUri={route.params.profilePictureUri} />
				<InstructionCard
					message={getHeaderMessage()}
					highlightedWords={getHeaderHighlightedWords()}
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