import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { IncomeProvider } from '@contexts/IncomeContext'

import { IncomeStackParamList } from './types'

import { EditSalePost } from '@screens/editPostScreens/EditSalePost'
import { SelectIncomeType } from '@screens/homeScreens/SelectIncomeType'
import { InsertExchangeValue } from '@screens/saleRegisterScreens/InsertExchangeValue'
import { InsertIncomeLinks } from '@screens/saleRegisterScreens/InsertIncomeLinks'
import { InsertSaleDescription } from '@screens/saleRegisterScreens/InsertSaleDescription'
import { InsertSaleEndHour } from '@screens/saleRegisterScreens/InsertSaleEndHour'
import { InsertSaleStartHour } from '@screens/saleRegisterScreens/InsertSaleStartHour'
import { InsertSaleValue } from '@screens/saleRegisterScreens/InsertSaleValue'
import { SaleLocationViewPreview } from '@screens/saleRegisterScreens/SaleLocationViewPreview'
import { SelectDeliveryMethod } from '@screens/saleRegisterScreens/SelectDeliveryMethod'
import { SelectItemStatus } from '@screens/saleRegisterScreens/SelectItemStatus'
import { SelectLocationView } from '@screens/saleRegisterScreens/SelectLocationView'
import { SelectPaymentType } from '@screens/saleRegisterScreens/SelectPaymentType'
import { SelectPostPicture } from '@screens/saleRegisterScreens/SelectPostPicture'
import { SelectSaleCategory } from '@screens/saleRegisterScreens/SelectSaleCategory'
import { SelectSaleDaysOfWeek } from '@screens/saleRegisterScreens/SelectSaleDaysOfWeek'
import { SelectSaleFrequency } from '@screens/saleRegisterScreens/SelectSaleFrequency'
import { SelectSaleLocation } from '@screens/saleRegisterScreens/SelectSaleLocation'
import { SelectSaleRange } from '@screens/saleRegisterScreens/SelectSaleRange'
import { SelectSaleTags } from '@screens/saleRegisterScreens/SelectSaleTags'
import { SelectSaleValueType } from '@screens/saleRegisterScreens/SelectSaleValueType'

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
					component={InsertSaleDescription}
					initialParams={route && route.params ? { ...(route.params || {}) } : {} as any} // CURRENT Type
				/>
				<Stack.Screen name={'SelectPostPicture'} component={SelectPostPicture} />
				<Stack.Screen name={'SelectSaleLocation'} component={SelectSaleLocation} />

				{/* Optional */}
				<Stack.Screen name={'SelectItemStatus'} component={SelectItemStatus} />
				<Stack.Screen name={'SelectSaleCategory'} component={SelectSaleCategory} />
				<Stack.Screen name={'SelectSaleTags'} component={SelectSaleTags} />
				<Stack.Screen name={'InsertIncomeLinks'} component={InsertIncomeLinks} />
				<Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
				<Stack.Screen name={'SelectSaleValueType'} component={SelectSaleValueType} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'SelectSaleRange'} component={SelectSaleRange} />
				<Stack.Screen name={'SelectLocationView'} component={SelectLocationView} />
				<Stack.Screen name={'SaleLocationViewPreview'} component={SaleLocationViewPreview} />
				<Stack.Screen name={'SelectDeliveryMethod'} component={SelectDeliveryMethod} />
				<Stack.Screen name={'SelectSaleFrequency'} component={SelectSaleFrequency} />
				<Stack.Screen name={'SelectSaleDaysOfWeek'} component={SelectSaleDaysOfWeek} />
				<Stack.Screen name={'InsertSaleStartHour'} component={InsertSaleStartHour} />
				<Stack.Screen name={'InsertSaleEndHour'} component={InsertSaleEndHour} />
				<Stack.Screen name={'EditSalePostReview'} component={EditSalePost} />
				<Stack.Screen name={'SelectIncomeType'} component={SelectIncomeType} />
			</Stack.Navigator>
		</IncomeProvider>
	)
}
