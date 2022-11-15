import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { CultureStackParamList } from './types';
import { CultureProvider } from '../../../contexts/CultureContext';

import { SelectCultureType } from '../../../screens/cultureScreens/SelectCultureType';
import { InsertCultureTitle } from '../../../screens/cultureScreens/InsertCultureTitle';
import { InsertCultureDescription } from '../../../screens/cultureScreens/InsertCultureDescription';
import { InsertCulturePicture } from '../../../screens/cultureScreens/InsertCulturePicture';
import { CulturePicturePreview } from '../../../screens/cultureScreens/CulturePicturePreview';
import { SelectCultureCategory } from '../../../screens/cultureScreens/SelectCultureCategory';
import { SelectCultureTags } from '../../../screens/cultureScreens/SelectCultureTags';
import { InsertEntryValue } from '../../../screens/cultureScreens/InsertEntryValue';
import { SelectExhibitionPlace } from '../../../screens/cultureScreens/SelectExhibitionPlace';

const Stack = createStackNavigator<CultureStackParamList>()

export function CultureStack() {

    return (
        <CultureProvider>
            <Stack.Navigator initialRouteName='SelectCultureType'
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name={'SelectCultureType'} component={SelectCultureType} />
                <Stack.Screen name={'InsertCultureTitle'} component={InsertCultureTitle} />
                <Stack.Screen name={'InsertCultureDescription'} component={InsertCultureDescription} />
                <Stack.Screen name={'InsertCulturePicture'} component={InsertCulturePicture} />
                <Stack.Screen name={'CulturePicturePreview'} component={CulturePicturePreview} />
                <Stack.Screen name={'SelectCultureCategory'} component={SelectCultureCategory} />
                <Stack.Screen name={'SelectCultureTags'} component={SelectCultureTags} />
                <Stack.Screen name={'InsertEntryValue'} component={InsertEntryValue} />
                <Stack.Screen name={'SelectExhibitionPlace'} component={SelectExhibitionPlace} />
            </Stack.Navigator>
        </CultureProvider>
    )
}