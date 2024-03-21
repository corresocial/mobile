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

	useEffect(() => {
		console.log(route.params, '<=')
		// view the actual URL
		// console.log(createURL('hello', {}))
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
		} as any) // TODO type
		navigation.navigate('ProfileHome' as any, { userId: id })
	}

	const navigateToPost = (id: string, post: string) => {
		let screenName = ''
		switch (post) {
			case 'income': {
				screenName = 'ViewIncomePostHome'
				break
			}
			case 'culture': {
				screenName = 'ViewCulturePostHome'
				break
			}
			case 'socialimpact': {
				screenName = 'ViewSocialImpactPostHome'
				break
			}
			case 'vacancy': {
				screenName = 'ViewVacancyPostHome'
				break
			}
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
		navigation.navigate(screenName as any, { redirectedPostId: id })
	}

	const redirectToApp = async () => {
		try {
			const hasLocalUser = await hasValidLocalUser()

			if (hasLocalUser) {
				const localUser = await getUserDataFromSecureStore(true)
				if (!localUser || (localUser && !localUser.userId)) throw new Error('Autenticação canelada pelo usuário')

				await setRemoteUserOnLocal(localUser.userId, localUser)

				// npx uri-scheme open exp://192.168.1.102:8081/--/com.corresocial.corresocial/redirect/profile/blAn4iSfycRaAzg7eyKqiO09cI52 --ios
				// npx uri-scheme open exp://192.168.1.102:8081/--/com.corresocial.corresocial/redirect/post/2IK5gKfwKX6qSIiQntu4/socialImpact --ios

				// npx uri-scheme open exp://192.168.1.100:8081/--/com.corresocial.corresocial/redirect/post/ID_DO_POST --ios
				if (route.params?.screen) {
					switch (route.params.screen) {
						case 'profile': {
							return navigateToProfile(route.params.id)
						}
						case 'post': {
							return navigateToPost(route.params.id, route.params.postType)
						}
					}
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
