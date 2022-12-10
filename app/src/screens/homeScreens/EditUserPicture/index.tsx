import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, InstructionCardContainer } from './styles'
import { screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import ImagePlusIcon from '../../../assets/icons/imagePlus.svg'
import AngleLeftThinIcon from '../../../assets/icons/angleLeftThin.svg'

import { updateUser } from '../../../services/firebase/user/updateUser'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { updateUserPrivateData } from '../../../services/firebase/user/updateUserPrivateData'

import { EditUserPictureScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { LocalUserData } from '../../../contexts/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

function EditUserPicture({ route, navigation }: EditUserPictureScreenProps) {
	const { setRemoteUserOnLocal, setDataOnSecureStore, getDataFromSecureStore } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(false)
	const [profilePictureUrl, setProfilePictureUrl] = useState<string>(route.params.profilePictureUrl)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const backToCustomCamera = () => {
		setCameraModalVisibility(true)
		setProfilePictureUrl('')
	}

	const setPictureUri = (pictureUri: string) => {
		setProfilePictureUrl(pictureUri)
	}

	const saveUserPicture = async () => {
		if (profilePictureUrl === route.params.profilePictureUrl) {
			navigation.goBack()
			return
		}

		try {
			await updateRemoteUser()
		} catch (err) {
			console.log(err)
			setHasServerSideError(true)
		}
	}

	const updateRemoteUser = async () => {
		const { userId } = route.params

		setLoaderIsVisible(true)
		await uploadImage(profilePictureUrl, 'users', userId)
			.then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change',
						() => { console.log('Uploading...') }, // Set default load
						(err: any) => { throwServerSideError(err) },
						async () => {
							blob.close()
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async (profilePictureURL) => {
									await updateDocField(
										'users',
										userId,
										'profilePictureUrl',
										[profilePictureURL]
									)
										.then(async () => {
											await updateLocalUser(profilePictureUrl)
										})
										.catch((err) => {
											console.log(err)
											throw new Error('erro ao atualizar nome remotamente')
										})
									setLoaderIsVisible(false)
									navigation.goBack()
								})
								.catch((err) => throwServerSideError(err))
						},
					)
				},
			)
			.catch((err) => {
				setLoaderIsVisible(false)
				throwServerSideError(err)
			})
	}

	const updateLocalUser = async (profilePicture: string) => {
		const currentLocalUserJSON = await getDataFromSecureStore('corre.user')
		if (!currentLocalUserJSON) throw new Error('erro ao atualizar nome no local')
		const currentLocalUser = JSON.parse(currentLocalUserJSON as string)
		await setDataOnSecureStore('corre.user', { ...currentLocalUser, profilePictureUrl: [profilePicture] })
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
			outputRange: [theme.orange2, theme.red2],
		})
	}

	console.log(route.params)

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility && !profilePictureUrl}
				onClose={() => {
					setCameraModalVisibility(false)
				}}
				setPictureUri={setPictureUri}
			/>
			<DefaultHeaderContainer
				relativeHeight={!hasServerSideError ? '70%' : '68%'}
				centralized
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-around'}
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<PhotoPortrait
					pictureUri={profilePictureUrl}
					width={screenWidth}
					height={screenWidth}
					deleteCurrentPicture={() => setProfilePictureUrl('')}

				/>
				<InstructionCardContainer>
					<PrimaryButton
						color={theme.white3}
						label={'mudar foto'}
						fontSize={22}
						labelColor={theme.black4}
						highlightedWords={['mudar']}
						SecondSvgIcon={ImagePlusIcon}
						svgIconScale={['35%', '20%']}
						onPress={backToCustomCamera}
					/>
				</InstructionCardContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					color={theme.white3}
					label={'voltar'}
					fontSize={18}
					labelColor={theme.black4}
					highlightedWords={['escolher', 'outra']}
					SecondSvgIcon={AngleLeftThinIcon}
					svgIconScale={['32%', '20%']}
					onPress={saveUserPicture}
				/>
			</FormContainer>
		</Container>
	)
}

export { EditUserPicture }
