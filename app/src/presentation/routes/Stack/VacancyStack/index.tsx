import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { VacancyProvider } from '@contexts/VacancyContext'

import { VacancyStackParamList } from './types'

import { EditVacancyPost } from '@screens/editPostScreens/EditVacancyPost'
import { InsertIncomeLinks } from '@screens/saleRegisterScreens/InsertIncomeLinks'
import { InsertExchangeValue } from '@screens/vacancyRegisterScreens/InsertExchangeValue'
import { InsertVacancyValue } from '@screens/vacancyRegisterScreens/InsertSaleValue'
import { InsertVacancyDescription } from '@screens/vacancyRegisterScreens/InsertVacancyDescription'
import { InsertVacancyEndDate } from '@screens/vacancyRegisterScreens/InsertVacancyEndDate'
import { InsertVacancyEndHour } from '@screens/vacancyRegisterScreens/InsertVacancyEndHour'
import { InsertVacancyImportantPoints } from '@screens/vacancyRegisterScreens/InsertVacancyImportantPoints'
import { InsertVacancyStartDate } from '@screens/vacancyRegisterScreens/InsertVacancyStartDate'
import { InsertVacancyStartHour } from '@screens/vacancyRegisterScreens/InsertVacancyStartHour'
import { InsertWorkplaceLocation } from '@screens/vacancyRegisterScreens/InsertWorkplaceLocation'
import { SelectPaymentType } from '@screens/vacancyRegisterScreens/SelectPaymentType'
import { SelectSaleValueType } from '@screens/vacancyRegisterScreens/SelectSaleValueType'
import { SelectVacancyCategory } from '@screens/vacancyRegisterScreens/SelectVacancyCategory'
import { SelectVacancyFrequency } from '@screens/vacancyRegisterScreens/SelectVacancyFrequency'
import { SelectVacancyLocationView } from '@screens/vacancyRegisterScreens/SelectVacancyLocationView'
import { SelectVacancyPurpose } from '@screens/vacancyRegisterScreens/SelectVacancyPurpose'
import { SelectVacancyRange } from '@screens/vacancyRegisterScreens/SelectVacancyRange'
import { SelectVacancyTags } from '@screens/vacancyRegisterScreens/SelectVacancyTags'
import { SelectVacancyType } from '@screens/vacancyRegisterScreens/SelectVacancyType'
import { SelectWorkplace } from '@screens/vacancyRegisterScreens/SelectWorkplace'
import { SelectWorkWeekdays } from '@screens/vacancyRegisterScreens/SelectWorkWeekdays'
import { VacancyLocationViewPreview } from '@screens/vacancyRegisterScreens/VacancyLocationViewPreview'
import { VacancyPicturePreview } from '@screens/vacancyRegisterScreens/VacancyPicturePreview'

const Stack = createStackNavigator<VacancyStackParamList>()

export function VacancyStack() {
	return (
		<VacancyProvider>
			<Stack.Navigator
				initialRouteName={'SelectVacancyPurpose'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectVacancyPurpose'} component={SelectVacancyPurpose} />
				<Stack.Screen name={'SelectVacancyCategory'} component={SelectVacancyCategory} />
				<Stack.Screen name={'SelectVacancyTags'} component={SelectVacancyTags} />
				<Stack.Screen name={'InsertVacancyDescription'} component={InsertVacancyDescription} />
				<Stack.Screen name={'InsertIncomeLinks'} component={InsertIncomeLinks} />
				<Stack.Screen name={'VacancyPicturePreview'} component={VacancyPicturePreview} />
				<Stack.Screen name={'SelectWorkplace'} component={SelectWorkplace} />
				<Stack.Screen name={'SelectVacancyType'} component={SelectVacancyType} />
				<Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertVacancyValue} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'SelectSaleValueType'} component={SelectSaleValueType} />
				<Stack.Screen name={'SelectVacancyRange'} component={SelectVacancyRange} />
				<Stack.Screen name={'SelectVacancyLocationView'} component={SelectVacancyLocationView} />
				<Stack.Screen name={'InsertWorkplaceLocation'} component={InsertWorkplaceLocation} />
				<Stack.Screen name={'VacancyLocationViewPreview'} component={VacancyLocationViewPreview} />
				<Stack.Screen name={'SelectVacancyFrequency'} component={SelectVacancyFrequency} />
				<Stack.Screen name={'SelectWorkWeekdays'} component={SelectWorkWeekdays} />
				<Stack.Screen name={'InsertVacancyStartDate'} component={InsertVacancyStartDate} />
				<Stack.Screen name={'InsertVacancyEndDate'} component={InsertVacancyEndDate} />
				<Stack.Screen name={'InsertVacancyStartHour'} component={InsertVacancyStartHour} />
				<Stack.Screen name={'InsertVacancyEndHour'} component={InsertVacancyEndHour} />
				<Stack.Screen name={'InsertVacancyImportantPoints'} component={InsertVacancyImportantPoints} />
				<Stack.Screen name={'EditVacancyPostReview'} component={EditVacancyPost} />
			</Stack.Navigator>
		</VacancyProvider>
	)
}
