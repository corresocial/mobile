import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRegisterStackParamList } from "../AuthRegisterStack";

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type AuthScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptAndContinue'>


 