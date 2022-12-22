import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { HomeStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'
import { LocationProvider } from '../../../contexts/LocationContext'

import { ViewServicePost } from '../../../screens/homeScreens/ViewServicePost'
import { ViewSalePost } from '../../../screens/homeScreens/ViewSalePost'
import { ViewVacancyPost } from '../../../screens/homeScreens/ViewVacancyPost'
import { ViewSocialImpactPost } from '../../../screens/homeScreens/ViewSocialImpactPost'
import { ViewCulturePost } from '../../../screens/homeScreens/ViewCulturePost'
import { Home } from '../../../screens/homeScreens/Home'
import { PostCategories } from '../../../screens/homeScreens/PostCategories'
import { PostCategoryDetails } from '../../../screens/homeScreens/PostCategoryDetails'
import { ViewAllTags } from '../../../screens/homeScreens/ViewAllTags'
import { ViewPostsByTag } from '../../../screens/homeScreens/ViewPostsByTag'

const Stack = createStackNavigator<HomeStackParamList>()

export function HomeStack({ route }: any) {
	return (
		<StateProvider>
			<LocationProvider>
				<Stack.Navigator
					initialRouteName={'Home'}
					screenOptions={{
						headerShown: false,
						gestureEnabled: false,
						...TransitionPresets.SlideFromRightIOS,
					}}
				>
					<Stack.Screen name={'Home'} component={Home} />
					<Stack.Screen name={'ViewServicePostHome'} component={ViewServicePost} />
					<Stack.Screen name={'ViewSalePostHome'} component={ViewSalePost} />
					<Stack.Screen name={'ViewVacancyPostHome'} component={ViewVacancyPost} />
					<Stack.Screen name={'ViewSocialImpactPostHome'} component={ViewSocialImpactPost} />
					<Stack.Screen name={'ViewCulturePostHome'} component={ViewCulturePost} />
					<Stack.Screen name={'PostCategories'} component={PostCategories} />
					<Stack.Screen name={'PostCategoryDetails'} component={PostCategoryDetails} />
					<Stack.Screen name={'ViewAllTags'} component={ViewAllTags} />
					<Stack.Screen name={'ViewPostsByTag'} component={ViewPostsByTag} />
				</Stack.Navigator>
			</LocationProvider>
		</StateProvider>
	)
}
