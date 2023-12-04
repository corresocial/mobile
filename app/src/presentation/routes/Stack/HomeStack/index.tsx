import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { HomeStackParamList } from './types'

import { StateProvider } from '../../../../contexts/StateContext'
import { Home } from '../../../screens/homeScreens/Home'
import { PostCategories } from '../../../screens/homeScreens/PostCategories'
import { PostCategoryDetails } from '../../../screens/homeScreens/PostCategoryDetails'
import { SearchResult } from '../../../screens/homeScreens/SearchResult'
import { ViewAllCategories } from '../../../screens/homeScreens/ViewAllCategories'
import { ViewAllTags } from '../../../screens/homeScreens/ViewAllTags'
import { ViewPostsByPostType } from '../../../screens/homeScreens/ViewPostsByPostType'
import { ViewPostsByRange } from '../../../screens/homeScreens/ViewPostsByRange'
import { ViewPostsByTag } from '../../../screens/homeScreens/ViewPostsByTag'
import { Profile } from '../../../screens/profileScreens/Profile'
import { ViewCulturePost } from '../../../screens/viewPostScreens/ViewCulturePost'
import { ViewIncomePost } from '../../../screens/viewPostScreens/ViewIncomePost'
import { ViewSocialImpactPost } from '../../../screens/viewPostScreens/ViewSocialImpactPost'
import { ViewVacancyPost } from '../../../screens/viewPostScreens/ViewVacancyPost'

const Stack = createStackNavigator<HomeStackParamList>()

export function HomeStack({ route }: any) {
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
				<Stack.Screen name={'ViewIncomePostHome'} component={ViewIncomePost} />
				<Stack.Screen name={'ViewVacancyPostHome'} component={ViewVacancyPost} />
				<Stack.Screen name={'ViewPostsByRange'} component={ViewPostsByRange} />
				<Stack.Screen name={'ViewSocialImpactPostHome'} component={ViewSocialImpactPost} />
				<Stack.Screen name={'ViewCulturePostHome'} component={ViewCulturePost} />
				<Stack.Screen name={'PostCategories'} component={PostCategories} />
				<Stack.Screen name={'ViewPostsByPostType'} component={ViewPostsByPostType} />
				<Stack.Screen name={'PostCategoryDetails'} component={PostCategoryDetails} />
				<Stack.Screen name={'ViewAllCategories'} component={ViewAllCategories} />
				<Stack.Screen name={'ViewAllTags'} component={ViewAllTags} />
				<Stack.Screen name={'ViewPostsByTag'} component={ViewPostsByTag} />
				<Stack.Screen name={'SearchResult'} component={SearchResult} />
				<Stack.Screen name={'ProfileHome'} component={Profile} />
			</Stack.Navigator>
		</StateProvider>
	)
}
