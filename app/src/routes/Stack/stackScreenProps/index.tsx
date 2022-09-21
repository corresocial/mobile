import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRegisterStackParamList } from "../AuthRegisterStack/types";
import { TourStackParamList } from "../TourStack/types";

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type AcceptAndContinueScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptAndContinue'>
export type InsertPhoneScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertPhone'>
export type InsertConfirmationCodeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertConfirmationCode'>
export type InsertNameScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertName'>
export type InsertProfilePictureScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertProfilePicture'>
export type CustomCameraScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'CustomCamera'>
export type ProfilePicturePreviewScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'ProfilePicturePreview'>
export type UserStackScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'HomeTab'>

export type HomeTabScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'HomeTab'>

export type HomeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Home'>


// export type ProfileStackScreenProps = NativeStackScreenProps<UserStackParamList, 'Profile'>

export type WelcomeNewUserScreenProps = NativeStackScreenProps<TourStackParamList, 'WelcomeNewUser'>

 