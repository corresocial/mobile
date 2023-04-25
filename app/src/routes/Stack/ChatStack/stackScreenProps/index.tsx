import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ChatStackParamList } from '../types'

export type ChatConversationsScreenProps = NativeStackScreenProps<ChatStackParamList, 'ChatConversations'>
export type ProfileChatScreenProps = NativeStackScreenProps<ChatStackParamList, 'ProfileChat'>

export type ViewServicePostScreenProps = NativeStackScreenProps<ChatStackParamList, 'ViewServicePostChat'>
export type ViewSalePostScreenProps = NativeStackScreenProps<ChatStackParamList, 'ViewSalePostChat'>
export type ViewVacancyPostScreenProps = NativeStackScreenProps<ChatStackParamList, 'ViewVacancyPostChat'>
export type ViewSocialImpactPostScreenProps = NativeStackScreenProps<ChatStackParamList, 'ViewSocialImpactPostChat'>
export type ViewCulturePostScreenProps = NativeStackScreenProps<ChatStackParamList, 'ViewCulturePostChat'>
