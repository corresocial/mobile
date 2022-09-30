import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { ServiceStackParamList } from './types';
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType';
import { InsertProfileDescription } from '../../../screens/saleScreens/InsertProfileDescription';
import { InsertServiceName } from '../../../screens/saleScreens/InsertServiceName';
import { SelectServiceCategory } from '../../../screens/saleScreens/SelectServiceCategory';
import { InsertServicePicture } from '../../../screens/saleScreens/InsertServicePicture';
import { ServicePicturePreview } from '../../../screens/saleScreens/ServicePicturePreview';
import { SelectServiceTags } from '../../../screens/saleScreens/SelectServiceTags';
import { SelectSaleOrExchange } from '../../../screens/saleScreens/SelectSaleOrExchange';


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
        </Stack.Navigator>
    )
}