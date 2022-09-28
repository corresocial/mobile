import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { UserStackParamList } from './types';

import { WelcomeNewUser } from '../../../screens/homeScreens/WelcomeNewUser';
import { HomeTab } from '../../Tabs/HomeTab';
import { ServiceStack } from '../ServiceStack';

const Stack = createStackNavigator<UserStackParamList>()

export function UserStack() {

    return (
        <Stack.Navigator initialRouteName='WelcomeNewUser'
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
            <Stack.Screen name={'HomeTab'} component={HomeTab} />
            <Stack.Screen name={'ServiceStack'} component={ServiceStack} />
        </Stack.Navigator>
    )
}