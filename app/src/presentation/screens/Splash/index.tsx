/* eslint-disable no-undef */
import * as Application from 'expo-application'
import * as Updates from 'expo-updates'
import React, { useEffect, useState } from 'react'
import { Animated, Linking, Platform, StatusBar } from 'react-native'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { PostKey } from './types'
import { SplashScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'
import { useAuthNavigation } from '@routes/Stack/hooks/useAuthNavigation'

import { Container, LogoContainer } from './styles'
import LogoBuildingIcon from '@assets/icons/logoBuilding.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { relativeScreenWidth, screenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { CustomModal } from '@components/_modals/CustomModal'

const { checkCacheImageValidation } = useCacheRepository()

function Splash({ route, navigation }: SplashScreenProps) {
	const { performQuickSignin } = useAuthContext()
	const { navigateToAuthScreen } = useAuthNavigation()

	const [imagesSvgOpacity] = useState(new Animated.Value(0))
	const [confirmationModalIsVisible, setConfirmationModalIsVisible] = useState(false)
	const [storeUpdateModalIsVisible, setStoreUpdateModalIsVisible] = useState(false)

	useEffect(() => {
		Animated.timing(imagesSvgOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: false
		}).start()

		checkUpdates()
		checkCacheImageValidation()
	}, [])

	const checkUpdates = async () => {
		const otaUpdated = await onFetchUpdateAsync()
		otaUpdated && await checkStoreUpdates()
	}

	const checkStoreUpdates = async () => {
		if (!__DEV__) {
			const mandatoryVersion = { nativeApplicationVersion: '0.9.1', nativeBuildVersion: '64' }
			if (mandatoryVersion.nativeApplicationVersion > (Application.nativeApplicationVersion || '55.55.55')
				|| mandatoryVersion.nativeBuildVersion > (Application.nativeBuildVersion || '5000')) {
				return setStoreUpdateModalIsVisible(true)
			}
		}

		return redirectToApp()
	}

	const navigateToStore = () => {
		if (Platform.OS === 'android') return Linking.openURL('https://play.google.com/store/apps/details?id=com.corresocial.corresocial')
		if (Platform.OS === 'ios') return Linking.openURL('https://apps.apple.com/br/app/corre/id1661370868')
	}

	const hasUpdates = async () => {
		if (__DEV__) return { isAvailable: false }
		return Updates.checkForUpdateAsync()
	}

	async function onFetchUpdateAsync() {
		try {
			const update = await hasUpdates()

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync()
				return setConfirmationModalIsVisible(true)
			}

			return true
		} catch (error: any) {
			console.log(error)
			redirectToApp()
		}
	}

	const navigateToProfile = (id: string) => {
		navigation.reset({
			index: 0,
			routes: [{
				name: 'UserStack' as any,
			}],
		})
		navigation.navigate('UserStack', {
			screen: 'HomeTab',
			params: {
				screen: 'HomeStack',
			}
		} as any)
		navigation.navigate('ProfileHome' as any, { userId: id })
	}

	const navigateToPost = (id: string, postType: PostKey) => {
		const postPages = {
			income: 'ViewIncomePostHome',
			culture: 'ViewCulturePostHome',
			socialImpact: 'ViewSocialImpactPostHome',
			vacancy: 'ViewVacancyPostHome',
		}
		navigation.reset({
			index: 0,
			routes: [{
				name: 'UserStack' as any,
			}],
		})
		navigation.navigate('UserStack', {
			screen: 'HomeTab',
			params: {
				screen: 'HomeStack',
			}
		} as any)
		navigation.navigate(postPages[postType] as any, { redirectedPostId: id })
	}

	const redirectToApp = async () => {
		try {
			const hasDeeplink = !!route.params?.screen
			const authenticated = await performQuickSignin('', true, hasDeeplink)
			if (!authenticated) return navigateToAuthScreen()

			if (hasDeeplink) {
				switch (route.params.screen) {
					case 'profile': {
						return navigateToProfile(route.params.id)
					}
					case 'post': {
						return navigateToPost(route.params.id, route.params.postType as PostKey)
					}
					default: return navigateToAuthScreen()
				}
			}
		} catch (error) {
			console.log(error)
			return navigateToAuthScreen()
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
					onPress: async () => Updates.reloadAsync()
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
					onPress: navigateToStore
				}}
			/>
			<LogoContainer style={{ opacity: imagesSvgOpacity }}>
				<LogoBuildingIcon width={relativeScreenWidth(40)} height={screenHeight} />
			</LogoContainer>
		</Container>
	)
}

export { Splash }
