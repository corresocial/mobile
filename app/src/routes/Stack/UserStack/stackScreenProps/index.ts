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
export type ViewServicePostScreenProps = NativeStackScreenProps<UserStackParamList, 'ViewServicePost'>
export type ViewSalePostScreenProps = NativeStackScreenProps<UserStackParamList, 'ViewSalePost'>
export type ViewVacancyPostScreenProps = NativeStackScreenProps<UserStackParamList, 'ViewVacancyPost'>
export type ViewSocialImpactPostScreenProps = NativeStackScreenProps<UserStackParamList, 'ViewSocialImpactPost'>
export type ViewCulturePostScreenProps = NativeStackScreenProps<UserStackParamList, 'ViewCulturePost'>
