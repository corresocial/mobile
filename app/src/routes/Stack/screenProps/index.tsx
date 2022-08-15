import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRegisterStackParamList } from "../AuthRegisterStack";

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type AcceptAndContinueScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptAndContinue'>
export type InsertPhoneScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertPhone'>
export type InsertPasswordScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertPassword'>
export type InsertConfirmationCodeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertConfirmationCode'>


 