import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

// import { PollRegisterProvider } from '@contexts/PollRegisterContext'

import { LeaderAreaStackParamList } from './types'

import { LeaderAreaHome } from '@screens/leaderAreaScreens/LeaderAreaHome'

const Stack = createStackNavigator<LeaderAreaStackParamList>()

export function LeaderAreaStack() {
	return (
		// <PollRegisterProvider>
		<Stack.Navigator
			initialRouteName={'LeaderAreaHome'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'LeaderAreaHome'} component={LeaderAreaHome} />
		</Stack.Navigator>
		// </PollRegisterProvider>
	)
}
