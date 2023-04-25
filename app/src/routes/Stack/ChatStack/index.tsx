import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ChatStackParamList } from './types'

import { ChatConversations } from '../../../screens/chatScreens/ChatConversations'
import { Profile } from '../../../screens/profileScreens/Profile'
import { ViewServicePost } from '../../../screens/viewPostScreens/ViewServicePost'
import { ViewSalePost } from '../../../screens/viewPostScreens/ViewSalePost'
import { ViewVacancyPost } from '../../../screens/viewPostScreens/ViewVacancyPost'
import { ViewSocialImpactPost } from '../../../screens/viewPostScreens/ViewSocialImpactPost'
import { ViewCulturePost } from '../../../screens/viewPostScreens/ViewCulturePost'

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
			<Stack.Screen name={'ProfileChat'} component={Profile} />
			{/* <Stack.Screen name={'ChatMessages'} component={ChatMessages} /> */}

			<Stack.Screen name={'ViewServicePostChat'} component={ViewServicePost} />
			<Stack.Screen name={'ViewSalePostChat'} component={ViewSalePost} />
			<Stack.Screen name={'ViewVacancyPostChat'} component={ViewVacancyPost} />
			<Stack.Screen name={'ViewSocialImpactPostChat'} component={ViewSocialImpactPost} />
			<Stack.Screen name={'ViewCulturePostChat'} component={ViewCulturePost} />
		</Stack.Navigator>
	)
}
