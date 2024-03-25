import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { ChatStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { ChatConversations } from '@screens/chatScreens/ChatConversations'
import { ChatMessages } from '@screens/chatScreens/ChatMessages'
import { Profile } from '@screens/profileScreens/Profile'
import { ViewCulturePost } from '@screens/viewPostScreens/ViewCulturePost'
import { ViewIncomePost } from '@screens/viewPostScreens/ViewIncomePost'
import { ViewSocialImpactPost } from '@screens/viewPostScreens/ViewSocialImpactPost'
import { ViewVacancyPost } from '@screens/viewPostScreens/ViewVacancyPost'

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
			<Stack.Screen name={'ViewIncomePostChat'} component={ViewIncomePost as any} />
			<Stack.Screen name={'ViewVacancyPostChat'} component={ViewVacancyPost as any} />
			<Stack.Screen name={'ViewSocialImpactPostChat'} component={ViewSocialImpactPost as any} />
			<Stack.Screen name={'ViewCulturePostChat'} component={ViewCulturePost as any} />
		</Stack.Navigator>
	)
}
