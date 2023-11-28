import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { CultureStackParamList } from './types'

import { CultureProvider } from '../../../contexts/CultureContext'

import { InsertCultureDescription } from '../../../screens/cultureRegisterScreens/InsertCultureDescription'
import { CulturePicturePreview } from '../../../screens/cultureRegisterScreens/CulturePicturePreview'
import { SelectCultureCategory } from '../../../screens/cultureRegisterScreens/SelectCultureCategory'
import { SelectCultureTags } from '../../../screens/cultureRegisterScreens/SelectCultureTags'
import { InsertEntryValue } from '../../../screens/cultureRegisterScreens/InsertEntryValue'
import { SelectCulturePlaceModality } from '../../../screens/cultureRegisterScreens/SelectCulturePlaceModality'
import { SelectCultureRange } from '../../../screens/cultureRegisterScreens/SelectCultureRange'
import { SelectCultureLocationView } from '../../../screens/cultureRegisterScreens/SelectCultureLocationView'
import { InsertCultureLocation } from '../../../screens/cultureRegisterScreens/InsertCultureLocation'
import { CultureLocationViewPreview } from '../../../screens/cultureRegisterScreens/CultureLocationViewPreview'
import { InsertCultureEndHour } from '../../../screens/cultureRegisterScreens/InsertCultureEndHour'
import { SelectEventRepeat } from '../../../screens/cultureRegisterScreens/SelectEventRepeat'
import { SelectCultureFrequency } from '../../../screens/cultureRegisterScreens/SelectCultureFrequency'
import { SelectCultureDaysOfWeek } from '../../../screens/cultureRegisterScreens/SelectCultureDaysOfWeek'
import { InsertCultureStartDate } from '../../../screens/cultureRegisterScreens/InsertCultureStartDate'
import { InsertCultureStartHour } from '../../../screens/cultureRegisterScreens/InsertCultureStartHour'
import { InsertCultureEndDate } from '../../../screens/cultureRegisterScreens/InsertCultureEndDate'
import { EditCulturePost } from '../../../screens/editPostScreens/EditCulturePost'
import { SelectCultureType } from '../../../screens/cultureRegisterScreens/SelectCultureType'
import { SelectCulturePurpose } from '../../../screens/cultureRegisterScreens/SelectCulturePurpose'
import { InsertCultureLinks } from '../../../screens/cultureRegisterScreens/InsetCultureLinks'

const Stack = createStackNavigator<CultureStackParamList>()

export function CultureStack() {
	return (
		<CultureProvider>
			<Stack.Navigator
				initialRouteName={'SelectCultureType'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectCultureType'} component={SelectCultureType} />
				<Stack.Screen name={'SelectCulturePurpose'} component={SelectCulturePurpose} />
				<Stack.Screen name={'SelectCultureCategory'} component={SelectCultureCategory} />
				<Stack.Screen name={'SelectCultureTags'} component={SelectCultureTags} />
				<Stack.Screen name={'InsertCultureDescription'} component={InsertCultureDescription} />
				<Stack.Screen name={'InsertCultureLinks'} component={InsertCultureLinks} />
				<Stack.Screen name={'CulturePicturePreview'} component={CulturePicturePreview} />
				<Stack.Screen name={'InsertEntryValue'} component={InsertEntryValue} />
				<Stack.Screen name={'SelectCulturePlaceModality'} component={SelectCulturePlaceModality} />
				<Stack.Screen name={'SelectCultureRange'} component={SelectCultureRange} />
				<Stack.Screen name={'SelectCultureLocationView'} component={SelectCultureLocationView} />
				<Stack.Screen name={'InsertCultureLocation'} component={InsertCultureLocation} />
				<Stack.Screen name={'CultureLocationViewPreview'} component={CultureLocationViewPreview} />
				<Stack.Screen name={'SelectCultureFrequency'} component={SelectCultureFrequency} />
				<Stack.Screen name={'SelectCultureDaysOfWeek'} component={SelectCultureDaysOfWeek} />
				<Stack.Screen name={'SelectEventRepeat'} component={SelectEventRepeat} />
				<Stack.Screen name={'InsertCultureStartDate'} component={InsertCultureStartDate} />
				<Stack.Screen name={'InsertCultureStartHour'} component={InsertCultureStartHour} />
				<Stack.Screen name={'InsertCultureEndDate'} component={InsertCultureEndDate} />
				<Stack.Screen name={'InsertCultureEndHour'} component={InsertCultureEndHour} />
				<Stack.Screen name={'EditCulturePostReview'} component={EditCulturePost} />
			</Stack.Navigator>
		</CultureProvider>
	)
}
