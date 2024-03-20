import React, { useContext, useRef, useState } from 'react'
import { Animated, StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { RegisterUserData } from '@contexts/AuthContext/types'

import { InsertProfilePictureScreenProps } from '@routes/Stack/AuthRegisterStack/stackScreenProps'
import { Id, PostCollection, UserCollection } from '@services/firebase/types'

import { updateAllOwnerOnPosts } from '@services/firebase/post/updateAllOwnerOnPosts'
import { deleteUserPicture } from '@services/firebase/user/deleteUserPicture'
import { updateUser } from '@services/firebase/user/updateUser'
import { updateUserPrivateData } from '@services/firebase/user/updateUserPrivateData'
import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container } from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import xWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

const { arrayIsEmpty } = UiUtils()

function InsertProfilePicture({ navigation, route }: InsertProfilePictureScreenProps) {
	const { userDataContext, getUserDataFromSecureStore, setRemoteUserOnLocal } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'que tal adicionar uma \nfoto de perfil?',
			highlightedWords: ['\nfoto', 'de', 'perfil']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado,']
		}
	}

	const getRouteParams = () => ({
		...route.params
	})

	const navigateToProfilePicture = () => {
		const userData = getRouteParams()

		setHasServerSideError(false)
		navigation.navigate('ProfilePicturePreview', userData)
	}

	const saveUserData = async () => {
		const userData = getRouteParams()
		const localUser = await getUserDataFromSecureStore()

		try {
			setIsLoading(true)
			await saveInFirebase(userData, true, localUser.createdAt)
			// await saveOnLocal(userData, localUser)
			if (!arrayIsEmpty(userDataContext.profilePictureUrl)) {
				await deleteUserPicture(userDataContext.profilePictureUrl || [])
				await updateAllOwnerOnPosts(
					{ profilePictureUrl: [] },
					userDataContext.posts?.map((post: PostCollection) => post.postId) as Id[]
				)
			}

			await setRemoteUserOnLocal(userData.userIdentification.uid)
			setIsLoading(false)
			navigateToNextScreen(false)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasServerSideError(true)
		}
	}

	const saveInFirebase = async (userData: RegisterUserData, tourPerformed: boolean, userCreatedAt?: Date) => { // TODO Type
		const userObject: Partial<UserCollection> = {
			name: userData.userName,
			profilePictureUrl: [],
			tourPerformed: !!tourPerformed
		}

		if (!userCreatedAt) {
			userObject.createdAt = new Date()
		}

		await updateUser(userData.userIdentification.uid, userObject)

		await updateUserPrivateData(
			{ cellNumber: userData.cellNumber || '', email: userData.email || '' },
			userData.userIdentification.uid,
			'contacts',
		)
	}

	const navigateToNextScreen = (tourPerformed?: boolean) => {
		navigation.navigate('UserStack', { tourPerformed })
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
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

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={getHeaderMessage()}
					highlightedWords={getHeaderHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2} justifyContent={'center'}>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.red3}
									SvgIcon={xWhiteIcon}
									label={'não, obrigado'}
									labelColor={theme.white3}
									highlightedWords={['não']}
									onPress={saveUserData}
								/>
								<VerticalSpacing height={relativeScreenHeight(5)} />
								<PrimaryButton
									color={theme.green3}
									flexDirection={'row-reverse'}
									SvgIcon={AddPictureWhiteIcon}
									svgIconScale={['50%', '25%']}
									labelColor={theme.white3}
									label={'opa, claro!'}
									highlightedWords={['claro!']}
									onPress={navigateToProfilePicture}
								/>
							</>
						)
				}
			</FormContainer>
		</Container >
	)
}

export { InsertProfilePicture }
