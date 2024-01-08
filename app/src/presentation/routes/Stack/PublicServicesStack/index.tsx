import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PublicServiceStackParamList } from './types'

import { InsertNIS } from '@screens/publicServicesScreens/InsertNIS'

const Stack = createStackNavigator<PublicServiceStackParamList>()

export function PublicServicesStack({ route }: any) {
	return (
		<Stack.Navigator
			initialRouteName={'InsertNIS'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'InsertNIS'} component={InsertNIS} />
		</Stack.Navigator>
	)
}
