import React, { useEffect } from 'react'
import { View, BackHandler } from 'react-native'

import { HomeTabScreenProps } from '@routes/Stack/UserStack/screenProps'

import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

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
		<View style={{ flex: 1, marginBottom: relativeScreenHeight(7.5) }}>
			<FocusAwareStatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<SelectPostType navigation={navigation as any} route={route as any} />
		</View >
	)
}

export { Post }
