import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PetitionProvider } from '@contexts/PetitionContext'

import { PetitionStackParamList } from './types'

import { InsertPetitionTitle } from '@screens/petitionScreens/InsertPetitionTitle'

const Stack = createStackNavigator<PetitionStackParamList>()

export function PetitionStack() {
	return (
		<PetitionProvider>
			<Stack.Navigator
				initialRouteName={'InsertPetitionTitle'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'InsertPetitionTitle'} component={InsertPetitionTitle} />
			</Stack.Navigator>
		</PetitionProvider>
	)
}
