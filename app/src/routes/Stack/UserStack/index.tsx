import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { UserStackParamList } from './types'

import { StateProvider } from '../../../contexts/StateContext'

import { WelcomeNewUser } from '../../../screens/homeScreens/WelcomeNewUser'
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType'
import { ViewServicePost } from '../../../screens/homeScreens/ViewServicePost'
import { HomeTab } from '../../Tabs/HomeTab'
import { ServiceStack } from '../ServiceStack'
import { SaleStack } from '../SaleStack'
import { VacancyStack } from '../VacancyStack'
import { SocialImpactStack } from '../SocialImpactStack'
import { CultureStack } from '../CultureStack'
import { ViewSalePost } from '../../../screens/homeScreens/ViewSalePost'
import { ViewVacancyPost } from '../../../screens/homeScreens/ViewVacancyPost'
import { ViewSocialImpactPost } from '../../../screens/homeScreens/ViewSocialImpactPost'
import { ViewCulturePost } from '../../../screens/homeScreens/ViewCulturePost'

const Stack = createStackNavigator<UserStackParamList>()

export function UserStack({ route }: any) {
	const tourPerformed = (route.params && route.params.tourPerformed) || false

	return (
		<StateProvider>
			<Stack.Navigator
				initialRouteName={tourPerformed ? 'HomeTab' : 'WelcomeNewUser'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
				<Stack.Screen name={'HomeTab'} component={HomeTab} />
				<Stack.Screen name={'SelectPostType'} component={SelectPostType} />
				<Stack.Screen name={'ServiceStack'} component={ServiceStack} />
				<Stack.Screen name={'SaleStack'} component={SaleStack} />
				<Stack.Screen name={'VacancyStack'} component={VacancyStack} />
				<Stack.Screen name={'CultureStack'} component={CultureStack} />
				<Stack.Screen name={'SocialImpactStack'} component={SocialImpactStack} />
				<Stack.Screen name={'ViewServicePost'} component={ViewServicePost} />
				<Stack.Screen name={'ViewSalePost'} component={ViewSalePost} />
				<Stack.Screen name={'ViewVacancyPost'} component={ViewVacancyPost} />
				<Stack.Screen name={'ViewSocialImpactPost'} component={ViewSocialImpactPost} />
				<Stack.Screen name={'ViewCulturePost'} component={ViewCulturePost} />
			</Stack.Navigator>
		</StateProvider>
	)
}
