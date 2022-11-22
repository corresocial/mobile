import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { UserStackParamList } from './types'

import { WelcomeNewUser } from '../../../screens/homeScreens/WelcomeNewUser'
import { SelectPostType } from '../../../screens/homeScreens/SelectPostType'
import { HomeTab } from '../../Tabs/HomeTab'
import { ServiceStack } from '../ServiceStack'
import { SaleStack } from '../SaleStack'
import { VacancyStack } from '../VacancyStack'
import { SocialImpactStack } from '../SocialImpactStack'
import { CultureStack } from '../CultureStack'

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
                <Stack.Screen name={'VacancyStack'} component={VacancyStack} />
                <Stack.Screen name={'CultureStack'} component={CultureStack} />
                <Stack.Screen name={'SocialImpactStack'} component={SocialImpactStack} />
            </Stack.Navigator>
    )
}