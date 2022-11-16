import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { VacancyStackParamList } from './types';
import { VacancyProvider } from '../../../contexts/VacancyContext';

import { InsertVacancyTitle } from '../../../screens/vacancyScreens/InsertVacancyTitle';
import { InsertVacancyDescription } from '../../../screens/vacancyScreens/InsertVacancyDescription';
import { InsertVacancyQuestions } from '../../../screens/vacancyScreens/InsertVacancyQuestions';
import { InsertCompanyDescription } from '../../../screens/vacancyScreens/InsertCompanyDescription';
import { SelectWorkplace } from '../../../screens/vacancyScreens/SelectWorkplace';
import { InsertWorkplaceLocation } from '../../../screens/vacancyScreens/InsertWorkplaceLocation';
import { SelectVacancyCategory } from '../../../screens/vacancyScreens/SelectVacancyCategory';
import { SelectVacancyTags } from '../../../screens/vacancyScreens/SelectVacancyTags';
import { SelectVacancyType } from '../../../screens/vacancyScreens/SelectVacancyType';
import { SelectWorkWeekdays } from '../../../screens/vacancyScreens/SelectWorkWeekdays';
import { InsertWorkStartDate } from '../../../screens/vacancyScreens/InsertWorkStartDate';
import { InsertWorkStartHour } from '../../../screens/vacancyScreens/InsertWorkStartHour';
import { InsertWorkEndDate } from '../../../screens/vacancyScreens/InsertWorkEndDate';
import { InsertWorkEndHour } from '../../../screens/vacancyScreens/InsertWorkEndHour';

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
                <Stack.Screen name={'InsertWorkplaceLocation'} component={InsertWorkplaceLocation} />
                <Stack.Screen name={'SelectVacancyCategory'} component={SelectVacancyCategory} />
                <Stack.Screen name={'SelectVacancyTags'} component={SelectVacancyTags} />
                <Stack.Screen name={'SelectVacancyType'} component={SelectVacancyType} />
                <Stack.Screen name={'SelectWorkWeekdays'} component={SelectWorkWeekdays} />
                <Stack.Screen name={'InsertWorkStartDate'} component={InsertWorkStartDate} />
                <Stack.Screen name={'InsertWorkStartHour'} component={InsertWorkStartHour} />
                <Stack.Screen name={'InsertWorkEndDate'} component={InsertWorkEndDate} />
                <Stack.Screen name={'InsertWorkEndHour'} component={InsertWorkEndHour} />
            </Stack.Navigator>
        </VacancyProvider>
    )
}