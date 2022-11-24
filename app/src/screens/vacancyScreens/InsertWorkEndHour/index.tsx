import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, StatusBar } from 'react-native'

import { ButtonContainer, Container, InputsContainer, TwoPoints } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { createPost } from '../../../services/firebase/post/createPost'
import { updateDocField } from '../../../services/firebase/common/updateDocField'
import { updatePostPrivateData } from '../../../services/firebase/post/updatePostPrivateData'
import { filterLeavingOnlyNumbers } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertWorkEndHourScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PostCollection, PrivateAddress } from '../../../services/firebase/types'
import { LocalUserData, VacancyData } from '../../../contexts/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { StateContext } from '../../../contexts/StateContext'
import { LoaderContext } from '../../../contexts/LoaderContext'
import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertWorkEndHour({ navigation }: InsertWorkEndHourScreenProps) {
	const { getDataFromSecureStore, setDataOnSecureStore } = useContext(AuthContext)
	const { setStateDataOnContext } = useContext(StateContext)
	const { setVacancyDataOnContext, vacancyDataContext } = useContext(VacancyContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [hours, setHours] = useState<string>('')
	const [minutes, setMinutes] = useState<string>('')
	const [hoursIsValid, setHoursIsValid] = useState<boolean>(false)
	const [minutesIsValid, setMinutesIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
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
		const workStartHour = new Date(vacancyDataContext.workStartHour as Date)
		const workEndHour = new Date(Date.UTC(0, 0, 0, parseInt(hours), parseInt(minutes), 0, 0))
		return workStartHour.getTime() < workEndHour.getTime()
	}

	const getCompleteVacancyDataFromContext = () => ({
		...vacancyDataContext,
		workEndHour: new Date(Date.UTC(2022, 1, 1, parseInt(hours), parseInt(minutes), 0, 0))
	})

	const extractVacancyAddress = (vacancyData: VacancyData) => ({
		...vacancyData.address
	} as PrivateAddress)

	const extractVacancyDataPost = (vacancyData: VacancyData) => {
		const currentVacancyData = {
			...vacancyData
		}
		delete currentVacancyData.address

		return {
			...currentVacancyData
		} as VacancyData
	}

	const getLocalUser = async () => JSON.parse(await getDataFromSecureStore('corre.user') || '{}')

	const showShareModal = (visibility: boolean) => {
		setStateDataOnContext({
			showShareModal: visibility
		})
	}

	const saveVacancyPost = async () => {
		if (!closingTimeIsAfterOpening()) {
			setInvalidTimeAfterSubmit(true)
			return
		}
		setLoaderIsVisible(true)

		const completeVacancyData = getCompleteVacancyDataFromContext()
		setVacancyDataOnContext({
			...completeVacancyData
		})

		const vacancyAddress = extractVacancyAddress(completeVacancyData)
		const vacancyDataPost = extractVacancyDataPost(completeVacancyData)

		try {
			const localUser = await getLocalUser()
			if (!localUser.userId) throw new Error('Não foi possível identificar o usuário')

			const postId = await createPost(vacancyDataPost, localUser, 'vacancies', 'vacancy')
			if (!postId) throw new Error('Não foi possível identificar o post')

			await updateUserPost(
				localUser,
				postId,
				vacancyDataPost,
			)

			await updatePostPrivateData(
				vacancyAddress,
				postId,
				'vacancies',
				'address'
			)
			return
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			setHasServerSideError(true)
		}
	}

	const updateUserPost = async (
		localUser: LocalUserData,
		postId: string,
		vacancyDataPost: VacancyData,
	) => {
		const postData = {
			...vacancyDataPost,
			postId,
			postType: 'vacancy',
		}

		await updateDocField(
			'users',
			localUser.userId as string,
			'posts',
			postData,
			true,
		)
			.then(() => {
				setDataOnSecureStore('corre.user', {
					...localUser,
					tourPerformed: true,
					posts: [
						localUser.posts ? [...localUser.posts] as PostCollection[] : [],
						{
							...vacancyDataPost,
							postId,
							postType: 'vacancy',
						},
					],
				})
				console.log('Naviguei')
				setLoaderIsVisible(false)
				showShareModal(true)
				navigation.navigate('HomeTab' as any)
			})
			.catch((err: any) => {
				console.log(err)
				setLoaderIsVisible(false)
				setHasServerSideError(true)
			})
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) {
			return 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes'
		}
		return invalidTimeAfterSubmit
			? 'O horário de início informado é superior ao horário de encerramento'
			: 'que horas termina?'
	}

	const getHighlightedHeaderMessage = () => {
		if (hasServerSideError) {
			return ['do', 'nosso', 'lado,']
		}
		return invalidTimeAfterSubmit
			? ['horário', 'de', 'início', 'encerramento']
			: ['que', 'horas']
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
			outputRange: [theme.yellow2, theme.red2],
		})
	}

	return (
		<Container >
			<StatusBar backgroundColor={invalidTimeAfterSubmit ? theme.red2 : theme.yellow2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.27}
				relativeHeight={'22%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
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
						validBackgroundColor={theme.yellow1}
						validBorderBottomColor={theme.yellow5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						invalidTextAfterSubmit={invalidTimeAfterSubmit}
						placeholder={'horas'}
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
						validBackgroundColor={theme.yellow1}
						validBorderBottomColor={theme.yellow5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={2}
						fontSize={22}
						invalidTextAfterSubmit={invalidTimeAfterSubmit}
						placeholder={'minutos'}
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
						hoursIsValid && minutesIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								color={invalidTimeAfterSubmit ? theme.red3 : theme.green3}
								iconName={'arrow-right'}
								iconColor={theme.white3}
								label={'continuar'}
								labelColor={theme.white3}
								highlightedWords={['continuar']}
								onPress={saveVacancyPost}
							/>
						)
					}
				</ButtonContainer>

			</FormContainer>
		</Container>
	)
}

export { InsertWorkEndHour }
