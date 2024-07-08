import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PetitionProvider } from '@contexts/PetitionContext'

import { PetitionStackParamList } from './types'

import { FinishPetitionSignature } from '@screens/petitionScreens/FinishPetitionSignature'
import { InsertPetitionCPF } from '@screens/petitionScreens/InsertPetitionCPF'
import { InsertPetitionDescription } from '@screens/petitionScreens/InsertPetitionDescription'
import { InsertPetitionEmail } from '@screens/petitionScreens/InsertPetitionEmail'
import { InsertPetitionFullName } from '@screens/petitionScreens/InsertPetitionFullName'
import { InsertPetitionLocation } from '@screens/petitionScreens/InsertPetitionLocation'
import { InsertPetitionPhone } from '@screens/petitionScreens/InsertPetitionPhone'
import { SelectPetitionRange } from '@screens/petitionScreens/InsertPetitionRange'
import { InsertPetitionRG } from '@screens/petitionScreens/InsertPetitionRg'
import { InsertPetitionTitle } from '@screens/petitionScreens/InsetPetitionTitle'
import { PetitionReview } from '@screens/petitionScreens/PetitionReview'
import { SelectIdentificationRequest } from '@screens/petitionScreens/SelectIdentificationRequest'
import { SelectPetitionMedia } from '@screens/petitionScreens/SelectPetitionMedia'
import { ViewPetition } from '@screens/petitionScreens/ViewPetition'

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
				<Stack.Screen name={'ViewPetition'} component={ViewPetition} />

				<Stack.Screen name={'InsertPetitionFullName'} component={InsertPetitionFullName} />
				<Stack.Screen name={'InsertPetitionEmail'} component={InsertPetitionEmail} />
				<Stack.Screen name={'InsertPetitionRG'} component={InsertPetitionRG} />
				<Stack.Screen name={'InsertPetitionCPF'} component={InsertPetitionCPF} />
				<Stack.Screen name={'InsertPetitionPhone'} component={InsertPetitionPhone} />
				<Stack.Screen name={'FinishPetitionSignature'} component={FinishPetitionSignature} />
			</Stack.Navigator>
		</PetitionProvider>
	)
}
