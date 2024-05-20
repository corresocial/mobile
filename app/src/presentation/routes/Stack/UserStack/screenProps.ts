import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { UserStackParamList } from './types'

export type WelcomeNewUserScreenProps = NativeStackScreenProps<UserStackParamList, 'WelcomeNewUser'>
export type HomeTabStackScreenProps = NativeStackScreenProps<UserStackParamList, 'HomeTab'>

export type OfflinePostsManagementScreenProps = NativeStackScreenProps<UserStackParamList, 'OfflinePostsManagement'>

export type SelectPostTypeScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectPostType'>
export type SelectIncomeTypeScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectIncomeType'>
export type TourScreenProps = NativeStackScreenProps<UserStackParamList, 'ServiceStack'>
export type SaleStackScreenProps = NativeStackScreenProps<UserStackParamList, 'SaleStack'>
export type VacancyStackScreenProps = NativeStackScreenProps<UserStackParamList, 'VacancyStack'>
export type CultureStackScreenProps = NativeStackScreenProps<UserStackParamList, 'CultureStack'>
export type SocialImpactStackScreenProps = NativeStackScreenProps<UserStackParamList, 'SocialImpactStack'>
export type PollStackScreenProps = NativeStackScreenProps<UserStackParamList, 'PollStack'>
export type PetitionStackScreenProps = NativeStackScreenProps<UserStackParamList, 'PetitionStack'>

export type ContactUsScreenProps = NativeStackScreenProps<UserStackParamList, 'ContactUsUserStack'>
export type ContactUsInsertMessageScreenProps = NativeStackScreenProps<UserStackParamList, 'ContactUsInsertMessageUserStack'>
export type ContactUsSuccessScreenProps = NativeStackScreenProps<UserStackParamList, 'ContactUsSuccessUserStack'>

export type SelectSubscriptionRangeScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectSubscriptionRange'>
export type SelectSubscriptionPlanScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectSubscriptionPlan'>
export type SelectSubsciptionPaymentMethodScreenProps = NativeStackScreenProps<UserStackParamList, 'SelectSubsciptionPaymentMethod'>
export type FinishSubscriptionPaymentByPixScreenProps = NativeStackScreenProps<UserStackParamList, 'FinishSubscriptionPaymentByPix'>
export type FinishSubscriptionPaymentByCardScreenProps = NativeStackScreenProps<UserStackParamList, 'FinishSubscriptionPaymentByCard'>
export type SubscriptionPaymentResultScreenProps = NativeStackScreenProps<UserStackParamList, 'SubscriptionPaymentResult'>
export type EditCurrentSubscriptionScreenProps = NativeStackScreenProps<UserStackParamList, 'EditCurrentSubscription'>
