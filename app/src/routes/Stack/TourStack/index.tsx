import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { TourStackParamList } from './types';

import { WelcomeNewUser } from '../../../screens/WelcomeNewUser';
import { Profile } from '../../../screens/Profile';

const Stack = createStackNavigator<TourStackParamList>()

export function TourStack() {
    return (
        <Stack.Navigator initialRouteName='Profile'
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'Profile'} component={Profile} />
            <Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
        </Stack.Navigator>
    )
}