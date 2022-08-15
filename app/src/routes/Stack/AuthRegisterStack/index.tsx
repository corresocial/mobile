import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import 'react-native-gesture-handler'

import { Splash } from '../../../screens/Splash';
import { AcceptAndContinue } from './../../../screens/AcceptAndContinue'
import { InsertPhone } from '../../../screens/InsertPhone';
import { InsertPassword } from '../../../screens/InsertPassword';
import { InsertConfirmationCode } from '../../../screens/InsertConfirmationCode';

export type AuthRegisterStackParamList = {
    Splash: undefined
    AcceptAndContinue: undefined
    InsertPhone: undefined
    InsertPassword: { userPhone: string }
    InsertConfirmationCode: { userPhone: string }
};

const Stack = createStackNavigator<AuthRegisterStackParamList>()

export function AuthRegisterStack() {
    return (
        <Stack.Navigator initialRouteName='InsertPhone'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'Splash'} component={Splash} />
            <Stack.Screen name={'AcceptAndContinue'} component={AcceptAndContinue}
                options={{
                    ...TransitionPresets.FadeFromBottomAndroid
                }} />
            <Stack.Screen name={'InsertPhone'} component={InsertPhone} />
            <Stack.Screen name={'InsertPassword'} component={InsertPassword} />
            <Stack.Screen name={'InsertConfirmationCode'} component={InsertConfirmationCode} />
        </Stack.Navigator>
    )
}