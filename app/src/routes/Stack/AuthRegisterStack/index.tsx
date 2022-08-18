import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import 'react-native-gesture-handler'

import { Splash } from '../../../screens/Splash';
import { AcceptAndContinue } from './../../../screens/AcceptAndContinue'
import { InsertPhone } from '../../../screens/InsertPhone';
import { InsertConfirmationCode } from '../../../screens/InsertConfirmationCode';
import { InsertPassword } from '../../../screens/InsertPassword';
import { InsertName } from '../../../screens/InsertName';
import { InsertProfilePicture } from '../../../screens/InsertProfilePicture';
import { CustomCamera } from '../../../screens/CustomCamera';

export type AuthRegisterStackParamList = {
    Splash: undefined
    AcceptAndContinue: undefined
    InsertPhone: undefined
    InsertConfirmationCode: { userPhone: string }
    InsertPassword: { userPhone: string }
    InsertName: { userPhone: string }
    InsertProfilePicture: { userPhone: string, userName: string }
    CustomCamera: {userPhone: string, userName: string}
};

const Stack = createStackNavigator<AuthRegisterStackParamList>()

export function AuthRegisterStack() {
    return (
        <Stack.Navigator initialRouteName='InsertProfilePicture'
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
            <Stack.Screen name={'InsertConfirmationCode'} component={InsertConfirmationCode} />
            <Stack.Screen name={'InsertPassword'} component={InsertPassword} />
            <Stack.Screen name={'InsertName'} component={InsertName} />
            <Stack.Screen name={'InsertProfilePicture'} component={InsertProfilePicture} />
            <Stack.Screen name={'CustomCamera'} component={CustomCamera} />
        </Stack.Navigator>
    )
}