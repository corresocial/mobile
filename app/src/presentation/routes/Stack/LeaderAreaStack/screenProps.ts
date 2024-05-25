import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LeaderAreaStackParamList } from './types'

export type LeaderAreaHomeScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'LeaderAreaHome'>
export type PollPetitionAreaScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'PollPetitionArea'>
export type ViewPollListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewPollList'>
export type ViewPetitionListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewPetitionList'>

export type ViewUnapprovedPostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewUnapprovedPost'>
export type ViewUnapprovedRegistersListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewUnapprovedRegistersList'>

export type ProfileLeaderAreaScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ProfileLeaderArea'>
export type ViewIncomePostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewIncomePostLeaderArea'>
export type ViewVacancyPostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewVacancyPostLeaderArea'>
export type ViewSocialImpactPostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewSocialImpactPostLeaderArea'>
export type ViewCulturePostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewCulturePostLeaderArea'>
