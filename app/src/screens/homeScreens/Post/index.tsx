import React, { useEffect } from 'react'
import { View, BackHandler } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

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
	/* // TODO structure */
	return (
		<View style={{
			flex: 1,
			marginBottom: RFValue(64)
		}}
		>
			<SelectPostType navigation={undefined as any} route={undefined as any} />
			{' '}

		</View >
	)
}

export { Post }
