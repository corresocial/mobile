import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { CitizenRegistrationProvider } from '@contexts/CitizenRegistrationContext'

import { CitizenRegistrationStackParamList } from './types'
import { useHomeTabDisplay } from '@routes/Tabs/userHomeTabDisplay'

import { CitizenOfflineRegistrationList } from '@screens/citizenRegistrationScreens/CitizenOfflineRegistrationList'
import { CitizenQuestionsList } from '@screens/citizenRegistrationScreens/CitizenQuestionsList'
import { CitizenRegistrationHome } from '@screens/citizenRegistrationScreens/CitizenRegistrationHome'
import { FinishCitizenRegistration } from '@screens/citizenRegistrationScreens/FinishCitizenRegistration'
import { InsertBinaryResponse } from '@screens/citizenRegistrationScreens/InsertBinaryResponse'
import { InsertSatisfactionResponse } from '@screens/citizenRegistrationScreens/InsertSatisfactionResponse'
import { InsertSelectResponse } from '@screens/citizenRegistrationScreens/InsertSelectResponse'
import { InsertTextualResponse } from '@screens/citizenRegistrationScreens/InsertTextualResponse'
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
		<CitizenRegistrationProvider>
			<Stack.Navigator
				initialRouteName={'CitizenRegistrationHome'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'CitizenRegistrationHome'} component={CitizenRegistrationHome} />
				<Stack.Screen name={'CitizenOfflineRegistrationList'} component={CitizenOfflineRegistrationList} />
				<Stack.Screen name={'CitizenQuestionsList'} component={CitizenQuestionsList} />
				<Stack.Screen name={'InsertBinaryResponse'} component={InsertBinaryResponse} />
				<Stack.Screen name={'InsertSatisfactionResponse'} component={InsertSatisfactionResponse} />
				<Stack.Screen name={'InsertTextualResponse'} component={InsertTextualResponse} />
				<Stack.Screen name={'InsertSelectResponse'} component={InsertSelectResponse} />
				<Stack.Screen name={'FinishCitizenRegistration'} component={FinishCitizenRegistration} />

				<Stack.Screen name={'WhoWeAre'} component={WhoWeAre} />
				<Stack.Screen name={'WhoWeAreIncome'} component={WhoWeAreIncome} />
				<Stack.Screen name={'WhoWeAreCulture'} component={WhoWeAreCulture} />
				<Stack.Screen name={'WhoWeAreTransformation'} component={WhoWeAreTransformationTemp} />
			</Stack.Navigator>
		</CitizenRegistrationProvider>
	)
}
