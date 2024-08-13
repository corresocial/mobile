import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { StateProvider } from '@contexts/StateContext'

import { HomeStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { EventsCalendar } from '@screens/homeScreens/EventsCalendar'
import { Home } from '@screens/homeScreens/Home'
import { SearchResult } from '@screens/homeScreens/SearchResult'
import { ViewPostsByMacroCategory } from '@screens/homeScreens/ViewPostsByMacroCategory'
import { ViewPostsByPostType } from '@screens/homeScreens/ViewPostsByPostType'
import { ViewPostsByRange } from '@screens/homeScreens/ViewPostsByRange'
import { Profile } from '@screens/profileScreens/Profile'
import { SocialMediaManagement } from '@screens/profileScreens/SocialMediaManagement'
import { PostView } from '@screens/viewPostScreens/PostView'

import { PublicServicesStack } from '../PublicServicesStack'

const Stack = createStackNavigator<HomeStackParamList>()

export function HomeStack({ route, navigation }: any) { // REFACTOR Type Routes
	useHomeTabDisplay<'HomeStack', HomeStackParamList>({
		navigation,
		route,
		screens: ['Home', 'ProfileHome'],
	})

	return (
		<StateProvider>
			<Stack.Navigator
				initialRouteName={'Home'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'Home'} component={Home} />
				<Stack.Screen name={'ViewPostsByRange'} component={ViewPostsByRange as any} />
				<Stack.Screen name={'ViewPostsByPostType'} component={ViewPostsByPostType} />
				<Stack.Screen name={'ViewPostsByMacroCategory'} component={ViewPostsByMacroCategory} />
				<Stack.Screen name={'EventsCalendar'} component={EventsCalendar} />
				<Stack.Screen name={'SearchResult'} component={SearchResult} />

				<Stack.Screen name={'PostViewHome'} component={PostView as any} />
				<Stack.Screen name={'ProfileHome'} component={Profile as any} />
				<Stack.Screen name={'SocialMediaManagementHome'} component={SocialMediaManagement as any} />

				<Stack.Screen name={'PublicServicesStack'} component={PublicServicesStack} />
			</Stack.Navigator>
		</StateProvider>
	)
}
