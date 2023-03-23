import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ChatStackParamList } from './types'

import { ChatProvider } from '../../../contexts/ChatContext'

import { ChatConversations } from '../../../screens/chatScreens/ChatConversations'
import { Chat } from '../../../screens/chatScreens/Chat'

const Stack = createStackNavigator<ChatStackParamList>()

export function ChatStack() {
	return (
		<ChatProvider>
			<Stack.Navigator
				initialRouteName={'ChatConversations'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'ChatConversations'} component={ChatConversations} />
				<Stack.Screen name={'Chat'} component={Chat} />
			</Stack.Navigator>
		</ChatProvider>
	)
}
