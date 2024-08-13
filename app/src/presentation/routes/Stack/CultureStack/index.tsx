import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { CultureProvider } from '@contexts/CultureContext'

import { CultureStackParamList } from './types'

import { InsertCultureDescription } from '@screens/cultureRegisterScreens/InsertCultureDescription'
import { InsertCultureEndDate } from '@screens/cultureRegisterScreens/InsertCultureEndDate'
import { InsertCultureEndHour } from '@screens/cultureRegisterScreens/InsertCultureEndHour'
import { InsertCultureStartDate } from '@screens/cultureRegisterScreens/InsertCultureStartDate'
import { InsertCultureStartHour } from '@screens/cultureRegisterScreens/InsertCultureStartHour'
import { InsertEntryValue } from '@screens/cultureRegisterScreens/InsertEntryValue'
import { InsertCultureLinks } from '@screens/cultureRegisterScreens/InsetCultureLinks'
import { SelectCultureCategory } from '@screens/cultureRegisterScreens/SelectCultureCategory'
import { SelectCultureDaysOfWeek } from '@screens/cultureRegisterScreens/SelectCultureDaysOfWeek'
import { SelectCultureFrequency } from '@screens/cultureRegisterScreens/SelectCultureFrequency'
import { SelectCultureLocation } from '@screens/cultureRegisterScreens/SelectCultureLocation'
import { SelectCultureLocationView } from '@screens/cultureRegisterScreens/SelectCultureLocationView'
import { SelectCulturePlaceModality } from '@screens/cultureRegisterScreens/SelectCulturePlaceModality'
import { SelectCulturePostMedia } from '@screens/cultureRegisterScreens/SelectCulturePostMedia'
import { SelectCultureRange } from '@screens/cultureRegisterScreens/SelectCultureRange'
import { SelectCultureTags } from '@screens/cultureRegisterScreens/SelectCultureTags'
import { SelectCultureType } from '@screens/cultureRegisterScreens/SelectCultureType'
import { SelectEventRepeat } from '@screens/cultureRegisterScreens/SelectEventRepeat'
import { CulturePostReview } from '@screens/editPostScreens/CulturePostReview'

import { CultureStackScreenProps } from '../UserStack/screenProps'

const Stack = createStackNavigator<CultureStackParamList>()

export function CultureStack({ route }: CultureStackScreenProps) {
	return (
		<CultureProvider>
			<Stack.Navigator
				initialRouteName={'InsertCultureDescription'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					name={'InsertCultureDescription'}
					component={InsertCultureDescription}
					initialParams={route && route.params ? { ...(route.params || {}) } : {} as any}
				/>
				<Stack.Screen name={'SelectCultureLocation'} component={SelectCultureLocation} />
				<Stack.Screen name={'SelectCulturePostMedia'} component={SelectCulturePostMedia} />
				<Stack.Screen name={'CulturePostReview'} component={CulturePostReview} />

				{/* Optional */}
				<Stack.Screen name={'SelectCultureType'} component={SelectCultureType} />
				<Stack.Screen name={'SelectCultureCategory'} component={SelectCultureCategory} />
				<Stack.Screen name={'SelectCultureTags'} component={SelectCultureTags} />
				<Stack.Screen name={'InsertCultureLinks'} component={InsertCultureLinks} />
				<Stack.Screen name={'InsertEntryValue'} component={InsertEntryValue} />
				<Stack.Screen name={'SelectCulturePlaceModality'} component={SelectCulturePlaceModality} />
				<Stack.Screen name={'SelectCultureRange'} component={SelectCultureRange} />
				<Stack.Screen name={'SelectCultureLocationView'} component={SelectCultureLocationView} />
				<Stack.Screen name={'SelectCultureFrequency'} component={SelectCultureFrequency} />
				<Stack.Screen name={'SelectCultureDaysOfWeek'} component={SelectCultureDaysOfWeek} />
				<Stack.Screen name={'SelectEventRepeat'} component={SelectEventRepeat} />
				<Stack.Screen name={'InsertCultureStartDate'} component={InsertCultureStartDate} />
				<Stack.Screen name={'InsertCultureStartHour'} component={InsertCultureStartHour} />
				<Stack.Screen name={'InsertCultureEndDate'} component={InsertCultureEndDate} />
				<Stack.Screen name={'InsertCultureEndHour'} component={InsertCultureEndHour} />
			</Stack.Navigator>
		</CultureProvider>
	)
}
