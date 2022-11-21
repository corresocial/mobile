import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { SocialImpactStackParamList } from './types';
import { SocialImpactProvider } from '../../../contexts/SocialImpactContext';

const Stack = createStackNavigator<SocialImpactStackParamList>()

export function SocialImpactStack() {

    return (
        <SocialImpactProvider>
            <Stack.Navigator initialRouteName='FirstScreen'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'FirstScreen'} component={() => <></>} />
            </Stack.Navigator>
        </SocialImpactProvider>
    )
}