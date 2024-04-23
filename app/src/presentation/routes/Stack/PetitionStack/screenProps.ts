import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PetitionStackParamList } from './types'

export type InsertPetitionTitleScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionTitle'>
export type InsertPetitionDescriptionScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionDescription'>
export type SelectIdentificationRequestScreenProps = NativeStackScreenProps<PetitionStackParamList, 'SelectIdentificationRequest'>
export type SelectPetitionMediaScreenProps = NativeStackScreenProps<PetitionStackParamList, 'SelectPetitionMedia'>
export type SelectPetitionRangeScreenProps = NativeStackScreenProps<PetitionStackParamList, 'SelectPetitionRange'>
export type PetitionReviewScreenProps = NativeStackScreenProps<PetitionStackParamList, 'PetitionReview'>
