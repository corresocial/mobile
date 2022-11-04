import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { VacancyStackParamList } from './types';
import { VacancyProvider } from '../../../contexts/VacancyContext';

const Stack = createStackNavigator<VacancyStackParamList>()

export function VacancyStack() {

    return (
        <VacancyProvider>
            <Stack.Navigator initialRouteName='FirstScreen'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'FirstScreen'} component={() => <></>} />
            </Stack.Navigator>
        </VacancyProvider>
    )
}