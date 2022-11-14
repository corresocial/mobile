import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { CultureStackParamList } from './types';
import { CultureProvider } from '../../../contexts/CultureContext';

import { SelectCultureType } from '../../../screens/cultureScreens/SelectCultureType';
import { InsertCultureTitle } from '../../../screens/cultureScreens/InsertCultureTitle';

const Stack = createStackNavigator<CultureStackParamList>()

export function CultureStack() {

    return (
        <CultureProvider>
            <Stack.Navigator initialRouteName='SelectCultureType'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'SelectCultureType'} component={SelectCultureType} />
                <Stack.Screen name={'InsertCultureTitle'} component={InsertCultureTitle} />
            </Stack.Navigator>
        </CultureProvider>
    )
}