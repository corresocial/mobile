import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, Platform, StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'
import { ButtonContainer, Container, InputsContainer, SkipButtonContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'

import { filterLeavingOnlyNumbers, formatHour } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { uploadImage } from '../../../services/firebase/common/uploadPicture'
import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'

import { InsertClosingHourScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PostCollection, ServiceCollection } from '../../../services/firebase/types'
import { LocalUserData, ServiceData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'
import { Loader } from '../../../components/Loader'

function InsertClosingHour({ route, navigation }: InsertClosingHourScreenProps) {
	const { setUserDataOnContext, userDataContext, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { serviceDataContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext, editDataContext } = useContext(EditContext)

	const initialTime = formatHour(route.params?.initialValue as Date)

	const [hours, setHours] = useState<string>(route.params?.initialValue ? initialTime.split(':')[0] : '')
	const [minutes, setMinutes] = useState<string>(route.params?.initialValue ? initialTime.split(':')[1] : '')
	const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
	const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	const [invalidTimeAfterSubmit, setInvalidTimeAfterSubmit] = useState<boolean>(false)
	const [hasServerSideError, setHasServerSideError] = useState<boolean>(false)

	const inputRefs = {
		hoursInput: useRef<React.MutableRefObject<any>>(null),
		minutesInput: useRef<React.MutableRefObject<any>>(null)
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const hoursValidation = validateHours(hours)
		const minutesValidation = validateMinutes(minutes)
		setHoursIsValid(hoursValidation)
		setMinutesIsValid(minutesValidation)
	}, [hours, minutes, keyboardOpened])

	const validateHours = (text: string) => {
		const isValid = text.length === 2 && parseInt(text) < 24
		if (isValid) {
			return true
		}
		return false
	}

	const validateMinutes = (text: string) => {
		const isValid = text.length === 2 && parseInt(text) <= 59
		if (isValid) {
			return true
		}
		return false
	}

	const closingTimeIsAfterOpening = () => {
		if (!serviceDataContext.openingHour && !editDataContext.unsaved.openingHour) return true

		const openingHour = new Date(editDataContext.unsaved.openingHour || serviceDataContext.openingHour as Date)
		const closingHour = new Date()
		closingHour.setHours(parseInt(hours), parseInt(minutes))
		return openingHour.getTime() < closingHour.getTime()
	}

	const getCompleteServiceDataFromContext = () => {
		const closingHour = new Date()
		closingHour.setHours(parseInt(hours), parseInt(minutes))
		return { ...serviceDataContext, closingHour }
	}

	const extractServicePictures = (serviceData: ServiceData) => serviceData.picturesUrl as string[] || []

	const getLocalUser = () => userDataContext

	const showShareModal = (visibility: boolean, postTitle?: string) => {
		setStateDataOnContext({
			showShareModal: visibility,
			lastPostTitle: postTitle
		})
	}

	const saveServicePost = async (skipSaveTime?: boolean) => {
		if (!closingTimeIsAfterOpening()) {
			setInvalidTimeAfterSubmit(true)
			return
		}

		if (editModeIsTrue()) {
			const closingHour = new Date()
			closingHour.setHours(parseInt(hours), parseInt(minutes))
			addNewUnsavedFieldToEditContext({ closingHour })
			navigation.goBack()
			return
		}

		setIsLoading(true)

		const serviceData = skipSaveTime ? { ...serviceDataContext } : getCompleteServiceDataFromContext() as ServiceCollection
		const servicePictures = extractServicePictures(serviceData)

		try {
			const localUser = { ...getLocalUser() }
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			if (!servicePictures.length) {
				const postId = await createPost(serviceData, localUser, 'posts', 'service')
				if (!postId) throw new Error('Não foi possível identificar o post')

				await updateUserPost(
					localUser,
					postId,
					serviceData
				)
				return
			}

			const picturePostsUrls: string[] = []
			servicePictures.forEach(async (servicePicture, index) => {
				uploadImage(servicePicture, 'posts', index).then(
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
											if (picturePostsUrls.length === servicePictures.length) {
												const serviceDataWithPicturesUrl = { ...serviceData, picturesUrl: picturePostsUrls }

												const postId = await createPost(serviceDataWithPicturesUrl, localUser, 'posts', 'service')
												if (!postId) throw new Error('Não foi possível identificar o post')

												await updateUserPost(
													localUser,
													postId,
													serviceDataWithPicturesUrl
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
			setInvalidTimeAfterSubmit(true)
			setHasServerSideError(true)
			setIsLoading(false)
		}
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		serviceDataPost: ServiceData,
	) => {
		const postData = {
			...serviceDataPost,
			postId,
			postType: 'service',
			createdAt: new Date()
		}

		// delete postData.location

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
						} as ServiceCollection
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
				showShareModal(true, serviceDataPost.title)
				navigation.navigate('HomeTab')
			})
			.catch((err: any) => {
				console.log(err)
				setIsLoading(false)
				setHasServerSideError(true)
			})
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) {
			return 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes'
		}
		return invalidTimeAfterSubmit
			? 'O horário de início informado é superior ao horário de encerramento'
			: 'que horas você termina?'
	}

	const getHighlightedHeaderMessage = () => {
		if (hasServerSideError) {
			return ['do', 'nosso', 'lado']
		}
		return invalidTimeAfterSubmit
			? ['horário', 'de', 'início', 'encerramento']
			: ['que', 'horas', 'para', 'termina']
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = invalidTimeAfterSubmit

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.purple2, theme.red2],
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={invalidTimeAfterSubmit ? theme.red2 : theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={invalidTimeAfterSubmit ? relativeScreenHeight(28) : relativeScreenHeight(24)}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={getHeaderMessage()}
					highlightedWords={getHighlightedHeaderMessage()}
				>
					<ProgressBar
						range={5}
						value={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<InputsContainer>
					<LineInput
						value={hours}
						relativeWidth={'40%'}
						textInputRef={inputRefs.hoursInput}
						nextInputRef={inputRefs.minutesInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.purple1}
						validBorderBottomColor={theme.purple5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						invalidTextAfterSubmit={invalidTimeAfterSubmit}
						placeholder={'18'}
						keyboardType={'decimal-pad'}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateHours(text)}
						onChangeText={(text: string) => {
							setHours(text)
							invalidTimeAfterSubmit && setInvalidTimeAfterSubmit(false)
							hasServerSideError && setHasServerSideError(false)
						}}
					/>
					<TwoPoints>{':'}</TwoPoints>
					<LineInput
						value={minutes}
						relativeWidth={'40%'}
						textInputRef={inputRefs.minutesInput}
						previousInputRef={inputRefs.hoursInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.purple1}
						validBorderBottomColor={theme.purple5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						invalidTextAfterSubmit={invalidTimeAfterSubmit}
						placeholder={'00'}
						keyboardType={'decimal-pad'}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateMinutes(text)}
						onChangeText={(text: string) => {
							setMinutes(text)
							invalidTimeAfterSubmit && setInvalidTimeAfterSubmit(false)
							hasServerSideError && setHasServerSideError(false)
						}}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						isLoading
							? <Loader />
							: hoursIsValid && minutesIsValid && !keyboardOpened && (
								<PrimaryButton
									color={invalidTimeAfterSubmit ? theme.red3 : theme.green3}
									iconName={'arrow-right'}
									iconColor={theme.white3}
									label={'continuar'}
									labelColor={theme.white3}
									highlightedWords={['continuar']}
									onPress={saveServicePost}
								/>
							)
					}
				</ButtonContainer>
				{
					(!hoursIsValid || !minutesIsValid) && !keyboardOpened
						? (
							<SkipButtonContainer>
								<PrimaryButton
									flexDirection={'row-reverse'}
									color={theme.yellow3}
									label={'pular'}
									highlightedWords={['pular']}
									labelColor={theme.black4}
									SecondSvgIcon={DeniedWhiteIcon}
									svgIconScale={['40%', '18%']}
									onPress={() => saveServicePost(true)}
								/>
							</SkipButtonContainer>
						)
						: <></>
				}
			</FormContainer>
		</Container>
	)
}

export { InsertClosingHour }
