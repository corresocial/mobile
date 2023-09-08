import React, { useContext, useEffect, useState } from 'react'
import { Animated } from 'react-native'

import { Container, LogoContainer } from './styles'
import { relativeScreenWidth, screenHeight } from '../../common/screenDimensions'
import LogoBuildingIcon from '../../assets/icons/logoBuilding.svg'

import { SplashScreenProps } from '../../routes/Stack/AuthRegisterStack/stackScreenProps'
import { LocalUserData } from '../../contexts/types'

import { AuthContext } from '../../contexts/AuthContext'

function Splash({ navigation }: SplashScreenProps) {
	const { getDataFromSecureStore, setRemoteUserOnLocal } = useContext(AuthContext)

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

	const navigateToInitialScreen = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'AcceptAndContinue' as any }]
		})
	}

	const redirectToApp = async () => {
		try {
			const userJSON = await getDataFromSecureStore('corre.user', true)

			if (localUserIsValid(userJSON)) {
				const userObject: LocalUserData = JSON.parse(userJSON as string)
				await setRemoteUserOnLocal(userObject.userId, userObject)
				navigation.navigate('UserStack', {
					tourPerformed: userObject.tourPerformed
				})
			} else {
				navigateToInitialScreen()
				// throw 'Usuário não authenticado localmente!' // Faz com que o usuário fique em loop
			}
		} catch (err) {
			navigateToInitialScreen()
			/* setTimeout(() => { // Faz com que o usuário fique em loop
				redirectToApp()
			}, 3000) */
		}
	}

	const localUserIsValid = (userJSON: any) => {
		try {
			if (!userJSON) return false
			const userObject: LocalUserData = JSON.parse(userJSON as string)
			return Object.keys(userObject).includes('userId') && Object.keys(userObject).includes('name')
		} catch (err) {
			console.log(err)
			return false
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
