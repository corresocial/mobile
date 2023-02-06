import React, { useContext, useEffect, useState } from 'react'
import { Animated } from 'react-native'

import {
	Container,
	BuildingsContainer,
	BottomLine,
	LogoContainer
} from './styles'
import { screenHeight, screenWidth } from '../../common/screenDimensions'
import SlumIcon from '../../assets/icons/slum.svg'
import LogoIcon from '../../assets/icons/logo.svg'

import { SplashScreenProps } from '../../routes/Stack/AuthRegisterStack/stackScreenProps'
import { UserData } from '../../contexts/types'

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

	const redirectToApp = async () => {
		try {
			const userJSON = await getDataFromSecureStore('corre.user', true)

			if (localUserIsValid(userJSON)) {
				const userObject: UserData = JSON.parse(userJSON as string)
				await setRemoteUserOnLocal(userObject.userId)
				navigation.navigate('UserStack', {
					tourPerformed: userObject.tourPerformed
				})
			} else {
				// navigation.navigate('AcceptAndContinue')
				// throw 'Usuário não authenticado localmente!' // Faz com que o usuário fique em loop
			}
		} catch (err) {
			navigation.navigate('AcceptAndContinue')
			/* setTimeout(() => { // Faz com que o usuário fique em loop
				redirectToApp()
			}, 3000) */
		}
	}

	const localUserIsValid = (userJSON: any) => {
		try {
			if (!userJSON) return false
			const userObject: UserData = JSON.parse(userJSON as string)
			return Object.keys(userObject).includes('userId') && Object.keys(userObject).includes('name')
		} catch (err) {
			console.log(err)
			return false
		}
	}

	return (
		<Container>
			<LogoContainer style={{
				opacity: imagesSvgOpacity
			}}
			>
				<LogoIcon width={screenWidth * 0.5} height={screenHeight} />
			</LogoContainer>
			<BuildingsContainer style={{
				opacity: imagesSvgOpacity
			}}
			>
				<SlumIcon width={screenWidth * 0.8} height={screenHeight * 0.12} />
			</BuildingsContainer>
			<BottomLine />
		</Container>
	)
}

export { Splash }
