import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { AuthProvider } from '@contexts/AuthContext'

import { AuthRegisterStackParamList } from './types'

import { AcceptTermsAndConditions } from '@screens/authRegisterScreens/AcceptTermsAndServices'
import { InsertCellNumber } from '@screens/authRegisterScreens/InsertCellNumber'
import { InsertConfirmationCode } from '@screens/authRegisterScreens/InsertConfirmationCode'
import { InsertName } from '@screens/authRegisterScreens/InsertName'
import { InsertProfilePicture } from '@screens/authRegisterScreens/InsertProfilePicture'
import { ProfilePicturePreview } from '@screens/authRegisterScreens/ProfilePicturePreview'
import { SelectAuthMethod } from '@screens/authRegisterScreens/SelectAuthMethod'
import { SelectAuthRegister } from '@screens/authRegisterScreens/SelectAuthRegister'
import { Splash } from '@screens/Splash'

import { UserStack } from '../UserStack'

const Stack = createStackNavigator<AuthRegisterStackParamList>()

export function AuthRegisterStack() {
	return (
		<AuthProvider>
			<Stack.Navigator
				initialRouteName={'Splash'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'Splash'} component={Splash} />
				<Stack.Screen
					name={'SelectAuthRegister'}
					component={SelectAuthRegister}
					options={{
						...TransitionPresets.FadeFromBottomAndroid
					}}
				/>
				<Stack.Screen name={'AcceptTermsAndConditions'} component={AcceptTermsAndConditions} />
				<Stack.Screen name={'SelectAuthMethod'} component={SelectAuthMethod} />
				<Stack.Screen name={'InsertCellNumber'} component={InsertCellNumber} />
				<Stack.Screen name={'InsertConfirmationCode'} component={InsertConfirmationCode} />
				<Stack.Screen name={'InsertName'} component={InsertName} />
				<Stack.Screen name={'InsertProfilePicture'} component={InsertProfilePicture} />
				<Stack.Screen name={'ProfilePicturePreview'} component={ProfilePicturePreview} />

				<Stack.Screen
					name={'UserStack'}
					component={UserStack}
					options={{
						gestureEnabled: false
					}}
				/>
			</Stack.Navigator>
		</AuthProvider>
	)
}
