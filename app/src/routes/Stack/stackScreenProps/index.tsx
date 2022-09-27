import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRegisterStackParamList } from "../AuthRegisterStack/types";
import { TourStackParamList } from "../TourStack/types";
import { UserStackParamList } from "../UserStack/types";

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type AcceptAndContinueScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptAndContinue'>
export type InsertPhoneScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertPhone'>
export type InsertConfirmationCodeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertConfirmationCode'>
export type InsertNameScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertName'>
export type InsertProfilePictureScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertProfilePicture'>
export type CustomCameraScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'CustomCamera'>
export type ProfilePicturePreviewScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'ProfilePicturePreview'>

export type WelcomeNewUserScreenProps = NativeStackScreenProps<UserStackParamList, 'WelcomeNewUser'>
export type HomeTabScreenProps = NativeStackScreenProps<UserStackParamList, 'HomeTab'>
export type TourScreenProps = NativeStackScreenProps<UserStackParamList, 'TourStack'>

export type SelectPostTypeScreenProps = NativeStackScreenProps<TourStackParamList, 'SelectPostType'>
export type InsertProfileDescriptionScreenProps = NativeStackScreenProps<TourStackParamList, 'InsertProfileDescription'>
export type InsertServiceNameScreenProps = NativeStackScreenProps<TourStackParamList, 'InsertServiceName'>
export type SelectServiceCategoryScreenProps = NativeStackScreenProps<TourStackParamList, 'SelectServiceCategory'>


 