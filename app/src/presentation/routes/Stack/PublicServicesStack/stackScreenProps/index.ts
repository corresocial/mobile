import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PublicServiceStackParamList } from '../types'

export type SelectPublicServiceScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'SelectPublicService'>
export type QueryResultScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'QueryResult'>
export type InsertNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertNIS'>
export type InsertNameNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertNameNIS'>
export type SelectNISQueryDataScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'SelectNISQueryData'>
export type InsertMotherNameNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertMotherNameNIS'>
export type InsertDateOfBirthNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertDateOfBirthNIS'>
