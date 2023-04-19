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
import { InsertVacancyStartDate } from '../../../screens/vacancyRegisterScreens/InsertVacancyStartDate'
import { InsertVacancyEndHour } from '../../../screens/vacancyRegisterScreens/InsertVacancyEndHour'
import { InsertVacancyPicture } from '../../../screens/vacancyRegisterScreens/InsertVacancyPicture'
import { VacancyPicturePreview } from '../../../screens/vacancyRegisterScreens/VacancyPicturePreview'
import { SelectPaymentType } from '../../../screens/vacancyRegisterScreens/SelectPaymentType'
import { SelectSaleValueType } from '../../../screens/vacancyRegisterScreens/SelectSaleValueType'
import { InsertSaleValue } from '../../../screens/vacancyRegisterScreens/InsertSaleValue'
import { InsertExchangeValue } from '../../../screens/vacancyRegisterScreens/InsertExchangeValue'
import { SelectVacancyRange } from '../../../screens/vacancyRegisterScreens/SelectVacancyRange'
import { SelectVacancyLocationView } from '../../../screens/vacancyRegisterScreens/SelectVacancyLocationView'
import { VacancyLocationViewPreview } from '../../../screens/vacancyRegisterScreens/VacancyLocationViewPreview'
import { SelectVacancyFrequency } from '../../../screens/vacancyRegisterScreens/SelectVacancyFrequency'
import { InsertVacancyEndDate } from '../../../screens/vacancyRegisterScreens/InsertVacancyEndDate'
import { InsertVacancyStartHour } from '../../../screens/vacancyRegisterScreens/InsertVacancyStartHour'

const Stack = createStackNavigator<VacancyStackParamList>()

export function VacancyStack() {
	return (
		<VacancyProvider>
			<Stack.Navigator
				initialRouteName={'InsertVacancyStartDate'}
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
				<Stack.Screen name={'VacancyLocationViewPreview'} component={VacancyLocationViewPreview} />
				<Stack.Screen name={'SelectVacancyFrequency'} component={SelectVacancyFrequency} />
				<Stack.Screen name={'SelectWorkWeekdays'} component={SelectWorkWeekdays} />
				<Stack.Screen name={'InsertVacancyQuestions'} component={InsertVacancyQuestions} />
				<Stack.Screen name={'InsertVacancyStartDate'} component={InsertVacancyStartDate} />
				<Stack.Screen name={'InsertVacancyEndDate'} component={InsertVacancyEndDate} />
				<Stack.Screen name={'InsertVacancyStartHour'} component={InsertVacancyStartHour} />
				<Stack.Screen name={'InsertVacancyEndHour'} component={InsertVacancyEndHour} />
			</Stack.Navigator>
		</VacancyProvider>
	)
}
