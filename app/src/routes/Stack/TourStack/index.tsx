import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { TourStackParamList } from './types';
import { SelectPostType } from '../../../screens/SelectPostType';
import { InsertProfileDescription } from '../../../screens/InsertProfileDescription';
import { InsertServiceName } from '../../../screens/InsertServiceName';
import { SelectServiceCategory } from '../../../screens/SelectServiceCategory';
import { InsertServicePicture } from '../../../screens/InsertServicePicture';
import { ServicePicturePreview } from '../../../screens/ServicePicturePreview';
import { SelectServiceTags } from '../../../screens/SelectServiceTags';


const Stack = createStackNavigator<TourStackParamList>()

export function TourStack() {

    return (
        <Stack.Navigator initialRouteName='SelectServiceCategory'
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name={'SelectPostType'} component={SelectPostType} />
            <Stack.Screen name={'InsertProfileDescription'} component={InsertProfileDescription} />
            <Stack.Screen name={'InsertServiceName'} component={InsertServiceName} />
            <Stack.Screen name={'InsertServicePicture'} component={InsertServicePicture} />
            <Stack.Screen name={'ServicePicturePreview'} component={ServicePicturePreview} />
            <Stack.Screen name={'SelectServiceCategory'} component={SelectServiceCategory} />
            <Stack.Screen name={'SelectServiceTags'} component={SelectServiceTags} />
        </Stack.Navigator>
    )
}