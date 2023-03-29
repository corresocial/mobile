import "react-native-gesture-handler";
import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

import { AuthProvider } from "@contexts/AuthContext";

import { Splash } from "@screens/Splash";
import { AcceptAndContinue } from "@screens/authRegisterScreens/AcceptAndContinue";
import { InsertCellNumber } from "@screens/authRegisterScreens/InsertCellNumber";
import { InsertConfirmationCode } from "@screens/authRegisterScreens/InsertConfirmationCode";
import { InsertName } from "@screens/authRegisterScreens/InsertName";
import { InsertProfilePicture } from "@screens/authRegisterScreens/InsertProfilePicture";
import { ProfilePicturePreview } from "@screens/authRegisterScreens/ProfilePicturePreview";
import { AuthRegisterStackParamList } from "./types";
import { UserStack } from "../UserStack";

const Stack = createStackNavigator<AuthRegisterStackParamList>();

export function AuthRegisterStack() {
	return (
		<AuthProvider>
			<Stack.Navigator
				initialRouteName={"Splash"}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={"Splash"} component={Splash} />
				<Stack.Screen
					name={"AcceptAndContinue"}
					component={AcceptAndContinue}
					options={{
						...TransitionPresets.FadeFromBottomAndroid,
					}}
				/>
				<Stack.Screen
					name={"InsertCellNumber"}
					component={InsertCellNumber}
				/>
				<Stack.Screen
					name={"InsertConfirmationCode"}
					component={InsertConfirmationCode}
				/>
				<Stack.Screen name={"InsertName"} component={InsertName} />
				<Stack.Screen
					name={"InsertProfilePicture"}
					component={InsertProfilePicture}
				/>
				<Stack.Screen
					name={"ProfilePicturePreview"}
					component={ProfilePicturePreview}
				/>

				<Stack.Screen
					name={"UserStack"}
					component={UserStack}
					options={{
						gestureEnabled: false,
					}}
				/>
			</Stack.Navigator>
		</AuthProvider>
	);
}
