import * as Updates from 'expo-updates'
import React, { useContext, useEffect, useState } from 'react'
import { Animated, StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { SplashScreenProps } from '@routes/Stack/AuthRegisterStack/stackScreenProps'

import { Container, LogoContainer } from './styles'
import LogoBuildingIcon from '@assets/icons/logoBuilding.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { relativeScreenWidth, screenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { CustomModal } from '@components/_modals/CustomModal'

function Splash({ route, navigation }: SplashScreenProps) {
	const { hasValidLocalUser, getUserDataFromSecureStore, setRemoteUserOnLocal } = useContext(AuthContext)

	const [imagesSvgOpacity] = useState(new Animated.Value(0))
	const [confirmationModalIsVisible, setConfirmationModalIsVisible] = useState(false)

	const { screen, id: idFromLinking } = route.params

	useEffect(() => {
		console.log(route.params)

		Animated.timing(imagesSvgOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start()

		checkUpdates()
	}, [])

	const checkUpdates = async () => {
		await onFetchUpdateAsync()
	}

	const hasUpdates = async () => {
		// eslint-disable-next-line no-undef
		if (__DEV__) return { isAvailable: false }
		return Updates.checkForUpdateAsync()
	}

	async function onFetchUpdateAsync() {
		try {
			const update = await hasUpdates()
			if (update.isAvailable) {
				setConfirmationModalIsVisible(true)
			} else {
				setTimeout(() => {
					redirectToApp()
				}, 3000)
			}
		} catch (error: any) {
			console.log(error)
			setTimeout(() => {
				redirectToApp()
			}, 3000)
		}
	}

	const navigateToInitialScreen = (userId?: string, userName?: string) => {
		navigation.reset({
			index: 0,
			routes: [{
				name: 'SelectAuthRegister',
				params: { userId, userName }
			}],
		})
	}

	const navigateToProfile = () => {
		navigation.navigate('UserStack', { // TODO userStack
			screen: 'HomeTab',
			params: {
				screen: 'ProfileStack',
				params: {
					screen: 'Profile',
					params: { userId: idFromLinking }
				}
			}
		} as any) // TODO type
	}

	const redirectToApp = async () => {
		try {
			const hasLocalUser = await hasValidLocalUser()

			if (hasLocalUser) {
				const localUser = await getUserDataFromSecureStore(true)
				if (!localUser || (localUser && !localUser.userId)) throw new Error('Autenticação canelada pelo usuário')

				await setRemoteUserOnLocal(localUser.userId, localUser)

				// npx uri-scheme open exp://192.168.1.100:8081/--/com.corresocial.corresocial/redirect/profile/gubzWyXdQFeC5xEaWlTtbaR64tT2 --ios
				// npx uri-scheme open exp://192.168.1.100:8081/--/com.corresocial.corresocial/redirect/post/ID_DO_POST --ios
				if (screen === 'profile' && idFromLinking) {
					return navigateToProfile()
				}

				if (screen === 'post' && idFromLinking) {
					return console.log('Navigate to post')
					// return navigateToProfile()
				}

				navigation.reset({
					index: 0,
					routes: [{
						name: 'UserStack',
						params: { tourPerformed: localUser.tourPerformed }
					}],
				})
			} else {
				const storedUser = await getUserDataFromSecureStore(false, true)
				navigateToInitialScreen(storedUser.userId, storedUser.name)
			}
		} catch (err) {
			console.log(err)
			const storedUser = await getUserDataFromSecureStore(false, true)
			navigateToInitialScreen(storedUser.userId, storedUser.name)
		}
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.orange3} barStyle={'dark-content'} />
			<CustomModal
				visibility={confirmationModalIsVisible}
				title={'atualizar app'}
				TitleIcon={SmartphoneWhiteIcon}
				withoutStatusBar
				closeModal={() => { }}
				firstParagraph={{
					text: 'seu app precisa ser atualizado',
					textAlign: 'center',
					fontSize: 15
				}}
				affirmativeButton={{
					label: 'atualizar',
					onPress: Updates.reloadAsync
				}}
			/>
			<LogoContainer style={{ opacity: imagesSvgOpacity }}>
				<LogoBuildingIcon width={relativeScreenWidth(40)} height={screenHeight} />
			</LogoContainer>
		</Container>
	)
}

export { Splash }
