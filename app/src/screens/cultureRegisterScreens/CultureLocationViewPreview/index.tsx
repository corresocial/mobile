import React, { useContext, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'
import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import Uncheck from '../../../assets/icons/uncheck.svg'
import Check from '../../../assets/icons/check-white.svg'

import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { getLocationViewTitle, getLocationViewDescription, getLocationViewHighlightedWords, getLocationViewIcon } from '../../../utils/locationMessages'

import { CultureLocationViewPreviewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureCollection, PostCollection } from '../../../services/firebase/types'
import { CultureData, LocalUserData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { Loader } from '../../../components/Loader'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function CultureLocationViewPreview({ navigation, route }: CultureLocationViewPreviewScreenProps) {
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [markerCoordinate] = useState(
		route.params?.editMode
			? {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
			: {
				...cultureDataContext?.location?.coordinates,
				...defaultDeltaCoordinates
			}
	)
	const [hasServerSideError, setHasServerSideError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const saveLocation = async () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ locationView: route.params.locationView })
			navigation.pop(2)
			navigation.goBack()
			return
		}

		setCultureDataOnContext({
			locationView: route.params.locationView
		})
		if (cultureDataContext.cultureType === 'eventPost') {
			navigation.navigate('SelectEventRepeat')
		} else {
			await saveCulturePost()
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	const getCompleteCultureDataFromContext = () => ({ ...cultureDataContext })

	const extractCulturePictures = (cultureData: CultureData) => cultureData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveCulturePost = async () => {
		setIsLoading(true)

		const cultureData = getCompleteCultureDataFromContext()
		const culturePictures = extractCulturePictures(cultureData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!culturePictures.length) {
				const postId = await createPost(cultureData, localUser, 'posts', 'culture')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					cultureData
				)
				return
			}

			const picturePostsUrls: string[] = []
			culturePictures.forEach(async (picturePath, index) => {
				uploadImage(picturePath, 'posts', index).then(
					({ uploadTask, blob }: any) => {
						uploadTask.on(
							'state_change',
							() => { },
							(err: any) => {
								throw new Error(err)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref)
									.then(
										async (downloadURL) => {
											blob.close()
											picturePostsUrls.push(downloadURL)
											if (picturePostsUrls.length === culturePictures.length) {
												const cultureDataWithPicturesUrl = { ...cultureData, picturesUrl: picturePostsUrls }

												const postId = await createPost(cultureDataWithPicturesUrl, localUser, 'posts', 'culture')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													cultureDataWithPicturesUrl
												)
											}
										},
									)
							},
						)
					},
				)
			})
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasServerSideError(true)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		cultureDataPost: CultureData
	) => {
		const postData = {
			...cultureDataPost,
			postId,
			postType: 'culture',
			createdAt: new Date()
		}

		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postData,
			true,
		)
			.then(() => {
				const localUserPosts = localUser.posts ? [...localUser.posts] as PostCollection[] : []
				setUserDataOnContext({
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postData,
							owner: {
								userId: localUser.userId,
								name: localUser.name,
								profilePictureUrl: localUser.profilePictureUrl
							}
						} as CultureCollection
					],
				})
				setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						...localUserPosts,
						{
							...postData,
							owner: {
								userId: localUser.userId,
								name: localUser.name,
								profilePictureUrl: localUser.profilePictureUrl
							}
						},
					],
				})
				setIsLoading(false)
				showShareModal(true, postData.title)
				navigation.navigate('HomeTab' as any)
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasServerSideError(true)
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
			outputRange: [theme.blue2, theme.red2],
		})
	}

	const { locationView } = route.params

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'26%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
				borderBottomWidth={0}
			>
				<InfoCard
					height={'100%'}
					color={theme.white3}
					title={getLocationViewTitle(locationView, hasServerSideError)}
					description={getLocationViewDescription(locationView, hasServerSideError, 'parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes')}
					highlightedWords={getLocationViewHighlightedWords(locationView, hasServerSideError, ['ops!', 'do', 'nosso', 'lado'])}
				/>
			</DefaultHeaderContainer>
			<MapContainer>
				<CustomMapView
					regionCoordinate={markerCoordinate}
					markerCoordinate={markerCoordinate}
					CustomMarker={getLocationViewIcon(route.params.locationView)}
					locationView={route.params.locationView}
				/>
			</MapContainer>
			<ButtonContainerBottom>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									flexDirection={'row-reverse'}
									color={theme.red3}
									label={'não curti, voltar'}
									highlightedWords={['não', 'curti']}
									labelColor={theme.white3}
									fontSize={16}
									SvgIcon={Uncheck}
									svgIconScale={['30%', '20%']}
									onPress={() => navigation.goBack()}
								/>
								<PrimaryButton
									flexDirection={'row-reverse'}
									color={theme.green3}
									label={'isso mesmo, continuar'}
									highlightedWords={['isso', 'mesmo']}
									fontSize={16}
									labelColor={theme.white3}
									SvgIcon={Check}
									svgIconScale={['30%', '20%']}
									onPress={saveLocation}
								/>
							</>
						)
				}
			</ButtonContainerBottom>
		</Container>
	)
}

export { CultureLocationViewPreview }
