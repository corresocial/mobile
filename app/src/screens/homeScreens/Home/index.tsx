import React, { useEffect, useContext } from 'react'
import { View, Text, BackHandler } from 'react-native'

import { theme } from '../../../common/theme'
import PlusIcon from '../../../assets/icons/plusTabIconInactive.svg'

import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { SmallButton } from '../../../components/_buttons/SmallButton'
import { StateContext } from '../../../contexts/StateContext'
import { screenHeight } from '../../../common/screenDimensions'

function Home({ navigation, route }: HomeTabScreenProps) {
	const { toggleTourModalVisibility } = useContext(StateContext)

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
			{
				route.name === 'Post' as any
					? (
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
					)
					: (
						<>
							<Text>{'Você está logado!'}</Text>
							<Text>{'Bem vindo!!'}</Text>
						</>
					)
			}

		</View >
	)
}

export { Home }
