import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { HomeStackParamList } from './types'

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>

export type PostViewHomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'PostViewHome'>

export type PostCategoriesScreenProps = NativeStackScreenProps<HomeStackParamList, 'PostCategories'>
export type ViewPostsByPostTypeScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewPostsByPostType'>
export type PostCategoryDetailsScreenProps = NativeStackScreenProps<HomeStackParamList, 'PostCategoryDetails'>
export type ViewAllTagsScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewAllTags'>
export type ViewPostsByRangeScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewPostsByRange'>
export type ViewAllCategoriesScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewAllCategories'>
export type ViewPostsByTagScreenProps = NativeStackScreenProps<HomeStackParamList, 'ViewPostsByTag'>
export type SearchResultScreenProps = NativeStackScreenProps<HomeStackParamList, 'SearchResult'>
export type EventsCalendarScreenProps = NativeStackScreenProps<HomeStackParamList, 'EventsCalendar'>

export type ProfileHomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'ProfileHome'>
export type SocialMediaManagementHomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'SocialMediaManagementHome'>

export type PublicServicesStackScreenProps = NativeStackScreenProps<HomeStackParamList, 'PublicServicesStack'>
