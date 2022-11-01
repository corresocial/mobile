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
import { SelectPaymentType } from '../../../screens/saleScreens/SelectPaymentType';
import { InsertSaleValue } from '../../../screens/saleScreens/InsertSaleValue';
import { InsertExchangeValue } from '../../../screens/saleScreens/InsertExchangeValue';
import { InsertSaleLocation } from '../../../screens/saleScreens/InsertSaleLocation';
import { SelectLocationView } from '../../../screens/saleScreens/SelectLocationView';


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
                <Stack.Screen name={'SelectPaymentType'} component={SelectPaymentType} />
                <Stack.Screen name={'InsertSaleValue'} component={InsertSaleValue} />
                <Stack.Screen name={'InsertExchangeValue'} component={InsertExchangeValue} />
                <Stack.Screen name={'InsertSaleLocation'} component={InsertSaleLocation} />
                <Stack.Screen name={'SelectLocationView'} component={SelectLocationView} />
            </Stack.Navigator>
        </SaleContext.Provider>
    )
}