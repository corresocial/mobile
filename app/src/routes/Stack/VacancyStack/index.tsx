import 'react-native-gesture-handler'
import React from 'react'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import { VacancyProvider } from '@contexts/VacancyContext'

import { InsertVacancyTitle } from '@screens/vacancyRegisterScreens/InsertVacancyTitle'
import { InsertVacancyDescription } from '@screens/vacancyRegisterScreens/InsertVacancyDescription'
import { InsertVacancyQuestions } from '@screens/vacancyRegisterScreens/InsertVacancyQuestions'
import { InsertCompanyDescription } from '@screens/vacancyRegisterScreens/InsertCompanyDescription'
import { SelectWorkplace } from '@screens/vacancyRegisterScreens/SelectWorkplace'
import { InsertWorkplaceLocation } from '@screens/vacancyRegisterScreens/InsertWorkplaceLocation'
import { SelectVacancyCategory } from '@screens/vacancyRegisterScreens/SelectVacancyCategory'
import { SelectVacancyTags } from '@screens/vacancyRegisterScreens/SelectVacancyTags'
import { SelectVacancyType } from '@screens/vacancyRegisterScreens/SelectVacancyType'
import { SelectWorkWeekdays } from '@screens/vacancyRegisterScreens/SelectWorkWeekdays'
import { InsertWorkStartDate } from '@screens/vacancyRegisterScreens/InsertWorkStartDate'
import { InsertWorkStartHour } from '@screens/vacancyRegisterScreens/InsertWorkStartHour'
import { InsertWorkEndDate } from '@screens/vacancyRegisterScreens/InsertWorkEndDate'
import { InsertWorkEndHour } from '@screens/vacancyRegisterScreens/InsertWorkEndHour'
import { VacancyStackParamList } from './types'

const Stack = createStackNavigator<VacancyStackParamList>()

export function VacancyStack() {
	return (
		<VacancyProvider>
			<Stack.Navigator
				initialRouteName={'InsertVacancyTitle'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					name={'InsertVacancyTitle'}
					component={InsertVacancyTitle}
				/>
				<Stack.Screen
					name={'InsertVacancyDescription'}
					component={InsertVacancyDescription}
				/>
				<Stack.Screen
					name={'InsertVacancyQuestions'}
					component={InsertVacancyQuestions}
				/>
				<Stack.Screen
					name={'InsertCompanyDescription'}
					component={InsertCompanyDescription}
				/>
				<Stack.Screen
					name={'SelectWorkplace'}
					component={SelectWorkplace}
				/>
				<Stack.Screen
					name={'InsertWorkplaceLocation'}
					component={InsertWorkplaceLocation}
				/>
				<Stack.Screen
					name={'SelectVacancyCategory'}
					component={SelectVacancyCategory}
				/>
				<Stack.Screen
					name={'SelectVacancyTags'}
					component={SelectVacancyTags}
				/>
				<Stack.Screen
					name={'SelectVacancyType'}
					component={SelectVacancyType}
				/>
				<Stack.Screen
					name={'SelectWorkWeekdays'}
					component={SelectWorkWeekdays}
				/>
				<Stack.Screen
					name={'InsertWorkStartDate'}
					component={InsertWorkStartDate}
				/>
				<Stack.Screen
					name={'InsertWorkStartHour'}
					component={InsertWorkStartHour}
				/>
				<Stack.Screen
					name={'InsertWorkEndDate'}
					component={InsertWorkEndDate}
				/>
				<Stack.Screen
					name={'InsertWorkEndHour'}
					component={InsertWorkEndHour}
				/>
			</Stack.Navigator>
		</VacancyProvider>
	)
}
