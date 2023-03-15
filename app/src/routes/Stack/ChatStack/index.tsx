import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ChatStackParamList } from './types'

import { ChatConversations } from '../../../screens/chatScreens/ChatConversations'

const Stack = createStackNavigator<ChatStackParamList>()

export function ChatStack() {
	return (
		<Stack.Navigator
			initialRouteName={'ChatConversations'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'ChatConversations'} component={ChatConversations} />
		</Stack.Navigator>
	)
}
