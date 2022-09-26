import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { TourStackParamList } from './types';
import { SelectPostType } from '../../../screens/SelectPostType';
import { InsertProfileDescription } from '../../../screens/InsertProfileDescription';


const Stack = createStackNavigator<TourStackParamList>()

export function TourStack() {

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
        </Stack.Navigator>
    )
}