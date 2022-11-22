import React, { useEffect } from 'react'
import { View, Text, BackHandler } from 'react-native'

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

function Home({navigation}: HomeTabScreenProps) {
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	})

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		} else {
			return false
		}
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Você está logado!</Text>
			<Text>Bem vindo!!</Text>
		</View>
	)
}

export { Home }