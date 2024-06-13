import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { CitizenRegistrationStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { CitizenRegistrationHome } from '@screens/citizenRegistrationScreens/CitizenRegistrationHome'
import { WhoWeAre } from '@screens/configurationScreens/WhoWeAre'
import { WhoWeAreCulture } from '@screens/configurationScreens/WhoWeAreCulture'
import { WhoWeAreIncome } from '@screens/configurationScreens/WhoWeAreIncome'
import { WhoWeAreTransformationTemp } from '@screens/configurationScreens/WhoWheAreTransformationTemp'

const Stack = createStackNavigator<CitizenRegistrationStackParamList>()

export function CitizenRegistrationStack({ route, navigation }: any) {
	useHomeTabDisplay<'ProfileStack', CitizenRegistrationStackParamList>({
		navigation,
		route,
		screens: [],
	})

	return (
		// <LeaderAreaProvider>
		<Stack.Navigator
			initialRouteName={'CitizenRegistrationHome'}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<Stack.Screen name={'CitizenRegistrationHome'} component={CitizenRegistrationHome as any} />

			<Stack.Screen name={'WhoWeAre'} component={WhoWeAre} />
			<Stack.Screen name={'WhoWeAreIncome'} component={WhoWeAreIncome} />
			<Stack.Screen name={'WhoWeAreCulture'} component={WhoWeAreCulture} />
			<Stack.Screen name={'WhoWeAreTransformation'} component={WhoWeAreTransformationTemp} />
		</Stack.Navigator>
		// </LeaderAreaProvider>
	)
}
