import * as Updates from 'expo-updates'
import React, { useContext, useEffect, useState } from 'react'
import { Animated, StatusBar } from 'react-native'

import { useUserDomain } from '@domain/user/useUserDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'

import { PostKey } from './types'
import { SplashScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { useAuthenticationService } from '@services/authentication/useAuthenticationService'

import { Container, LogoContainer } from './styles'
import LogoBuildingIcon from '@assets/icons/logoBuilding.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { relativeScreenWidth, screenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { CustomModal } from '@components/_modals/CustomModal'

const { getLocalUserData, getLocalUserDataWithDeviceAuth } = useUserDomain()
const { localStorage } = useUserRepository()

function Splash({ route, navigation }: SplashScreenProps) {
	const { checkCacheImageValidation } = useCacheRepository()

	const { setRemoteUserOnLocal } = useContext(AuthContext)

	const [imagesSvgOpacity] = useState(new Animated.Value(0))
	const [confirmationModalIsVisible, setConfirmationModalIsVisible] = useState(false)

	useEffect(() => {
		Animated.timing(imagesSvgOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start()

		checkCacheImageValidation()
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
				redirectToApp()
			}
		} catch (error: any) {
			console.log(error)
			redirectToApp()
		}
	}

	const navigateToInitialScreen = (userIdentification: { userId?: string, name?: string }) => {
		navigation.reset({
			index: 0,
			routes: [{
				name: 'SelectAuthRegister',
				params: { userId: userIdentification.userId, userName: userIdentification.name }
			}],
		})
	}

	const navigateToProfile = (id: string) => {
		navigation.reset({
			index: 0,
			routes: [{
				name: 'UserStack' as any,
			}],
		})
		navigation.navigate('UserStack', { // TODO userStack
			screen: 'HomeTab',
			params: {
				screen: 'HomeStack',
			}
		} as any)
		navigation.navigate('ProfileHome' as any, { userId: id }) // TODO type
	}

	const navigateToPost = (id: string, postType: PostKey) => {
		const postPages = {
			income: 'ViewIncomePostHome',
			culture: 'ViewCulturePostHome',
			socialimpact: 'ViewSocialImpactPostHome',
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
			const hasLocalUser = await localStorage.hasValidLocalUser()

			if (hasLocalUser) {
				const localUser = await getLocalUserDataWithDeviceAuth(useUserRepository, useAuthenticationService)
				if (!localUser || (localUser && !localUser.userId)) throw new Error('Autenticação canelada pelo usuário')

				await setRemoteUserOnLocal(localUser.userId, localUser)

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

				/* navigation.reset({
					index: 0,
					routes: [{
						name: 'UserStack',
						params: { tourPerformed: localUser.tourPerformed }
					}],
				}) */
			} else {
				const storedUser = await getLocalUserData(useUserRepository)
				if (!storedUser) return
				navigateToInitialScreen(storedUser)
			}
		} catch (error) {
			console.log(error)
			const storedUser = await getLocalUserData(useUserRepository)
			if (!storedUser) return
			navigateToInitialScreen(storedUser)
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
