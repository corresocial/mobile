import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { UserStackParamList } from '../types'

export type WelcomeNewUserScreenProps = NativeStackScreenProps<UserStackParamList, 'WelcomeNewUser'>
export type HomeTabScreenProps = NativeStackScreenProps<UserStackParamList, 'HomeTab'>
export type SelectPostTypeScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectPostType'>
export type TourScreenProps = NativeStackScreenProps<UserStackParamList, 'ServiceStack'>
export type SaleStackScreenProps = NativeStackScreenProps<UserStackParamList, 'SaleStack'>
export type VacancyStackScreenProps = NativeStackScreenProps<UserStackParamList, 'VacancyStack'>
export type CultureStackScreenProps = NativeStackScreenProps<UserStackParamList, 'CultureStack'>
export type SocialImpactStackScreenProps = NativeStackScreenProps<UserStackParamList, 'SocialImpactStack'>
export type EditProfileScreenProps = NativeStackScreenProps<UserStackParamList, 'EditProfile'>
export type EditUserNameScreenProps = NativeStackScreenProps<UserStackParamList, 'EditUserName'>
export type EditUserDescriptionScreenProps = NativeStackScreenProps<UserStackParamList, 'EditUserDescription'>
