import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PublicServiceStackParamList } from '../types'

export type SelectPublicServiceScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'SelectPublicService'>
export type InsertNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertNIS'>
export type InsertNameNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertNameNIS'>
export type SelectNISQueryDataScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'SelectNISQueryData'>
export type InsertMotherNameNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertMotherNameNIS'>
export type InsertDateOfBirthNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertDateOfBirthNIS'>
export type InsertAnonymizedCpfNISScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'InsertAnonymizedCpfNIS'>
export type QueryBeeByNISResultScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'QueryBeeByNISResult'>
export type QueryPbfByNISResultScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'QueryPbfByNISResult'>
export type QueryCadunicoByNISResultScreenProps = NativeStackScreenProps<PublicServiceStackParamList, 'QueryCadunicoByNISResult'>
