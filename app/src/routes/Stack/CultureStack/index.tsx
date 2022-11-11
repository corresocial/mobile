import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { CultureStackParamList } from './types';

const Stack = createStackNavigator<CultureStackParamList>()

export function CultureStack() {

    return (
            <Stack.Navigator initialRouteName='FirstScreen'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'FirstScreen'} component={() => <></>} />
            </Stack.Navigator>
    )
}