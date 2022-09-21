import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { TourStackParamList } from './types';

import { WelcomeNewUser } from '../../../screens/WelcomeNewUser';

const Stack = createStackNavigator<TourStackParamList>()

export function TourStack() {
    return (
        <Stack.Navigator initialRouteName='WelcomeNewUser'
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
        </Stack.Navigator>
    )
}