/* eslint-disable no-undef */
import * as Updates from 'expo-updates'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar } from 'react-native'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { useAuthContext } from '@contexts/AuthContext'

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

	const [confirmationModalIsVisible, setConfirmationModalIsVisible] = useState(false)

	const { isChecking, isDownloading, isUpdatePending } = Updates.useUpdates()

	useEffect(() => {
		checkUpdates()
		checkCacheImageValidation()
	}, [])

	const hasUpdates = async () => {
		if (__DEV__) return { isAvailable: false }
		return Updates.checkForUpdateAsync()
	}

	async function checkUpdates() {
		try {
			const updatesIsAvailable = await hasUpdates()

			if (updatesIsAvailable.isAvailable) {
				await Updates.fetchUpdateAsync()
				return setConfirmationModalIsVisible(true)
			}
			return redirectToApp()
		} catch (error: any) {
			console.log(error)
			return redirectToApp()
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

	const navigateToPost = (id: string) => {
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
		navigation.navigate('PostViewHome' as any, { redirectedPostId: id })
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
						return navigateToPost(route.params.id)
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
			<StatusBar backgroundColor={theme.colors.orange[3]} barStyle={'dark-content'} />
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
			{
				isUpdatePending || isChecking || isDownloading
					? (
						<LogoContainer >
							<ActivityIndicator size={'large'} color={theme.colors.black[4]} />
						</LogoContainer>
					)
					: (
						<LogoContainer >
							<LogoBuildingIcon width={relativeScreenWidth(40)} height={screenHeight} />
							<ActivityIndicator size={'large'} color={theme.colors.orange[3]} />
						</LogoContainer>
					)
			}
		</Container>
	)
}

export { Splash }
