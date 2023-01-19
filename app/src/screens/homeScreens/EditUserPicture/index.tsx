import React, { useContext, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'
import { getDownloadURL } from 'firebase/storage'

import { Container, InstructionCardContainer } from './styles'
import { screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import ImagePlusIcon from '../../../assets/icons/imagePlus.svg'
import AngleLeftThinIcon from '../../../assets/icons/angleLeftThin.svg'

import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { EditUserPictureScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal'
import { updateAllOwnerOnPosts } from '../../../services/firebase/post/updateAllOwnerOnPosts'
import { PostCollection } from '../../../services/firebase/types'

function EditUserPicture({ route, navigation }: EditUserPictureScreenProps) {
	const { userDataContext, setUserDataOnContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(false)
	const [profilePictureUrl, setProfilePictureUrl] = useState<string>(route.params.profilePictureUrl)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const openCamera = () => {
		setCameraModalVisibility(true)
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

		if (!profilePictureUrl) {
			await updateDocField(
				'users',
				userId,
				'profilePictureUrl',
				[]
			)
				.then(async () => {
					await updateLocalUser('')
				})
				.catch((err) => {
					console.log(err)
					throw new Error('erro ao atualizar nome remotamente')
				})

			await updateAllOwnerOnPosts(
				{
					userId: userDataContext.userId as string,
					profilePictureUrl: [],
					name: userDataContext.name as string
				},
				userDataContext.posts?.map((post: PostCollection) => ({ postId: post.postId, postType: post.postType })) as any[] || [] // TODO Type
			)
			setLoaderIsVisible(false)
			navigation.goBack()
			return
		}

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
											await updateLocalUser(profilePictureURL)
										})
										.catch((err) => {
											console.log(err)
											throw new Error('erro ao atualizar nome remotamente')
										})

									await updateAllOwnerOnPosts(
										{
											userId: userDataContext.userId as string,
											profilePictureUrl: [profilePictureURL],
											name: userDataContext.name as string
										},
										userDataContext.posts?.map((post: PostCollection) => ({ postId: post.postId, postType: post.postType })) as any[] || [] // TODO Type
									)
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
		setUserDataOnContext({ ...userDataContext, profilePictureUrl: [profilePicture] })
		await setDataOnSecureStore('corre.user', { ...userDataContext, profilePictureUrl: [profilePicture] })
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

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility}
				onClose={() => {
					setCameraModalVisibility(false)
				}}
				setPictureUri={setPictureUri}
			/>
			<DefaultHeaderContainer
				relativeHeight={'80%'}
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
						onPress={openCamera}
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
