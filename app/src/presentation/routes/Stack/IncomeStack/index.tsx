import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { IncomeProvider } from '@contexts/IncomeContext'

import { IncomeStackParamList } from './types'

import { IncomePostReview } from '@screens/editPostScreens/IncomePostReview'
import { IncomeLocationViewPreview } from '@screens/saleRegisterScreens/IncomeLocationViewPreview'
import { InsertExchangeValue } from '@screens/saleRegisterScreens/InsertExchangeValue'
import { InsertIncomeDescription } from '@screens/saleRegisterScreens/InsertIncomeDescription'
import { InsertIncomeEndHour } from '@screens/saleRegisterScreens/InsertIncomeEndHour'
import { InsertIncomeLinks } from '@screens/saleRegisterScreens/InsertIncomeLinks'
import { InsertIncomeStartHour } from '@screens/saleRegisterScreens/InsertIncomeStartHour'
import { InsertSaleValue } from '@screens/saleRegisterScreens/InsertSaleValue'
import { SelectDeliveryMethod } from '@screens/saleRegisterScreens/SelectDeliveryMethod'
import { SelectIncomeCategory } from '@screens/saleRegisterScreens/SelectIncomeCategory'
import { SelectIncomeDaysOfWeek } from '@screens/saleRegisterScreens/SelectIncomeDaysOfWeek'
import { SelectIncomeFrequency } from '@screens/saleRegisterScreens/SelectIncomeFrequency'
import { SelectIncomeLocation } from '@screens/saleRegisterScreens/SelectIncomeLocation'
import { SelectIncomeRange } from '@screens/saleRegisterScreens/SelectIncomeRange'
import { SelectIncomeTags } from '@screens/saleRegisterScreens/SelectIncomeTags'
import { SelectIncomeType } from '@screens/saleRegisterScreens/SelectIncomeType'
import { SelectItemStatus } from '@screens/saleRegisterScreens/SelectItemStatus'
import { SelectLocationView } from '@screens/saleRegisterScreens/SelectLocationView'
import { SelectPaymentType } from '@screens/saleRegisterScreens/SelectPaymentType'
import { SelectPostPicture } from '@screens/saleRegisterScreens/SelectPostPicture'
import { SelectSaleValueType } from '@screens/saleRegisterScreens/SelectSaleValueType'
import { InsertVacancyEndDate } from '@screens/vacancyRegisterScreens/InsertVacancyEndDate'
import { InsertVacancyImportantPoints } from '@screens/vacancyRegisterScreens/InsertVacancyImportantPoints'
import { InsertVacancyStartDate } from '@screens/vacancyRegisterScreens/InsertVacancyStartDate'
import { SelectVacancyType } from '@screens/vacancyRegisterScreens/SelectVacancyType'
import { SelectWorkplace } from '@screens/vacancyRegisterScreens/SelectWorkplace'

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
					initialParams={route && route.params ? { ...(route.params || {}) } : {} as any} // CURRENT Type
				/>
				<Stack.Screen name={'SelectPostPicture'} component={SelectPostPicture} />
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
				<Stack.Screen name={'IncomeLocationViewPreview'} component={IncomeLocationViewPreview} />
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
