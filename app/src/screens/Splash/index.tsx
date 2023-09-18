import React, { useContext, useEffect, useState } from 'react'
import { Animated } from 'react-native'

import { Container, LogoContainer } from './styles'
import { relativeScreenWidth, screenHeight } from '../../common/screenDimensions'
import LogoBuildingIcon from '../../assets/icons/logoBuilding.svg'

import { SplashScreenProps } from '../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { AuthContext } from '../../contexts/AuthContext'

function Splash({ navigation }: SplashScreenProps) {
	const { hasValidLocalUser, getDataFromSecureStore, setRemoteUserOnLocal } = useContext(AuthContext)

	const [imagesSvgOpacity] = useState(new Animated.Value(0))

	useEffect(() => {
		Animated.timing(imagesSvgOpacity, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start()

		setTimeout(() => {
			redirectToApp()
		}, 1000)
	}, [])

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
				const localUser = await getDataFromSecureStore(true)
				await setRemoteUserOnLocal(localUser.userId, localUser)
				navigation.navigate('UserStack', { tourPerformed: localUser.tourPerformed })
			} else {
				const storedUser = await getDataFromSecureStore(false, true)
				navigateToInitialScreen(storedUser.userId, storedUser.name)
			}
		} catch (err) {
			console.log(err)
			const storedUser = await getDataFromSecureStore(false, true)
			navigateToInitialScreen(storedUser.userId, storedUser.name)
		}
	}

	return (
		<Container>
			<LogoContainer style={{ opacity: imagesSvgOpacity }}>
				<LogoBuildingIcon width={relativeScreenWidth(40)} height={screenHeight} />
			</LogoContainer>
		</Container>
	)
}

export { Splash }
