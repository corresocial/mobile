import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { SocialImpactStackParamList } from './types';
import { SocialImpactProvider } from '../../../contexts/SocialImpactContext';

import { InsertSocialImpactTitle } from '../../../screens/socialImpactScreens/InsertSocialImpactTitle';
import { InsertSocialImpactDescription } from '../../../screens/socialImpactScreens/InsertSocialImpactDescription';

const Stack = createStackNavigator<SocialImpactStackParamList>()

export function SocialImpactStack() {

    return (
        <SocialImpactProvider>
            <Stack.Navigator initialRouteName='InsertSocialImpactTitle'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'InsertSocialImpactTitle'} component={InsertSocialImpactTitle} />
                <Stack.Screen name={'InsertSocialImpactDescription'} component={InsertSocialImpactDescription} />
            </Stack.Navigator>
        </SocialImpactProvider>
    )
}