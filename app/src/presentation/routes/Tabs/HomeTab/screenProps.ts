import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { HomeTabParamList } from './types'

export type HomeStackTabScreenProps = BottomTabScreenProps<HomeTabParamList, 'HomeStack'>
export type PostTabScreenProps = BottomTabScreenProps<HomeTabParamList, 'Post'>
export type ChatStackTabScreenProps = BottomTabScreenProps<HomeTabParamList, 'ChatStack'>
export type ProfileStackTabScreenProps = BottomTabScreenProps<HomeTabParamList, 'ProfileStack'>
