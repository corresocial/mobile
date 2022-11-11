import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native';
import { getDownloadURL } from 'firebase/storage';

import { Container, InstructionCardContainer } from './styles';
import { theme } from '../../../common/theme';

import updateUser from '../../../services/Firebase/user/updateUser';
import uploadImage from '../../../services/Firebase/common/uploadPicture';
import { ProfilePicturePreviewScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps';
import { LocalUserData } from '../../../contexts/types';
import updateUserPrivateData from '../../../services/Firebase/user/updateUserPrivateData';
import { AuthContext } from '../../../contexts/AuthContext';
import { LoaderContext } from '../../../contexts/LoaderContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { PhotoPortrait } from '../../../components/PhotoPortrait';
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal';
import { screenWidth } from '../../../common/screenDimensions';

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {

	const { setDataOnSecureStore, getDataFromSecureStore } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(true)
	const [profilePicturesPack, setProfilePicturesPack] = useState<string[]>([])
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

	useEffect(() => {
		const user = getRouteParams()
		setProfilePicturesPack(user.profilePictureUrl as string[] || [])
	}, [])

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const navigateToNextScreen = async (tourPerformed: boolean) => {
		setHasServerSideError(false)
		return navigation.navigate('UserStack', { tourPerformed })
	}

	const backToCustomCamera = () => {
		setCameraModalVisibility(true)
		setProfilePicturesPack([])
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const setPictureUri = (pictureUri: string) => {
		setProfilePicturesPack([pictureUri])
	}

	const getRouteParams = () => {
		return { ...route.params }
	}

	const saveUserData = async () => {
		const userData = getRouteParams()
		const localUserJSON = await getDataFromSecureStore('corre.user')

		if (!profilePicturesPack.length) return
		const localUser = JSON.parse(localUserJSON as string)
		setLoaderIsVisible(true)

		await uploadImage(profilePicturesPack[0], 'users', userData.userIdentification.uid)
			.then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change', () => { console.log('Uploading...') }, // Set default load
						(err: any) => { throwServerSideError(err) },
						async () => {
							blob.close()
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async (profilePictureUrl) => {
									await updateUser(userData.userIdentification.uid, {
										name: userData.userName,
										profilePictureUrl: [profilePictureUrl as string],
										tourPerformed: !!localUser.tourPerformed
									})

									await updateUserPrivateData(
										{ cellNumber: userData.cellNumber },
										userData.userIdentification.uid,
										'contacts',
									)

									await saveInSecureStore({
										userId: userData.userIdentification.uid,
										name: userData.userName,
										profilePictureUrl: [profilePictureUrl],
										tourPerformed: !!localUser.tourPerformed,
										userIdentification: userData.userIdentification
									})

									setLoaderIsVisible(false)
									navigateToNextScreen(localUser.tourPerformed)
								})
								.catch(err => throwServerSideError(err))
						},
					);
				},
			)
			.catch(err => {
				setLoaderIsVisible(false)
				throwServerSideError(err)
			})
	}

	const saveInSecureStore = async (userData: LocalUserData) => {
		await setDataOnSecureStore('corre.user', { ...userData })
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

	if (!profilePicturesPack.length && !cameraModalVisibility) {
		navigation.goBack()
	}

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility && !profilePicturesPack.length}
				onClose={() => {
					setCameraModalVisibility(false)
				}}
				setPictureUri={setPictureUri}
			/>
			<DefaultHeaderContainer
				relativeHeight={!hasServerSideError ? '70%' : '68%'}
				centralized
				withoutPadding
				flexDirection='column'
				justifyContent={'space-around'}
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<PhotoPortrait pictureUri={profilePicturesPack[0]} width={screenWidth} height={screenWidth} />
				<InstructionCardContainer>
					<InstructionCard
						flex={0}
						message={getHeaderMessage()}
						highlightedWords={getHeaderHighlightedWords()}
					/>
				</InstructionCardContainer>
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