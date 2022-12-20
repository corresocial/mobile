import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { HomeStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'

import { ViewServicePost } from '../../../screens/homeScreens/ViewServicePost'
import { ViewSalePost } from '../../../screens/homeScreens/ViewSalePost'
import { ViewVacancyPost } from '../../../screens/homeScreens/ViewVacancyPost'
import { ViewSocialImpactPost } from '../../../screens/homeScreens/ViewSocialImpactPost'
import { ViewCulturePost } from '../../../screens/homeScreens/ViewCulturePost'
import { Home } from '../../../screens/homeScreens/Home'

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
				<Stack.Screen name={'ViewServicePostHome'} component={ViewServicePost} />
				<Stack.Screen name={'ViewSalePostHome'} component={ViewSalePost} />
				<Stack.Screen name={'ViewVacancyPostHome'} component={ViewVacancyPost} />
				<Stack.Screen name={'ViewSocialImpactPostHome'} component={ViewSocialImpactPost} />
				<Stack.Screen name={'ViewCulturePostHome'} component={ViewCulturePost} />
			</Stack.Navigator>
		</StateProvider>
	)
}
