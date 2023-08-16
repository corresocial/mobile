import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { AuthRegisterStackParamList } from '../types'

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type AcceptAndContinueScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptAndContinue'>
export type SelectAuthMethodScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'SelectAuthMethod'>
export type InsertCellNumberScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertCellNumber'>
export type InsertConfirmationCodeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertConfirmationCode'>
export type InsertNameScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertName'>
export type InsertProfilePictureScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertProfilePicture'>
export type ProfilePicturePreviewScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'ProfilePicturePreview'>
