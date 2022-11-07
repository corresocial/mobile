import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { VacancyStackParamList } from './types';
import { VacancyProvider } from '../../../contexts/VacancyContext';

import { InsertVacancyTitle } from '../../../screens/vacancyScreens/InsertVacancyTitle';
import { InsertVacancyDescription } from '../../../screens/vacancyScreens/InsertVacancyDescription';
import { InsertVacancyQuestions } from '../../../screens/vacancyScreens/InsertVacancyQuestions';
import { InsertCompanyDescription } from '../../../screens/vacancyScreens/InsertCompanyDescriptions';
import { SelectWorkplace } from '../../../screens/vacancyScreens/SelectWorkplace';

const Stack = createStackNavigator<VacancyStackParamList>()

export function VacancyStack() {

    return (
        <VacancyProvider>
            <Stack.Navigator initialRouteName='InsertVacancyTitle'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'InsertVacancyTitle'} component={InsertVacancyTitle} />
                <Stack.Screen name={'InsertVacancyDescription'} component={InsertVacancyDescription} />
                <Stack.Screen name={'InsertVacancyQuestions'} component={InsertVacancyQuestions} />
                <Stack.Screen name={'InsertCompanyDescription'} component={InsertCompanyDescription} />
                <Stack.Screen name={'SelectWorkplace'} component={SelectWorkplace} />
            </Stack.Navigator>
        </VacancyProvider>
    )
}