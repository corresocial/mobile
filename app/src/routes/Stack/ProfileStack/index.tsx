import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ProfileStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'

import { ViewServicePost } from '../../../screens/homeScreens/ViewServicePost'
import { ViewSalePost } from '../../../screens/homeScreens/ViewSalePost'
import { ViewVacancyPost } from '../../../screens/homeScreens/ViewVacancyPost'
import { ViewSocialImpactPost } from '../../../screens/homeScreens/ViewSocialImpactPost'
import { ViewCulturePost } from '../../../screens/homeScreens/ViewCulturePost'
import { Profile } from '../../../screens/homeScreens/Profile'

const Stack = createStackNavigator<ProfileStackParamList>()

export function ProfileStack({ route }: any) {
	return (
		<StateProvider>
			<Stack.Navigator
				initialRouteName={'Profile'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'Profile'} component={Profile} />
				<Stack.Screen name={'ViewServicePost'} component={ViewServicePost} />
				<Stack.Screen name={'ViewSalePost'} component={ViewSalePost} />
				<Stack.Screen name={'ViewVacancyPost'} component={ViewVacancyPost} />
				<Stack.Screen name={'ViewSocialImpactPost'} component={ViewSocialImpactPost} />
				<Stack.Screen name={'ViewCulturePost'} component={ViewCulturePost} />
			</Stack.Navigator>
		</StateProvider>
	)
}
