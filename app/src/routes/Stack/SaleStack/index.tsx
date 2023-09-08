import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { SaleStackParamList } from './types'

import { SaleProvider } from '../../../contexts/SaleContext'

import { SelectSaleCategory } from '../../../screens/saleRegisterScreens/SelectSaleCategory'
import { SelectSaleTags } from '../../../screens/saleRegisterScreens/SelectSaleTags'
import { InsertSaleDescription } from '../../../screens/saleRegisterScreens/InsertSaleDescription'
import { SalePicturePreview } from '../../../screens/saleRegisterScreens/SalePicturePreview'
import { SelectPaymentType } from '../../../screens/saleRegisterScreens/SelectPaymentType'
import { InsertSaleValue } from '../../../screens/saleRegisterScreens/InsertSaleValue'
import { InsertExchangeValue } from '../../../screens/saleRegisterScreens/InsertExchangeValue'
import { SelectSaleValueType } from '../../../screens/saleRegisterScreens/SelectSaleValueType'
import { InsertSaleLocation } from '../../../screens/saleRegisterScreens/InsertSaleLocation'
import { SelectLocationView } from '../../../screens/saleRegisterScreens/SelectLocationView'
import { SaleLocationViewPreview } from '../../../screens/saleRegisterScreens/SaleLocationViewPreview'
import { SelectDeliveryMethod } from '../../../screens/saleRegisterScreens/SelectDeliveryMethod'
import { SelectSaleFrequency } from '../../../screens/saleRegisterScreens/SelectSaleFrequency'
import { SelectSaleDaysOfWeek } from '../../../screens/saleRegisterScreens/SelectSaleDaysOfWeek'
import { InsertSaleStartHour } from '../../../screens/saleRegisterScreens/InsertSaleStartHour'
import { InsertSaleEndHour } from '../../../screens/saleRegisterScreens/InsertSaleEndHour'
import { SelectSaleRange } from '../../../screens/saleRegisterScreens/SelectSaleRange'
import { SelectItemStatus } from '../../../screens/saleRegisterScreens/SelectItemStatus'
import { EditSalePost } from '../../../screens/editPostScreens/EditSalePost'

const Stack = createStackNavigator<SaleStackParamList>()

export function SaleStack() {
	return (
		<SaleProvider>
			<Stack.Navigator
				initialRouteName={'SelectItemStatus'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectItemStatus'} component={SelectItemStatus} />
				<Stack.Screen name={'SelectSaleCategory'} component={SelectSaleCategory} />
				<Stack.Screen name={'SelectSaleTags'} component={SelectSaleTags} />
				<Stack.Screen name={'InsertSaleDescription'} component={InsertSaleDescription} />
				<Stack.Screen name={'SalePicturePreview'} component={SalePicturePreview} />
				<Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
				<Stack.Screen name={'SelectSaleValueType'} component={SelectSaleValueType} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'SelectSaleRange'} component={SelectSaleRange} />
				<Stack.Screen name={'SelectLocationView'} component={SelectLocationView} />
				<Stack.Screen name={'InsertSaleLocation'} component={InsertSaleLocation} />
				<Stack.Screen name={'SaleLocationViewPreview'} component={SaleLocationViewPreview} />
				<Stack.Screen name={'SelectDeliveryMethod'} component={SelectDeliveryMethod} />
				<Stack.Screen name={'SelectSaleFrequency'} component={SelectSaleFrequency} />
				<Stack.Screen name={'SelectSaleDaysOfWeek'} component={SelectSaleDaysOfWeek} />
				<Stack.Screen name={'InsertSaleStartHour'} component={InsertSaleStartHour} />
				<Stack.Screen name={'InsertSaleEndHour'} component={InsertSaleEndHour} />
				<Stack.Screen name={'EditSalePostReview'} component={EditSalePost} />
			</Stack.Navigator>
		</SaleProvider>
	)
}
