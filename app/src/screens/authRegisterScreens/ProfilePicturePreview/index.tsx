import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, InstructionCardContainer } from './styles'
import { screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import AddPictureWhiteIcon from '../../../assets/icons/addPicture-white.svg'

import { updateUser } from '../../../services/firebase/user/updateUser'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { updateUserPrivateData } from '../../../services/firebase/user/updateUserPrivateData'
import { arrayIsEmpty } from '../../../common/auxiliaryFunctions'
import { deleteUserPicture } from '../../../services/firebase/user/deleteUserPicture'
import { updateAllOwnerOnPosts } from '../../../services/firebase/post/updateAllOwnerOnPosts'

import { ProfilePicturePreviewScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'
import { Id, PostCollection, UserCollection } from '../../../services/firebase/types'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal'
import { Loader } from '../../../components/Loader'
import { BackButton } from '../../../components/_buttons/BackButton'

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {
	const { setRemoteUserOnLocal, userDataContext, getDataFromSecureStore } = useContext(AuthContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(true)
	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'está boa?',
			highlightedWords: ['boa']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado']
		}
	}

	useEffect(() => {
		const user = getRouteParams()
		setProfilePicture(user.profilePictureUrl as string[] || [])
	}, [])

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const navigateToNextScreen = async (tourPerformed: boolean) => {
		setHasServerSideError(false)
		return navigation.navigate('UserStack', {
			tourPerformed
		})
	}

	const backToCustomCamera = () => {
		setCameraModalVisibility(true)
		setProfilePicture([])
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
		setProfilePicture([pictureUri])
	}

	const getRouteParams = () => ({
		...route.params
	})

	const saveUserData = async () => {
		const userData = getRouteParams()
		const localUserJSON = await getDataFromSecureStore('corre.user')

		if (!profilePicture.length) return
		const localUser = JSON.parse(localUserJSON as string)
		setIsLoading(true)

		if (localUser.profilePictureUrl && localUser.profilePictureUrl.length && localUser.profilePictureUrl[0] === profilePicture[0]) {
			const currentUser: UserCollection = {
				name: userData.userName,
				profilePictureUrl: profilePicture,
				tourPerformed: !!localUser.tourPerformed,
			}

			if (!localUser.createdAt) {
				currentUser.createdAt = new Date()
			}

			await updateUser(userData.userIdentification.uid, currentUser)
			await updateUserPrivateData(
				{ cellNumber: userData.cellNumber },
				userData.userIdentification.uid,
				'contacts',
			)

			await setRemoteUserOnLocal(userData.userIdentification.uid)

			setIsLoading(false)
			navigateToNextScreen(localUser.tourPerformed)
			return
		}

		await uploadImage(profilePicture[0], 'users')
			.then(
				({ uploadTask, blob }: any) => {
					uploadTask.on(
						'state_change',
						() => { },
						(err: any) => { throwServerSideError(err) },
						async () => {
							blob.close()
							getDownloadURL(uploadTask.snapshot.ref)
								.then(async (profilePictureUrl) => {
									const currentUser: UserCollection = {
										name: userData.userName,
										profilePictureUrl: [profilePictureUrl as string],
										tourPerformed: !!localUser.tourPerformed,
									}

									if (!localUser.createdAt) {
										currentUser.createdAt = new Date()
									}

									await updateUser(userData.userIdentification.uid, currentUser)
									await updateUserPrivateData(
										{
											cellNumber: userData.cellNumber
										},
										userData.userIdentification.uid,
										'contacts',
									)

									if (!arrayIsEmpty(userDataContext.profilePictureUrl)) {
										await deleteUserPicture(userDataContext.profilePictureUrl || [])
										await updateAllOwnerOnPosts(
											{ ...currentUser },
											userDataContext.posts?.map((post: PostCollection) => post.postId) as Id[]
										)
									}

									await setRemoteUserOnLocal(userData.userIdentification.uid)

									setIsLoading(false)
									navigateToNextScreen(localUser.tourPerformed)
								})
								.catch((err) => {
									setIsLoading(false)
									throwServerSideError(err)
								})
						},
					)
				},
			)
			.catch((err) => {
				setIsLoading(false)
				throwServerSideError(err)
			})
	}

	const navigateBackwards = () => navigation.goBack()

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

	if (!profilePicture.length && !cameraModalVisibility) {
		navigateBackwards()
	}

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility && !profilePicture.length}
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
				<InstructionCardContainer>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						flex={1}
						message={getHeaderMessage()}
						highlightedWords={getHeaderHighlightedWords()}
					/>
				</InstructionCardContainer>
				<PhotoPortrait pictureUri={profilePicture[0]} width={screenWidth} height={screenWidth} />
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white3}>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.green3}
									flexDirection={'row-reverse'}
									SvgIcon={CheckWhiteIcon}
									label={'tá ótima, bora'}
									labelColor={theme.white3}
									highlightedWords={['bora']}
									onPress={saveUserData}
								/>
								<PrimaryButton
									color={theme.yellow3}
									SvgIcon={AddPictureWhiteIcon}
									label={'nem, escolher outra'}
									labelColor={theme.black4}
									highlightedWords={['escolher', 'outra']}
									onPress={backToCustomCamera}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { ProfilePicturePreview }
