import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import 'react-native-gesture-handler'

import { AuthRegisterStackParamList } from './types';

import { Splash } from '../../../screens/Splash';
import { AcceptAndContinue } from './../../../screens/AcceptAndContinue'
import { InsertPhone } from '../../../screens/InsertPhone';
import { InsertConfirmationCode } from '../../../screens/InsertConfirmationCode';
import { InsertName } from '../../../screens/InsertName';
import { InsertProfilePicture } from '../../../screens/InsertProfilePicture';
import { CustomCamera } from '../../../screens/CustomCamera';
import { ProfilePicturePreview } from '../../../screens/ProfilePicturePreview';
import { UserStack } from '../UserStack';

const Stack = createStackNavigator<AuthRegisterStackParamList>()

export function AuthRegisterStack() {
    return (
        <Stack.Navigator initialRouteName='UserStack'
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
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
            <Stack.Screen name={'InsertName'} component={InsertName} />
            <Stack.Screen name={'InsertProfilePicture'} component={InsertProfilePicture} />
            <Stack.Screen name={'CustomCamera'} component={CustomCamera} />
            <Stack.Screen name={'ProfilePicturePreview'} component={ProfilePicturePreview} />
            {/* <Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} /> */}

            <Stack.Screen name={'UserStack'} component={UserStack} />
        </Stack.Navigator>
    )
}