import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { CitizenRegistrationStackParamList } from './types'

export type CitizenRegistrationHomeScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'CitizenRegistrationHome'>
export type CitizenOfflineRegistrationListProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'CitizenOfflineRegistrationList'>
export type CitizenQuestionsListScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'CitizenQuestionsList'>

export type InsertBinaryResponseScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'InsertBinaryResponse'>
export type InsertSatisfactionResponseScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'InsertSatisfactionResponse'>
export type InsertTextualResponseScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'InsertTextualResponse'>
export type InsertSelectResponseScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'InsertSelectResponse'>
export type FinishCitizenRegistrationScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'FinishCitizenRegistration'>

export type WhoWeAreScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'WhoWeAre'>
export type WhoWeAreIncomeScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'WhoWeAreIncome'>
export type WhoWeAreCultureScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'WhoWeAreCulture'>
export type WhoWeAreTransformationTempScreenProps = NativeStackScreenProps<CitizenRegistrationStackParamList, 'WhoWeAreTransformation'>
