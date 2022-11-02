import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { UserStackParamList } from "../types"

export type WelcomeNewUserScreenProps = NativeStackScreenProps<UserStackParamList, 'WelcomeNewUser'>
export type HomeTabScreenProps = NativeStackScreenProps<UserStackParamList, 'HomeTab'>
export type SelectPostTypeScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectPostType'>
export type TourScreenProps = NativeStackScreenProps<UserStackParamList, 'ServiceStack'>
export type SaleStackScreenProps = NativeStackScreenProps<UserStackParamList, 'SaleStack'>