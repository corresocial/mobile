import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { SaleStackParamList } from './types';
import { saleContext, SaleContext } from '../../../contexts/SaleContext';

import { SelectSaleCategory } from '../../../screens/saleScreens/SelectSaleCategory';
import { SelectSaleTags } from '../../../screens/saleScreens/SelectSaleTags';


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
            </Stack.Navigator>
        </SaleContext.Provider>
    )
}