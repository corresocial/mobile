import React, { useEffect } from 'react'
import { View, BackHandler, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { theme } from '../../../common/theme'

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { SelectPostType } from '../SelectPostType'

function Post({ navigation, route }: HomeTabScreenProps) {
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	})

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		}
		return false
	}

	return (
		<View style={{
			flex: 1,
			marginBottom: RFValue(64)
		}}
		>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<SelectPostType navigation={navigation as any} route={route as any} />
		</View >
	)
}

export { Post }
