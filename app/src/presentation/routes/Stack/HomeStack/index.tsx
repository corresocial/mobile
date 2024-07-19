import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { StateProvider } from '@contexts/StateContext'

import { HomeStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { EventsCalendar } from '@screens/EventsCalendar'
import { Home } from '@screens/homeScreens/Home'
import { PostCategories } from '@screens/homeScreens/PostCategories'
import { PostCategoryDetails } from '@screens/homeScreens/PostCategoryDetails'
import { SearchResult } from '@screens/homeScreens/SearchResult'
import { ViewAllCategories } from '@screens/homeScreens/ViewAllCategories'
import { ViewAllTags } from '@screens/homeScreens/ViewAllTags'
import { ViewPostsByPostType } from '@screens/homeScreens/ViewPostsByPostType'
import { ViewPostsByRange } from '@screens/homeScreens/ViewPostsByRange'
import { ViewPostsByTag } from '@screens/homeScreens/ViewPostsByTag'
import { Profile } from '@screens/profileScreens/Profile'
import { SocialMediaManagement } from '@screens/profileScreens/SocialMediaManagement'
import { ViewCulturePost } from '@screens/viewPostScreens/ViewCulturePost'
import { ViewIncomePost } from '@screens/viewPostScreens/ViewIncomePost'
import { ViewSocialImpactPost } from '@screens/viewPostScreens/ViewSocialImpactPost'
import { ViewVacancyPost } from '@screens/viewPostScreens/ViewVacancyPost'

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
				{/* REFACTOR Mostar sem bottom tabs e na rota de stack */}
				<Stack.Screen name={'ViewPostsByRange'} component={ViewPostsByRange as any} />
				<Stack.Screen name={'ViewIncomePostHome'} component={ViewIncomePost as any} />
				<Stack.Screen name={'ViewVacancyPostHome'} component={ViewVacancyPost as any} />
				<Stack.Screen name={'ViewSocialImpactPostHome'} component={ViewSocialImpactPost as any} />
				<Stack.Screen name={'ViewCulturePostHome'} component={ViewCulturePost as any} />

				<Stack.Screen name={'PostCategories'} component={PostCategories} />
				<Stack.Screen name={'ViewPostsByPostType'} component={ViewPostsByPostType} />
				<Stack.Screen name={'PostCategoryDetails'} component={PostCategoryDetails} />
				<Stack.Screen name={'ViewAllCategories'} component={ViewAllCategories} />
				<Stack.Screen name={'ViewAllTags'} component={ViewAllTags} />
				<Stack.Screen name={'ViewPostsByTag'} component={ViewPostsByTag} />
				<Stack.Screen name={'SearchResult'} component={SearchResult} />
				<Stack.Screen name={'EventsCalendar'} component={EventsCalendar} />
				{/* REFACTOR */}
				<Stack.Screen name={'ProfileHome'} component={Profile as any} />
				<Stack.Screen name={'SocialMediaManagementHome'} component={SocialMediaManagement as any} />

				<Stack.Screen name={'PublicServicesStack'} component={PublicServicesStack} />
			</Stack.Navigator>
		</StateProvider>
	)
}
