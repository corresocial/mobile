import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { HomeStackParamList } from './types'

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>
export type ViewPostsByRangeScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewPostsByRange'>
export type ViewPostsByPostTypeScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewPostsByPostType'>
export type ViewPostsByMacroCategoryScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewPostsByMacroCategory'>
export type EventsCalendarScreenProps = NativeStackScreenProps<HomeStackParamList, 'EventsCalendar'>
export type SearchResultScreenProps = NativeStackScreenProps<HomeStackParamList, 'SearchResult'>

export type ProfileHomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'ProfileHome'>
export type PostViewHomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'PostViewHome'>
export type SocialMediaManagementHomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'SocialMediaManagementHome'>

export type PublicServicesStackScreenProps = NativeStackScreenProps<HomeStackParamList, 'PublicServicesStack'>
