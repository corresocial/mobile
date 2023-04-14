import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { VacancyStackParamList } from './types'

import { VacancyProvider } from '../../../contexts/VacancyContext'

import { InsertVacancyTitle } from '../../../screens/vacancyRegisterScreens/InsertVacancyTitle'
import { InsertVacancyDescription } from '../../../screens/vacancyRegisterScreens/InsertVacancyDescription'
import { InsertVacancyQuestions } from '../../../screens/vacancyRegisterScreens/InsertVacancyQuestions'
import { InsertCompanyDescription } from '../../../screens/vacancyRegisterScreens/InsertCompanyDescription'
import { SelectWorkplace } from '../../../screens/vacancyRegisterScreens/SelectWorkplace'
import { InsertWorkplaceLocation } from '../../../screens/vacancyRegisterScreens/InsertWorkplaceLocation'
import { SelectVacancyCategory } from '../../../screens/vacancyRegisterScreens/SelectVacancyCategory'
import { SelectVacancyTags } from '../../../screens/vacancyRegisterScreens/SelectVacancyTags'
import { SelectVacancyType } from '../../../screens/vacancyRegisterScreens/SelectVacancyType'
import { SelectWorkWeekdays } from '../../../screens/vacancyRegisterScreens/SelectWorkWeekdays'
import { InsertWorkStartDate } from '../../../screens/vacancyRegisterScreens/InsertWorkStartDate'
import { InsertWorkStartHour } from '../../../screens/vacancyRegisterScreens/InsertWorkStartHour'
import { InsertWorkEndDate } from '../../../screens/vacancyRegisterScreens/InsertWorkEndDate'
import { InsertWorkEndHour } from '../../../screens/vacancyRegisterScreens/InsertWorkEndHour'
import { InsertVacancyPicture } from '../../../screens/vacancyRegisterScreens/InsertVacancyPicture'
import { VacancyPicturePreview } from '../../../screens/vacancyRegisterScreens/VacancyPicturePreview'
import { SelectPaymentType } from '../../../screens/vacancyRegisterScreens/SelectPaymentType'
import { SelectSaleValueType } from '../../../screens/vacancyRegisterScreens/SelectSaleValueType'
import { InsertSaleValue } from '../../../screens/vacancyRegisterScreens/InsertSaleValue'
import { InsertExchangeValue } from '../../../screens/vacancyRegisterScreens/InsertExchangeValue'
import { SelectVacancyRange } from '../../../screens/vacancyRegisterScreens/SelectVacancyRange'
import { SelectVacancyLocationView } from '../../../screens/vacancyRegisterScreens/SelectVacancyLocationView'

const Stack = createStackNavigator<VacancyStackParamList>()

export function VacancyStack() {
	return (
		<VacancyProvider>
			<Stack.Navigator
				initialRouteName={'SelectVacancyCategory'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectVacancyCategory'} component={SelectVacancyCategory} />
				<Stack.Screen name={'SelectVacancyTags'} component={SelectVacancyTags} />
				<Stack.Screen name={'InsertVacancyTitle'} component={InsertVacancyTitle} />
				<Stack.Screen name={'InsertVacancyDescription'} component={InsertVacancyDescription} />
				<Stack.Screen name={'InsertCompanyDescription'} component={InsertCompanyDescription} />
				<Stack.Screen name={'InsertVacancyPicture'} component={InsertVacancyPicture} />
				<Stack.Screen name={'VacancyPicturePreview'} component={VacancyPicturePreview} />
				<Stack.Screen name={'SelectWorkplace'} component={SelectWorkplace} />
				<Stack.Screen name={'SelectVacancyType'} component={SelectVacancyType} />
				<Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'SelectSaleValueType'} component={SelectSaleValueType} />
				<Stack.Screen name={'SelectVacancyRange'} component={SelectVacancyRange} />
				<Stack.Screen name={'SelectVacancyLocationView'} component={SelectVacancyLocationView} />
				<Stack.Screen name={'InsertWorkplaceLocation'} component={InsertWorkplaceLocation} />
				<Stack.Screen name={'SelectWorkWeekdays'} component={SelectWorkWeekdays} />
				<Stack.Screen name={'InsertVacancyQuestions'} component={InsertVacancyQuestions} />
				<Stack.Screen name={'InsertWorkStartDate'} component={InsertWorkStartDate} />
				<Stack.Screen name={'InsertWorkStartHour'} component={InsertWorkStartHour} />
				<Stack.Screen name={'InsertWorkEndDate'} component={InsertWorkEndDate} />
				<Stack.Screen name={'InsertWorkEndHour'} component={InsertWorkEndHour} />
			</Stack.Navigator>
		</VacancyProvider>
	)
}
