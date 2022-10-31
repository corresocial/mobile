import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { UserStackParamList } from './types';

import { WelcomeNewUser } from '../../../screens/homeScreens/WelcomeNewUser';
import { HomeTab } from '../../Tabs/HomeTab';
import { ServiceStack } from '../ServiceStack';
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType';
import { SaleStack } from '../SaleStack';

const Stack = createStackNavigator<UserStackParamList>()

export function UserStack({ route }: any) {
    const tourPerformed = route.params && route.params.tourPerformed || false

    return (
            <Stack.Navigator initialRouteName={tourPerformed ? 'HomeTab' : 'WelcomeNewUser'}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'WelcomeNewUser'} component={WelcomeNewUser} />
                <Stack.Screen name={'HomeTab'} component={HomeTab} />
                <Stack.Screen name={'SelectPostType'} component={SelectPostType} />
                <Stack.Screen name={'ServiceStack'} component={ServiceStack} />
                <Stack.Screen name={'SaleStack'} component={SaleStack} />
            </Stack.Navigator>
    )
}