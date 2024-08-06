import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { ChatStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { ChatConversations } from '@screens/chatScreens/ChatConversations'
import { ChatMessages } from '@screens/chatScreens/ChatMessages'
import { Profile } from '@screens/profileScreens/Profile'
import { PostView } from '@screens/viewPostScreens/PostView'

const Stack = createStackNavigator<ChatStackParamList>()

export function ChatStack({ route, navigation }: any) { // REFACTOR type route
	useHomeTabDisplay<'ProfileStack', ChatStackParamList>({
		navigation,
		route,
		screens: ['ChatConversations'],
	})

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
			<Stack.Screen name={'ChatMessages'} component={ChatMessages} />

			{/* REFACTOR conflito de tipagem  das telas que reaproveitam em diferentes stacks */}
			<Stack.Screen name={'ProfileChat'} component={Profile as any} />
			<Stack.Screen name={'PostViewChat'} component={PostView as any} />
		</Stack.Navigator>
	)
}
