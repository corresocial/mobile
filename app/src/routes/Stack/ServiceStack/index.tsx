import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { ServiceStackParamList } from './types';
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType';
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


const Stack = createStackNavigator<ServiceStackParamList>()

export function ServiceStack() {

    return (
        <Stack.Navigator initialRouteName='SelectPostType'
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'SelectPostType'} component={SelectPostType} />
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
        </Stack.Navigator>
    )
}