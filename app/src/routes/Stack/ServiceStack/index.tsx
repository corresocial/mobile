import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { ServiceStackParamList } from './types';
import { InsertProfileDescription } from '../../../screens/serviceScreens/InsertProfileDescription';
import { InsertServiceName } from '../../../screens/serviceScreens/InsertServiceName';
import { SelectServiceCategory } from '../../../screens/serviceScreens/SelectServiceCategory';
import { InsertServicePicture } from '../../../screens/serviceScreens/InsertServicePicture';
import { ServicePicturePreview } from '../../../screens/serviceScreens/ServicePicturePreview';
import { SelectServiceTags } from '../../../screens/serviceScreens/SelectServiceTags';
import { SelectSaleOrExchange } from '../../../screens/serviceScreens/SelectSaleOrExchange';
import { InsertExchangeValue } from '../../../screens/serviceScreens/InsertExchangeValue';
import { InsertServicePrestationLocation } from '../../../screens/serviceScreens/InsertServicePrestationLocation';
import { InsertSaleValue } from '../../../screens/serviceScreens/InsertSaleValue';
import { SelectLocationView } from '../../../screens/serviceScreens/SelectLocationView';
import { LocationViewPreview } from '../../../screens/serviceScreens/LocationViewPreview';
import { SelectDeliveryMethod } from '../../../screens/serviceScreens/SelectDeliveryMethod';
import { SelectServiceFrequency } from '../../../screens/serviceScreens/SelectServiceFrequency';
import { SelectDaysOfWeek } from '../../../screens/serviceScreens/SelectDaysOfWeek';
import { InsertOpeningHour } from '../../../screens/serviceScreens/InsertOpeningHour';
import { InsertClosingHour } from '../../../screens/serviceScreens/InsertClosingHour';
import { ServiceProvider } from '../../../contexts/ServiceContext';


const Stack = createStackNavigator<ServiceStackParamList>()

export function ServiceStack() {

    return (
        <ServiceProvider>
            <Stack.Navigator initialRouteName='InsertProfileDescription'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'InsertProfileDescription'} component={InsertProfileDescription} />
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