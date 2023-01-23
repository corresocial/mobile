import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { CultureStackParamList } from './types'

import { CultureProvider } from '../../../contexts/CultureContext'

import { SelectCultureType } from '../../../screens/cultureScreens/SelectCultureType'
import { InsertCultureTitle } from '../../../screens/cultureScreens/InsertCultureTitle'
import { InsertCultureDescription } from '../../../screens/cultureScreens/InsertCultureDescription'
import { InsertCulturePicture } from '../../../screens/cultureScreens/InsertCulturePicture'
import { CulturePicturePreview } from '../../../screens/cultureScreens/CulturePicturePreview'
import { SelectCultureCategory } from '../../../screens/cultureScreens/SelectCultureCategory'
import { SelectCultureTags } from '../../../screens/cultureScreens/SelectCultureTags'
import { InsertEntryValue } from '../../../screens/cultureScreens/InsertEntryValue'
import { SelectExhibitionPlace } from '../../../screens/cultureScreens/SelectExhibitionPlace'
import { SelectEventPlaceModality } from '../../../screens/cultureScreens/SelectEventPlaceModality'
import { SelectCultureLocationView } from '../../../screens/cultureScreens/SelectCultureLocationView'
import { InsertCultureLocation } from '../../../screens/cultureScreens/InsertCultureLocation'
import { CultureLocationViewPreview } from '../../../screens/cultureScreens/CultureLocationViewPreview'
import { InsertEventStartDate } from '../../../screens/cultureScreens/InsertEventStartDate'
import { InsertEventStartHour } from '../../../screens/cultureScreens/InsertEventStartHour'
import { InsertEventEndDate } from '../../../screens/cultureScreens/InsertEventEndDate'
import { InsertEventEndHour } from '../../../screens/cultureScreens/InsertEventEndHour'
import { SelectEventRepeat } from '../../../screens/cultureScreens/SelectEventRepeat'

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
				<Stack.Screen name={'InsertCultureTitle'} component={InsertCultureTitle} />
				<Stack.Screen name={'InsertCultureDescription'} component={InsertCultureDescription} />
				<Stack.Screen name={'InsertCulturePicture'} component={InsertCulturePicture} />
				<Stack.Screen name={'CulturePicturePreview'} component={CulturePicturePreview} />
				<Stack.Screen name={'SelectCultureCategory'} component={SelectCultureCategory} />
				<Stack.Screen name={'SelectCultureTags'} component={SelectCultureTags} />
				<Stack.Screen name={'InsertEntryValue'} component={InsertEntryValue} />
				<Stack.Screen name={'SelectExhibitionPlace'} component={SelectExhibitionPlace} />
				<Stack.Screen name={'SelectEventPlaceModality'} component={SelectEventPlaceModality} />
				<Stack.Screen name={'InsertCultureLocation'} component={InsertCultureLocation} />
				<Stack.Screen name={'SelectCultureLocationView'} component={SelectCultureLocationView} />
				<Stack.Screen name={'CultureLocationViewPreview'} component={CultureLocationViewPreview} />
				<Stack.Screen name={'InsertEventStartDate'} component={InsertEventStartDate} />
				<Stack.Screen name={'InsertEventStartHour'} component={InsertEventStartHour} />
				<Stack.Screen name={'InsertEventEndDate'} component={InsertEventEndDate} />
				<Stack.Screen name={'InsertEventEndHour'} component={InsertEventEndHour} />
				<Stack.Screen name={'SelectEventRepeat'} component={SelectEventRepeat} />
			</Stack.Navigator>
		</CultureProvider>
	)
}
