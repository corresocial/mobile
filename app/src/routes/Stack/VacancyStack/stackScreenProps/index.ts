import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { VacancyStackParamList } from "../types"

export type InsertVacancyTitleScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertVacancyTitle'>
export type InsertVacancyDescriptionScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertVacancyDescription'>
export type InsertVacancyQuestionsScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertVacancyQuestions'>
export type InsertCompanyDescriptionScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertCompanyDescription'>
export type SelectWorkplaceScreenProps = NativeStackScreenProps<VacancyStackParamList, 'SelectWorkplace'>
export type InsertWorkplaceLocationScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertWorkplaceLocation'>
export type SelectVacancyCategoryScreenProps = NativeStackScreenProps<VacancyStackParamList, 'SelectVacancyCategory'>
export type SelectVacancyTagsScreenProps = NativeStackScreenProps<VacancyStackParamList, 'SelectVacancyTags'>
export type SelectVacancyTypeScreenProps = NativeStackScreenProps<VacancyStackParamList, 'SelectVacancyType'>
export type SelectWorkWeekdaysScreenProps = NativeStackScreenProps<VacancyStackParamList, 'SelectWorkWeekdays'>
export type InsertStartWorkHourScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertStartWorkHour'>
export type InsertEndWorkHourScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertEndWorkHour'>
export type InsertStartWorkDateScreenProps = NativeStackScreenProps<VacancyStackParamList, 'InsertStartWorkDate'>