import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PetitionProvider } from '@contexts/PetitionContext'

import { PetitionStackParamList } from './types'

import { InsertPetitionDescription } from '@screens/petitionScreens/InsertPetitionDescription'
import { InsertPetitionLocation } from '@screens/petitionScreens/InsertPetitionLocation'
import { SelectPetitionRange } from '@screens/petitionScreens/InsertPetitionRange'
import { InsertPetitionTitle } from '@screens/petitionScreens/InsetPetitionTitle'
import { PetitionReview } from '@screens/petitionScreens/PetitionReview'
import { SelectIdentificationRequest } from '@screens/petitionScreens/SelectIdentificationRequest'
import { SelectPetitionMedia } from '@screens/petitionScreens/SelectPetitionMedia'

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
				<Stack.Screen name={'SelectPetitionMedia'} component={SelectPetitionMedia} />
				<Stack.Screen name={'SelectPetitionRange'} component={SelectPetitionRange} />
				<Stack.Screen name={'InsertPetitionLocation'} component={InsertPetitionLocation} />

				<Stack.Screen name={'PetitionReview'} component={PetitionReview} />
			</Stack.Navigator>
		</PetitionProvider>
	)
}
