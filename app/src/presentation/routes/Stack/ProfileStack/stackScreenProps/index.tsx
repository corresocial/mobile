import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ProfileStackParamList } from '../types'

export type HomeTabScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>
export type ViewIncomePostScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ViewIncomePost'>
export type ViewVacancyPostScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ViewVacancyPost'>
export type ViewSocialImpactPostScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ViewSocialImpactPost'>
export type ViewCulturePostScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ViewCulturePost'>
export type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>
