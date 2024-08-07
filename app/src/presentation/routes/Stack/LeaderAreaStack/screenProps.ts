import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LeaderAreaStackParamList } from './types'

export type LeaderAreaHomeScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'LeaderAreaHome'>
export type PollPetitionAreaScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'PollPetitionArea'>
export type ViewPollListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewPollList'>
export type ViewPetitionListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewPetitionList'>

export type ViewUnapprovedPostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewUnapprovedPost'>
export type ViewUnapprovedProfileScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewUnapprovedProfile'>
export type ViewUnapprovedRegistersListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewUnapprovedRegistersList'>

export type ProfileLeaderAreaScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ProfileLeaderArea'>
export type SearchProfileScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ProfileLeaderArea'>

export type CitizenRegistrationAreaScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'CitizenRegistrationArea'>
