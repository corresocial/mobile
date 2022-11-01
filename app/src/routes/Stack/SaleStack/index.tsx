import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { SaleStackParamList } from './types';
import { saleContext, SaleContext } from '../../../contexts/SaleContext';

import { SelectSaleCategory } from '../../../screens/saleScreens/SelectSaleCategory';
import { SelectSaleTags } from '../../../screens/saleScreens/SelectSaleTags';
import { InsertSaleTitle } from '../../../screens/saleScreens/InsertSaleTitle';
import { InsertItemName } from '../../../screens/saleScreens/InsertItemName';
import { InsertItemDescription } from '../../../screens/saleScreens/InsertItemDescription';
import { InsertSalePicture } from '../../../screens/saleScreens/InsertSalePicture';
import { SalePicturePreview } from '../../../screens/saleScreens/SalePicturePreview';


const Stack = createStackNavigator<SaleStackParamList>()

export function SaleStack() {

    return (
        <SaleContext.Provider value={saleContext}>
            <Stack.Navigator initialRouteName='SelectSaleCategory'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'SelectSaleCategory'} component={SelectSaleCategory} />
                <Stack.Screen name={'SelectSaleTags'} component={SelectSaleTags} />
                <Stack.Screen name={'InsertSaleTitle'} component={InsertSaleTitle} />
                <Stack.Screen name={'InsertItemName'} component={InsertItemName} />
                <Stack.Screen name={'InsertItemDescription'} component={InsertItemDescription} />
                <Stack.Screen name={'InsertSalePicture'} component={InsertSalePicture} />
                <Stack.Screen name={'SalePicturePreview'} component={SalePicturePreview} />
            </Stack.Navigator>
        </SaleContext.Provider>
    )
}