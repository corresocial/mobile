import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PetitionProvider } from '@contexts/PetitionContext'

import { PetitionStackParamList } from './types'

import { InsertPetitionDescription } from '@screens/petitionScreens/InsertPetitionDescription'
import { InsertPetitionTitle } from '@screens/petitionScreens/InsetPetitionTitle'
import { SelectIdentificationRequest } from '@screens/petitionScreens/SelectIdentificationRequest'

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
				<Stack.Screen name={'InsertPetitionDescription'} component={InsertPetitionDescription} />
				<Stack.Screen name={'SelectIdentificationRequest'} component={SelectIdentificationRequest} />
			</Stack.Navigator>
		</PetitionProvider>
	)
}
