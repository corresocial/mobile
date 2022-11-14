import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { CultureStackParamList } from "../types"

export type SelectCultureTypeScreenProps = NativeStackScreenProps<CultureStackParamList, 'SelectCultureType'>
export type InsertCultureTitleScreenProps = NativeStackScreenProps<CultureStackParamList, 'InsertCultureTitle'>
export type InsertCultureDescriptionScreenProps = NativeStackScreenProps<CultureStackParamList, 'InsertCultureDescription'>
export type InsertCulturePictureScreenProps = NativeStackScreenProps<CultureStackParamList, 'InsertCulturePicture'>
