import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ProfileStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'

import { ViewVacancyPost } from '../../../screens/viewPostScreens/ViewVacancyPost'
import { ViewSocialImpactPost } from '../../../screens/viewPostScreens/ViewSocialImpactPost'
import { ViewCulturePost } from '../../../screens/viewPostScreens/ViewCulturePost'
import { Profile } from '../../../screens/profileScreens/Profile'
import { ViewIncomePost } from '../../../screens/viewPostScreens/ViewIncomePost'

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
				<Stack.Screen name={'ViewIncomePost'} component={ViewIncomePost} />
				<Stack.Screen name={'ViewVacancyPost'} component={ViewVacancyPost} />
				<Stack.Screen name={'ViewSocialImpactPost'} component={ViewSocialImpactPost} />
				<Stack.Screen name={'ViewCulturePost'} component={ViewCulturePost} />
			</Stack.Navigator>
		</StateProvider>
	)
}
