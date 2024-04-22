/* import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { SocialImpactStack } from '../SocialImpactStack'

const Stack = createStackNavigator<any>()

export function PostStack() {
	return (
		<Stack.Navigator
			initialRouteName={'SocialImpactStack'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'SocialImpactStack'} component={SocialImpactStack} />
		</Stack.Navigator>
	)
} */
