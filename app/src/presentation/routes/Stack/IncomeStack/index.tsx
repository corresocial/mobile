import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { IncomeProvider } from '@contexts/IncomeContext'

import { IncomeStackParamList } from './types'

import { IncomePostReview } from '@screens/editPostScreens/IncomePostReview'
import { InsertExchangeValue } from '@screens/incomeRegisterScreens/InsertExchangeValue'
import { InsertIncomeDescription } from '@screens/incomeRegisterScreens/InsertIncomeDescription'
import { InsertIncomeEndHour } from '@screens/incomeRegisterScreens/InsertIncomeEndHour'
import { InsertIncomeLinks } from '@screens/incomeRegisterScreens/InsertIncomeLinks'
import { InsertIncomeStartHour } from '@screens/incomeRegisterScreens/InsertIncomeStartHour'
import { InsertSaleValue } from '@screens/incomeRegisterScreens/InsertSaleValue'
import { InsertVacancyEndDate } from '@screens/incomeRegisterScreens/InsertVacancyEndDate'
import { InsertVacancyImportantPoints } from '@screens/incomeRegisterScreens/InsertVacancyImportantPoints'
import { InsertVacancyStartDate } from '@screens/incomeRegisterScreens/InsertVacancyStartDate'
import { SelectDeliveryMethod } from '@screens/incomeRegisterScreens/SelectDeliveryMethod'
import { SelectIncomeCategory } from '@screens/incomeRegisterScreens/SelectIncomeCategory'
import { SelectIncomeDaysOfWeek } from '@screens/incomeRegisterScreens/SelectIncomeDaysOfWeek'
import { SelectIncomeFrequency } from '@screens/incomeRegisterScreens/SelectIncomeFrequency'
import { SelectIncomeLocation } from '@screens/incomeRegisterScreens/SelectIncomeLocation'
import { SelectIncomePostMedia } from '@screens/incomeRegisterScreens/SelectIncomePostMedia'
import { SelectIncomeRange } from '@screens/incomeRegisterScreens/SelectIncomeRange'
import { SelectIncomeTags } from '@screens/incomeRegisterScreens/SelectIncomeTags'
import { SelectIncomeType } from '@screens/incomeRegisterScreens/SelectIncomeType'
import { SelectItemStatus } from '@screens/incomeRegisterScreens/SelectItemStatus'
import { SelectLocationView } from '@screens/incomeRegisterScreens/SelectLocationView'
import { SelectPaymentType } from '@screens/incomeRegisterScreens/SelectPaymentType'
import { SelectSaleValueType } from '@screens/incomeRegisterScreens/SelectSaleValueType'
import { SelectVacancyType } from '@screens/incomeRegisterScreens/SelectVacancyType'
import { SelectWorkplace } from '@screens/incomeRegisterScreens/SelectWorkplace'

import { IncomeStackScreenProps } from '../UserStack/screenProps'

const Stack = createStackNavigator<IncomeStackParamList>()

export function IncomeStack({ route }: IncomeStackScreenProps) {
	return (
		<IncomeProvider>
			<Stack.Navigator
				initialRouteName={'InsertIncomeDescription'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					name={'InsertIncomeDescription'}
					component={InsertIncomeDescription}
					initialParams={route && route.params ? { ...(route.params || {}) } : {}}
				/>
				<Stack.Screen name={'SelectIncomePostMedia'} component={SelectIncomePostMedia} />
				<Stack.Screen name={'SelectIncomeLocation'} component={SelectIncomeLocation} />
				<Stack.Screen name={'IncomePostReview'} component={IncomePostReview} />

				{/* Optional */}
				<Stack.Screen name={'SelectIncomeType'} component={SelectIncomeType} />
				<Stack.Screen name={'SelectIncomeCategory'} component={SelectIncomeCategory} />
				<Stack.Screen name={'SelectItemStatus'} component={SelectItemStatus} />
				<Stack.Screen name={'SelectIncomeTags'} component={SelectIncomeTags} />
				<Stack.Screen name={'InsertIncomeLinks'} component={InsertIncomeLinks} />
				<Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
				<Stack.Screen name={'SelectSaleValueType'} component={SelectSaleValueType} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'SelectIncomeRange'} component={SelectIncomeRange} />
				<Stack.Screen name={'SelectLocationView'} component={SelectLocationView} />
				<Stack.Screen name={'SelectDeliveryMethod'} component={SelectDeliveryMethod} />
				<Stack.Screen name={'SelectIncomeFrequency'} component={SelectIncomeFrequency} />
				<Stack.Screen name={'SelectIncomeDaysOfWeek'} component={SelectIncomeDaysOfWeek} />
				<Stack.Screen name={'InsertIncomeStartHour'} component={InsertIncomeStartHour} />
				<Stack.Screen name={'InsertIncomeEndHour'} component={InsertIncomeEndHour} />

				{/* Vacancy */}
				<Stack.Screen name={'InsertVacancyStartDate'} component={InsertVacancyStartDate} />
				<Stack.Screen name={'InsertVacancyEndDate'} component={InsertVacancyEndDate} />
				<Stack.Screen name={'InsertVacancyImportantPoints'} component={InsertVacancyImportantPoints} />
				<Stack.Screen name={'SelectWorkplace'} component={SelectWorkplace} />
				<Stack.Screen name={'SelectVacancyType'} component={SelectVacancyType} />
			</Stack.Navigator>
		</IncomeProvider>
	)
}
