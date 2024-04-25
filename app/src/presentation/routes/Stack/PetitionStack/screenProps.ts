import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PetitionStackParamList } from './types'

export type InsertPetitionTitleScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionTitle'>
export type InsertPetitionDescriptionScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionDescription'>
export type SelectIdentificationRequestScreenProps = NativeStackScreenProps<PetitionStackParamList, 'SelectIdentificationRequest'>
export type SelectPetitionMediaScreenProps = NativeStackScreenProps<PetitionStackParamList, 'SelectPetitionMedia'>
export type SelectPetitionRangeScreenProps = NativeStackScreenProps<PetitionStackParamList, 'SelectPetitionRange'>
export type InsertPetitionLocationScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionLocation'>

export type PetitionReviewScreenProps = NativeStackScreenProps<PetitionStackParamList, 'PetitionReview'>
export type ViewPetitionScreenProps = NativeStackScreenProps<PetitionStackParamList, 'ViewPetition'>

export type InsertPetitionFullNameScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionFullName'>
export type InsertPetitionEmailScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionEmail'>
export type InsertPetitionPhoneScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionPhone'>
export type InsertPetitionRGScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionRG'>
export type InsertPetitionCPFScreenProps = NativeStackScreenProps<PetitionStackParamList, 'InsertPetitionCPF'>
export type FinishPetitionSignatureScreenProps = NativeStackScreenProps<PetitionStackParamList, 'FinishPetitionSignature'>
