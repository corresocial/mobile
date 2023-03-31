import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { screenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { updateUser } from '@services/firebase/user/updateUser'
import { uploadImage } from '@services/firebase/common/uploadPicture'
import { updateUserPrivateData } from '@services/firebase/user/updateUserPrivateData'
import { arrayIsEmpty } from '@common/auxiliaryFunctions'
import { deleteUserPicture } from '@services/firebase/user/deleteUserPicture'
import { updateAllOwnerOnPosts } from '@services/firebase/post/updateAllOwnerOnPosts'

import { ProfilePicturePreviewScreenProps } from '@routes/Stack/AuthRegisterStack/stackScreenProps'
import { Id, PostCollection } from '@services/firebase/types'

import { AuthContext } from '@contexts/AuthContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { PhotoPortrait } from '@components/PhotoPortrait'
import { CustomCameraModal } from '@components/_modals/CustomCameraModal'
import { Loader } from '@components/Loader'
import { Container, InstructionCardContainer } from './styles'

function ProfilePicturePreview({
	navigation,
	route,
}: ProfilePicturePreviewScreenProps) {
	const { setRemoteUserOnLocal, userDataContext, getDataFromSecureStore } =		useContext(AuthContext)

	const [cameraModalVisibility, setCameraModalVisibility] =		useState<boolean>(true)
	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'ficou boa?',
			highlightedWords: ['boa'],
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado'],
		},
	}

	useEffect(() => {
		const user = getRouteParams()
		setProfilePicture((user.profilePictureUrl as string[]) || [])
	}, [])

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const navigateToNextScreen = async (tourPerformed: boolean) => {
		setHasServerSideError(false)
		return navigation.navigate('UserStack', {
			tourPerformed,
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
		if (hasServerSideError) { return headerMessages.serverSideError.highlightedWords }
		return headerMessages.instruction.highlightedWords
	}

	const setPictureUri = (pictureUri: string) => {
		setProfilePicture([pictureUri])
	}

	const getRouteParams = () => ({
		...route.params,
	})

	const saveUserData = async () => {
		const userData = getRouteParams()
		const localUserJSON = await getDataFromSecureStore('corre.user')

		if (!profilePicture.length) return
		const localUser = JSON.parse(localUserJSON as string)
		setIsLoading(true)

		await uploadImage(profilePicture[0], 'users')
			.then(({ uploadTask, blob }: any) => {
				uploadTask.on(
					'state_change',
					() => {},
					(err: any) => {
						throwServerSideError(err)
					},
					async () => {
						blob.close()
						getDownloadURL(uploadTask.snapshot.ref)
							.then(async (profilePictureUrl) => {
								const currentUser = {
									name: userData.userName,
									profilePictureUrl: [
										profilePictureUrl as string,
									],
									tourPerformed: !!localUser.tourPerformed,
								}

								await updateUser(
									userData.userIdentification.uid,
									currentUser
								)
								await updateUserPrivateData(
									{
										cellNumber: userData.cellNumber,
									},
									userData.userIdentification.uid,
									'contacts'
								)

								if (
									!arrayIsEmpty(
										userDataContext.profilePictureUrl
									)
								) {
									await deleteUserPicture(
										userDataContext.profilePictureUrl || []
									)
									await updateAllOwnerOnPosts(
										{ ...currentUser },
										userDataContext.posts?.map(
											(post: PostCollection) => post.postId
										) as Id[]
									)
								}

								await setRemoteUserOnLocal(
									userData.userIdentification.uid
								)

								setIsLoading(false)
								navigateToNextScreen(localUser.tourPerformed)
							})
							.catch((err) => throwServerSideError(err))
					}
				)
			})
			.catch((err) => {
				setIsLoading(false)
				throwServerSideError(err)
			})
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

	if (!profilePicture.length && !cameraModalVisibility) {
		navigation.goBack()
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={hasServerSideError ? theme.red2 : theme.green2}
				barStyle={'dark-content'}
			/>
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
				<PhotoPortrait
					pictureUri={profilePicture[0]}
					width={screenWidth}
					height={screenWidth}
				/>
				<InstructionCardContainer>
					<InstructionCard
						flex={0}
						message={getHeaderMessage()}
						highlightedWords={getHeaderHighlightedWords()}
					/>
				</InstructionCardContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<PrimaryButton
							color={theme.green3}
							iconName={'arrow-right'}
							iconColor={theme.white3}
							label={'tá ótima, continuar'}
							labelColor={theme.white3}
							highlightedWords={['continuar']}
							onPress={saveUserData}
						/>
						<PrimaryButton
							color={theme.yellow3}
							iconName={'images'}
							iconColor={theme.black4}
							label={'nem, escolher outra'}
							labelColor={theme.black4}
							highlightedWords={['escolher', 'outra']}
							onPress={backToCustomCamera}
						/>
					</>
				)}
			</FormContainer>
		</Container>
	)
}

export { ProfilePicturePreview }
