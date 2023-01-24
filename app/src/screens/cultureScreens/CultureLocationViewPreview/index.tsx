import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'
import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import Uncheck from '../../../assets/icons/uncheck.svg'
import Check from '../../../assets/icons/check.svg'
import MapPointOrange from '../../../assets/icons/mapPoint-orange.svg'
import Eye from '../../../assets/icons/eye.svg'
import EyeHalfTraced from '../../../assets/icons/eyeHalfTraced.svg'
import EyeTraced from '../../../assets/icons/eyeTraced.svg'

import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { updatePostPrivateData } from '../../../services/firebase/post/updatePostPrivateData'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { getLocationViewTitle, getLocationViewDescription, getLocationViewHighlightedWords } from '../../../utils/locationMessages'

import { CultureLocationViewPreviewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureCollection, LocationViewType, PostCollection, PrivateAddress } from '../../../services/firebase/types'
import { CultureData, LocalUserData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { CultureContext } from '../../../contexts/CultureContext'

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

	const [locationViewSelected, setLocationViewSelected] = useState<LocationViewType>()
	const [markerCoordinate] = useState({
		...cultureDataContext?.address?.coordinates,
		...defaultDeltaCoordinates
	})
	const [hasServerSideError, setHasServerSideError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const locationView = getLocationViewFromRouteParams()
		setLocationViewSelected(locationView)
	}, [])

	const getLocationViewFromRouteParams = () => route.params.locationView

	const getLocationViewIcon = () => {
		switch (locationViewSelected as LocationViewType) {
			case 'private': return EyeTraced
			case 'approximate': return EyeHalfTraced
			case 'public': return Eye
			default: return MapPointOrange
		}
	}

	const saveLocation = async () => {
		setCultureDataOnContext({
			locationView: locationViewSelected
		})
		if (cultureDataContext.cultureType === 'eventPost') {
			navigation.navigate('SelectEventRepeat')
		} else {
			await saveCulturePost()
		}
	}

	const getCompleteCultureDataFromContext = () => ({
		...cultureDataContext,
	})

	const extractCultureAddress = (cultureData: CultureData) => ({
		...cultureData.address
	} as PrivateAddress)

	const extractCultureDataPost = (cultureData: CultureData) => {
		const currentCultureData = { ...cultureData, locationView: locationViewSelected }
		delete currentCultureData.address

		return {
			...currentCultureData as CultureCollection
		}
	}

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

		const completeCultureData = getCompleteCultureDataFromContext()
		setCultureDataOnContext({
			...completeCultureData
		})

		const cultureAddress = extractCultureAddress(completeCultureData)
		const cultureDataPost = extractCultureDataPost(completeCultureData)
		const culturePictures = extractCulturePictures(completeCultureData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			const postId = await createPost(cultureDataPost, localUser, 'cultures', 'culture')
			if (!postId) throw new Error('Não foi possível identificar o post')

			if (!culturePictures.length) {
				await updateUserPost(
					localUser,
					postId,
					cultureDataPost,
					culturePictures
				)

				await updatePostPrivateData(
					{
						...cultureAddress,
						postType: 'culture',
						locationView: cultureDataPost.locationView
					},
					postId,
					'cultures',
					`address${postId}`
				)
				return
			}

			const picturePostsUrls: string[] = []
			culturePictures.forEach(async (culturePicture, index) => {
				uploadImage(culturePicture, 'cultures', postId, index).then(
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
												await updateUserPost(
													localUser,
													postId,
													cultureDataPost,
													picturePostsUrls
												)

												await updateDocField(
													'cultures',
													postId,
													'picturesUrl',
													picturePostsUrls,
												)

												await updatePostPrivateData(
													{
														...cultureAddress,
														postType: 'culture',
														locationView: cultureDataPost.locationView
													},
													postId,
													'cultures',
													`address${postId}`
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
		cultureDataPost: CultureData,
		picturePostsUrls: string[],
	) => {
		const postData = {
			...cultureDataPost,
			postId,
			postType: 'culture',
			picturesUrl: picturePostsUrls,
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
				relativeHeight={'25%'}
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
					CustomMarker={getLocationViewIcon()}
					locationView={locationViewSelected}
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
