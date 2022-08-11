import React from 'react'
import { View, Text } from 'react-native';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import 'react-native-gesture-handler'

import { Splash } from '../../../screens/Splash';
const AcceptAndContinue = () => <View><Text>This is Accept and Contunue</Text></View>

export type AuthRegisterStackParamList = {
    Splash: undefined
    AcceptAndContinue: undefined
};

const Stack = createStackNavigator<AuthRegisterStackParamList>()

export function AuthRegisterStack() {
    return (
        <Stack.Navigator initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'Splash'} component={Splash}  />
            <Stack.Screen name={'AcceptAndContinue'} component={AcceptAndContinue} 
            options={{
                ...TransitionPresets.FadeFromBottomAndroid
            }}/>
        </Stack.Navigator>
    )
}