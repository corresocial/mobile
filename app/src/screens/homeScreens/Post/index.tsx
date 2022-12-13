import React, { useEffect } from 'react'
import { View, BackHandler } from 'react-native'

import { theme } from '../../../common/theme'
import PlusIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { SmallButton } from '../../../components/_buttons/SmallButton'
import { screenHeight } from '../../../common/screenDimensions'

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
			flex: 1, alignItems: 'center', justifyContent: 'center'
		}}
		>
			<SmallButton
				label={'novo post'}
				highlightedWords={['post']}
				fontSize={20}
				color={theme.white3}
				onPress={() => navigation.navigate('SelectPostType')}
				height={screenHeight * 0.1}
				relativeWidth={'70%'}
				SvgIcon={PlusIcon}
			/>
		</View >
	)
}

export { Post }
