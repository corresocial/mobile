import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { HomeStackParamList } from '../types'

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>
export type ViewServicePostScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewServicePostHome'>
export type ViewSalePostScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewSalePostHome'>
export type ViewVacancyPostScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewVacancyPostHome'>
export type ViewSocialImpactPostScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewSocialImpactPostHome'>
export type ViewCulturePostScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewCulturePostHome'>
export type PostCategoriesScreenProps = NativeStackScreenProps<HomeStackParamList, 'PostCategories'>
