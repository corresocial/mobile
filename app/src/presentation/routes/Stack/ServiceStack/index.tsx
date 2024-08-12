import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { ServiceProvider } from '@contexts/ServiceContext'

import { ServiceStackParamList } from './types'

import { EditServicePost } from '@screens/editPostScreens/EditServicePost'
import { SelectIncomeType } from '@screens/homeScreens/SelectIncomeType'
import { InsertIncomeLinks } from '@screens/saleRegisterScreens/InsertIncomeLinks'
import { InsertExchangeValue } from '@screens/serviceRegisterScreens/InsertExchangeValue'
import { InsertSaleValue } from '@screens/serviceRegisterScreens/InsertSaleValue'
import { InsertServiceDescription } from '@screens/serviceRegisterScreens/InsertServiceDescription'
import { InsertServiceEndHour } from '@screens/serviceRegisterScreens/InsertServiceEndHour'
import { InsertServicePrestationLocation } from '@screens/serviceRegisterScreens/InsertServicePrestationLocation'
import { InsertServiceStartHour } from '@screens/serviceRegisterScreens/InsertServiceStartHour'
import { SelectDeliveryMethod } from '@screens/serviceRegisterScreens/SelectDeliveryMethod'
import { SelectLocationView } from '@screens/serviceRegisterScreens/SelectLocationView'
import { SelectPaymentType } from '@screens/serviceRegisterScreens/SelectPaymentType'
import { SelectSaleValueType } from '@screens/serviceRegisterScreens/SelectSaleValueType'
import { SelectServiceCategory } from '@screens/serviceRegisterScreens/SelectServiceCategory'
import { SelectServiceDaysOfWeek } from '@screens/serviceRegisterScreens/SelectServiceDaysOfWeek'
import { SelectServiceFrequency } from '@screens/serviceRegisterScreens/SelectServiceFrequency'
import { SelectServiceRange } from '@screens/serviceRegisterScreens/SelectServiceRange'
import { SelectServiceTags } from '@screens/serviceRegisterScreens/SelectServiceTags'
import { ServiceLocationViewPreview } from '@screens/serviceRegisterScreens/ServiceLocationViewPreview'
import { ServicePicturePreview } from '@screens/serviceRegisterScreens/ServicePicturePreview'

import { ServiceStackScreenProps } from '../UserStack/screenProps'

const Stack = createStackNavigator<ServiceStackParamList>()

export function ServiceStack({ route }: ServiceStackScreenProps) {
	return (
		<ServiceProvider>
			<Stack.Navigator
				initialRouteName={'InsertServiceDescription'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					name={'InsertServiceDescription'}
					component={InsertServiceDescription}
					initialParams={route && route.params ? { ...(route.params || {}) } : {} as any}
				/>
				<Stack.Screen name={'SelectServiceCategory'} component={SelectServiceCategory} />
				<Stack.Screen name={'SelectServiceTags'} component={SelectServiceTags} />
				<Stack.Screen name={'InsertIncomeLinks'} component={InsertIncomeLinks} />
				<Stack.Screen name={'ServicePicturePreview'} component={ServicePicturePreview} />
				<Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
				<Stack.Screen name={'SelectSaleValueType'} component={SelectSaleValueType} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'SelectServiceRange'} component={SelectServiceRange} />
				<Stack.Screen name={'SelectLocationView'} component={SelectLocationView} />
				<Stack.Screen name={'InsertServicePrestationLocation'} component={InsertServicePrestationLocation} />
				<Stack.Screen name={'ServiceLocationViewPreview'} component={ServiceLocationViewPreview} />
				<Stack.Screen name={'SelectDeliveryMethod'} component={SelectDeliveryMethod} />
				<Stack.Screen name={'SelectServiceFrequency'} component={SelectServiceFrequency} />
				<Stack.Screen name={'SelectServiceDaysOfWeek'} component={SelectServiceDaysOfWeek} />
				<Stack.Screen name={'InsertServiceStartHour'} component={InsertServiceStartHour} />
				<Stack.Screen name={'InsertServiceEndHour'} component={InsertServiceEndHour} />
				<Stack.Screen name={'EditServicePostReview'} component={EditServicePost} />

				<Stack.Screen name={'SelectIncomeType'} component={SelectIncomeType} />
			</Stack.Navigator>
		</ServiceProvider>
	)
}
