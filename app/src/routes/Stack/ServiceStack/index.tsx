import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { ServiceStackParamList } from './types'
import { InsertServiceDescription } from '../../../screens/serviceRegisterScreens/InsertServiceDescription'
import { InsertServiceName } from '../../../screens/serviceRegisterScreens/InsertServiceName'
import { SelectServiceCategory } from '../../../screens/serviceRegisterScreens/SelectServiceCategory'
import { InsertServicePicture } from '../../../screens/serviceRegisterScreens/InsertServicePicture'
import { ServicePicturePreview } from '../../../screens/serviceRegisterScreens/ServicePicturePreview'
import { SelectServiceTags } from '../../../screens/serviceRegisterScreens/SelectServiceTags'
import { SelectSaleOrExchange } from '../../../screens/serviceRegisterScreens/SelectSaleOrExchange'
import { InsertExchangeValue } from '../../../screens/serviceRegisterScreens/InsertExchangeValue'
import { InsertServicePrestationLocation } from '../../../screens/serviceRegisterScreens/InsertServicePrestationLocation'
import { InsertSaleValue } from '../../../screens/serviceRegisterScreens/InsertSaleValue'
import { SelectLocationView } from '../../../screens/serviceRegisterScreens/SelectLocationView'
import { LocationViewPreview } from '../../../screens/serviceRegisterScreens/LocationViewPreview'
import { SelectDeliveryMethod } from '../../../screens/serviceRegisterScreens/SelectDeliveryMethod'
import { SelectServiceFrequency } from '../../../screens/serviceRegisterScreens/SelectServiceFrequency'
import { SelectDaysOfWeek } from '../../../screens/serviceRegisterScreens/SelectDaysOfWeek'
import { InsertOpeningHour } from '../../../screens/serviceRegisterScreens/InsertOpeningHour'
import { InsertClosingHour } from '../../../screens/serviceRegisterScreens/InsertClosingHour'
import { ServiceProvider } from '../../../contexts/ServiceContext'

const Stack = createStackNavigator<ServiceStackParamList>()

export function ServiceStack() {
	return (
		<ServiceProvider>
			<Stack.Navigator
				initialRouteName={'InsertServiceName'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'InsertServiceDescription'} component={InsertServiceDescription} />
				<Stack.Screen name={'InsertServiceName'} component={InsertServiceName} />
				<Stack.Screen name={'InsertServicePicture'} component={InsertServicePicture} />
				<Stack.Screen name={'ServicePicturePreview'} component={ServicePicturePreview} />
				<Stack.Screen name={'SelectServiceCategory'} component={SelectServiceCategory} />
				<Stack.Screen name={'SelectServiceTags'} component={SelectServiceTags} />
				<Stack.Screen name={'SelectSaleOrExchange'} component={SelectSaleOrExchange} />
				<Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
				<Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
				<Stack.Screen name={'InsertServicePrestationLocation'} component={InsertServicePrestationLocation} />
				<Stack.Screen name={'SelectLocationView'} component={SelectLocationView} />
				<Stack.Screen name={'LocationViewPreview'} component={LocationViewPreview} />
				<Stack.Screen name={'SelectDeliveryMethod'} component={SelectDeliveryMethod} />
				<Stack.Screen name={'SelectServiceFrequency'} component={SelectServiceFrequency} />
				<Stack.Screen name={'SelectDaysOfWeek'} component={SelectDaysOfWeek} />
				<Stack.Screen name={'InsertOpeningHour'} component={InsertOpeningHour} />
				<Stack.Screen name={'InsertClosingHour'} component={InsertClosingHour} />
			</Stack.Navigator>
		</ServiceProvider>
	)
}
