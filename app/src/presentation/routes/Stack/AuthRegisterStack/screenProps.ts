import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { AuthRegisterStackParamList } from './types'

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type SelectAuthRegisterScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'SelectAuthRegister'>
export type AcceptTermsAndConditionsScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptTermsAndConditions'>
export type SelectAuthMethodScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'SelectAuthMethod'>
export type InsertCellNumberScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertCellNumber'>
export type InsertConfirmationCodeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertConfirmationCode'>
export type InsertNameScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertName'>
export type ProfilePicturePreviewScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'ProfilePicturePreview'>
export type UserStackScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'UserStack'>
