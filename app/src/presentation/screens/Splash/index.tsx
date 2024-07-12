import * as Updates from 'expo-updates'
import React, { useEffect, useState } from 'react'
import { Animated, StatusBar } from 'react-native'

import { sendEvent } from '@newutils/methods/analyticsEvents'

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

	useEffect(() => {
		Animated.timing(imagesSvgOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: false
		}).start()

		checkCacheImageValidation()
		checkUpdates()
		sendEvent('opened_auth_screen', { authType: 'login' }, true)
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
				redirectToApp()
			}
		} catch (error: any) {
			console.log(error)
			performQuickSignin()
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
			const authenticated = await performQuickSignin('', true, true)
			if (!authenticated) return navigateToAuthScreen()

			if (route.params?.screen) {
				console.log(route.params.screen)
				switch (route.params.screen) {
					case 'profile': {
						return navigateToProfile(route.params.id)
					}
					case 'post': {
						return navigateToPost(route.params.id, route.params.postType as PostKey)
					}
				}
			}
		} catch (error) {
			console.log(error)
			await navigateToAuthScreen()
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
