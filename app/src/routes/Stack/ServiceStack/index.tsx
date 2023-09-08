import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ServiceStackParamList } from './types'

import { SelectServiceCategory } from '../../../screens/serviceRegisterScreens/SelectServiceCategory'
import { SelectServiceTags } from '../../../screens/serviceRegisterScreens/SelectServiceTags'
import { InsertServiceDescription } from '../../../screens/serviceRegisterScreens/InsertServiceDescription'
import { ServicePicturePreview } from '../../../screens/serviceRegisterScreens/ServicePicturePreview'
import { SelectPaymentType } from '../../../screens/serviceRegisterScreens/SelectPaymentType'
import { InsertExchangeValue } from '../../../screens/serviceRegisterScreens/InsertExchangeValue'
import { InsertServicePrestationLocation } from '../../../screens/serviceRegisterScreens/InsertServicePrestationLocation'
import { InsertSaleValue } from '../../../screens/serviceRegisterScreens/InsertSaleValue'
import { SelectLocationView } from '../../../screens/serviceRegisterScreens/SelectLocationView'
import { ServiceLocationViewPreview } from '../../../screens/serviceRegisterScreens/ServiceLocationViewPreview'
import { SelectDeliveryMethod } from '../../../screens/serviceRegisterScreens/SelectDeliveryMethod'
import { SelectServiceFrequency } from '../../../screens/serviceRegisterScreens/SelectServiceFrequency'
import { SelectServiceDaysOfWeek } from '../../../screens/serviceRegisterScreens/SelectServiceDaysOfWeek'
import { InsertServiceStartHour } from '../../../screens/serviceRegisterScreens/InsertServiceStartHour'
import { InsertServiceEndHour } from '../../../screens/serviceRegisterScreens/InsertServiceEndHour'
import { ServiceProvider } from '../../../contexts/ServiceContext'
import { SelectSaleValueType } from '../../../screens/serviceRegisterScreens/SelectSaleValueType'
import { SelectServiceRange } from '../../../screens/serviceRegisterScreens/SelectServiceRange'
import { EditServicePost } from '../../../screens/editPostScreens/EditServicePost'

const Stack = createStackNavigator<ServiceStackParamList>()

export function ServiceStack() {
	return (
		<ServiceProvider>
			<Stack.Navigator
				initialRouteName={'SelectServiceCategory'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'SelectServiceCategory'} component={SelectServiceCategory} />
				<Stack.Screen name={'SelectServiceTags'} component={SelectServiceTags} />
				<Stack.Screen name={'InsertServiceDescription'} component={InsertServiceDescription} />
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
			</Stack.Navigator>
		</ServiceProvider>
	)
}
