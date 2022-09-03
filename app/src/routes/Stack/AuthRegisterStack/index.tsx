import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import 'react-native-gesture-handler'

import { Splash } from '../../../screens/Splash';
import { AcceptAndContinue } from './../../../screens/AcceptAndContinue'
import { InsertPhone } from '../../../screens/InsertPhone';
import { InsertConfirmationCode } from '../../../screens/InsertConfirmationCode';
import { InsertName } from '../../../screens/InsertName';
import { InsertProfilePicture } from '../../../screens/InsertProfilePicture';
import { CustomCamera } from '../../../screens/CustomCamera';
import { ProfilePicturePreview } from '../../../screens/ProfilePicturePreview';
import { WelcomeNewUser } from '../../../screens/WelcomeNewUser';
import { Home } from '../../../screens/Home';
import { UserIdentification } from '../../../screens/InsertConfirmationCode/types';

export type AuthRegisterStackParamList = {
    Splash: undefined
    AcceptAndContinue: undefined
    InsertPhone: undefined
    InsertConfirmationCode: {
        userPhone: string,
        verificationCodeId: string | void
    }
    InsertName: {
        userPhone: string
        userIdentification: UserIdentification
    }
    InsertProfilePicture: {
        userPhone: string,
        userName: string,
        userIdentification: UserIdentification
    }
    CustomCamera: {
        userPhone: string,
        userName: string,
        userIdentification: UserIdentification
    }
    ProfilePicturePreview: {
        userPhone: string,
        userName: string,
        profilePictureUri: string,
        userIdentification: UserIdentification
    }

    WelcomeNewUser: { userName: string }
    Home: undefined
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
            <Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />

            <Stack.Screen name={'Home'} component={Home} />
        </Stack.Navigator>
    )
}