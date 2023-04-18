import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { CultureStackParamList } from './types'

import { CultureProvider } from '../../../contexts/CultureContext'

import { InsertCultureTitle } from '../../../screens/cultureRegisterScreens/InsertCultureTitle'
import { InsertCultureDescription } from '../../../screens/cultureRegisterScreens/InsertCultureDescription'
import { InsertCulturePicture } from '../../../screens/cultureRegisterScreens/InsertCulturePicture'
import { CulturePicturePreview } from '../../../screens/cultureRegisterScreens/CulturePicturePreview'
import { SelectCultureCategory } from '../../../screens/cultureRegisterScreens/SelectCultureCategory'
import { SelectCultureTags } from '../../../screens/cultureRegisterScreens/SelectCultureTags'
import { InsertEntryValue } from '../../../screens/cultureRegisterScreens/InsertEntryValue'
import { SelectEventPlaceModality } from '../../../screens/cultureRegisterScreens/SelectEventPlaceModality'
import { SelectCultureRange } from '../../../screens/cultureRegisterScreens/SelectCultureRange'
import { SelectCultureLocationView } from '../../../screens/cultureRegisterScreens/SelectCultureLocationView'
import { InsertCultureLocation } from '../../../screens/cultureRegisterScreens/InsertCultureLocation'
import { CultureLocationViewPreview } from '../../../screens/cultureRegisterScreens/CultureLocationViewPreview'
import { InsertEventStartDate } from '../../../screens/cultureRegisterScreens/InsertEventStartDate'
import { InsertEventStartHour } from '../../../screens/cultureRegisterScreens/InsertEventStartHour'
import { InsertEventEndDate } from '../../../screens/cultureRegisterScreens/InsertEventEndDate'
import { InsertEventEndHour } from '../../../screens/cultureRegisterScreens/InsertEventEndHour'
import { SelectEventRepeat } from '../../../screens/cultureRegisterScreens/SelectEventRepeat'
import { SelectCultureFrequency } from '../../../screens/cultureRegisterScreens/SelectCultureFrequency'
import { SelectDaysOfWeek } from '../../../screens/cultureRegisterScreens/SelectDaysOfWeek'

const Stack = createStackNavigator<CultureStackParamList>()

export function CultureStack() {
	return (
		<CultureProvider>
			<Stack.Navigator
				initialRouteName={'InsertEventStartDate'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectCultureCategory'} component={SelectCultureCategory} />
				<Stack.Screen name={'SelectCultureTags'} component={SelectCultureTags} />
				<Stack.Screen name={'InsertCultureTitle'} component={InsertCultureTitle} />
				<Stack.Screen name={'InsertCultureDescription'} component={InsertCultureDescription} />
				<Stack.Screen name={'InsertCulturePicture'} component={InsertCulturePicture} />
				<Stack.Screen name={'CulturePicturePreview'} component={CulturePicturePreview} />
				<Stack.Screen name={'InsertEntryValue'} component={InsertEntryValue} />
				<Stack.Screen name={'SelectEventPlaceModality'} component={SelectEventPlaceModality} />
				<Stack.Screen name={'SelectCultureRange'} component={SelectCultureRange} />
				<Stack.Screen name={'SelectCultureLocationView'} component={SelectCultureLocationView} />
				<Stack.Screen name={'InsertCultureLocation'} component={InsertCultureLocation} />
				<Stack.Screen name={'CultureLocationViewPreview'} component={CultureLocationViewPreview} />
				<Stack.Screen name={'SelectCultureFrequency'} component={SelectCultureFrequency} />
				<Stack.Screen name={'SelectDaysOfWeek'} component={SelectDaysOfWeek} />
				<Stack.Screen name={'InsertEventStartDate'} component={InsertEventStartDate} />
				<Stack.Screen name={'InsertEventStartHour'} component={InsertEventStartHour} />
				<Stack.Screen name={'InsertEventEndDate'} component={InsertEventEndDate} />
				<Stack.Screen name={'InsertEventEndHour'} component={InsertEventEndHour} />
				<Stack.Screen name={'SelectEventRepeat'} component={SelectEventRepeat} />
			</Stack.Navigator>
		</CultureProvider>
	)
}
