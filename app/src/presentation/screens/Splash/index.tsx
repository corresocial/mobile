import * as Application from 'expo-application'
import * as Device from 'expo-device'
import * as Updates from 'expo-updates'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Animated, BackHandler, Linking, Platform, StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { SplashScreenProps } from '@routes/Stack/AuthRegisterStack/stackScreenProps'

import { Container, LogoContainer } from './styles'
import LogoBuildingIcon from '@assets/icons/logoBuilding.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { relativeScreenWidth, screenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { CustomModal } from '@components/_modals/CustomModal'

// JUST UPDATE Branch v0.6.1

function Splash({ navigation }: SplashScreenProps) {
	const { hasValidLocalUser, getUserDataFromSecureStore, setRemoteUserOnLocal } = useContext(AuthContext)

	const [imagesSvgOpacity] = useState(new Animated.Value(0))
	const [OTAUpdateModalIsVisible, setOTAUpdateModalIsVisible] = useState(false)
	const [storeUpdateModalIsVisible, setStoreUpdateModalIsVisible] = useState(false)

	useEffect(() => {
		Animated.timing(imagesSvgOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start()

		checkUpdates()
	}, [])

	const checkUpdates = async () => {
		await checkStoreUpdates()
		await onFetchUpdateAsync()
	}

	const checkStoreUpdates = async () => {
		// Implementado para corrigir problemas de acesso
		// ao armazenamento em Android 13 no SDK 47(0.6.1)
		try {
			if (applicationRequireUpdate()) {
				showRequiredUpdateModal()
				return false
			}
			return true
		} catch (error: any) {
			Alert.alert('erro', error)
			return true
		}
	}

	const applicationRequireUpdate = () => {
		const platformIsAndroid = Platform.Version
		const currentVersion = Application.nativeApplicationVersion
		const currentDeviceVersion = Device.osVersion
		return platformIsAndroid && (currentDeviceVersion === '13' && currentVersion === '0.6.1') // Trocar para 0.6.1
	}

	const showRequiredUpdateModal = () => {
		setStoreUpdateModalIsVisible(true)
	}

	const redirectToAndroidStore = () => {
		Linking.openURL('https://play.google.com/store/apps/details?id=com.corresocial.corresocial&hl=pt')
		setTimeout(() => {
			BackHandler.exitApp()
		}, 1000)
	}

	async function onFetchUpdateAsync() {
		try {
			const update = await hasUpdates()
			Alert.alert('update.isAvailable', `${update.isAvailable}`)
			if (update.isAvailable) {
				setOTAUpdateModalIsVisible(true)
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

	const hasUpdates = async () => {
		// eslint-disable-next-line no-undef
		if (__DEV__) return { isAvailable: false }
		return Updates.checkForUpdateAsync()
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

	const redirectToApp = async () => {
		try {
			const hasLocalUser = await hasValidLocalUser()

			if (hasLocalUser) {
				const localUser = await getUserDataFromSecureStore(true)
				if (!localUser || (localUser && !localUser.userId)) throw new Error('Autenticação canelada pelo usuário')

				await setRemoteUserOnLocal(localUser.userId, localUser)
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
				visibility={OTAUpdateModalIsVisible}
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
			<CustomModal
				visibility={storeUpdateModalIsVisible}
				title={'atualizar app na loja'}
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
					onPress: redirectToAndroidStore
				}}
			/>
			<LogoContainer style={{ opacity: imagesSvgOpacity }}>
				<LogoBuildingIcon width={relativeScreenWidth(40)} height={screenHeight} />
			</LogoContainer>
		</Container>
	)
}

export { Splash }
