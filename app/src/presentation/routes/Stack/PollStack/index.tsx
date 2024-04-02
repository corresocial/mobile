import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PollRegisterProvider } from '@contexts/PollRegisterContext'

import { PollStackParamList } from './types'

import { InsertPollDescription } from '@screens/pollScreens/InsertPollDescription'

const Stack = createStackNavigator<PollStackParamList>()

export function PollStack() {
	return (
		<PollRegisterProvider>
			<Stack.Navigator
				initialRouteName={'InsertPollDescription'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'InsertPollDescription'} component={InsertPollDescription} />
			</Stack.Navigator>
		</PollRegisterProvider>
	)
}
