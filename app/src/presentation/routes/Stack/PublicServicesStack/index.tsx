import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PublicServiceStackParamList } from './types'

import { InsertNIS } from '@screens/publicServicesScreens/InsertNIS'
import { SelectPublicService } from '@screens/publicServicesScreens/SelectPublicService'

const Stack = createStackNavigator<PublicServiceStackParamList>()

export function PublicServicesStack({ route }: any) {
	return (
		<Stack.Navigator
			initialRouteName={'SelectPublicService'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'SelectPublicService'} component={SelectPublicService} />
			<Stack.Screen name={'InsertNIS'} component={InsertNIS} />
		</Stack.Navigator>
	)
}
