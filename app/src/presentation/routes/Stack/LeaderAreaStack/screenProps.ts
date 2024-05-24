import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { LeaderAreaStackParamList } from './types'

export type LeaderAreaHomeScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'LeaderAreaHome'>
export type PollPetitionAreaScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'PollPetitionArea'>
export type ViewPollListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewPollList'>
export type ViewPetitionListScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewPetitionList'>

export type ViewUnapprovedPostScreenProps = NativeStackScreenProps<LeaderAreaStackParamList, 'ViewUnapprovedPost'>
