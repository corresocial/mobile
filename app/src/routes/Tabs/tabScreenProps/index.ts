import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // TODO change to bottomTab

import { HomeTabParamList } from "../HomeTab/types";

export type HomeTabScreenProps = BottomTabNavigationProp<HomeTabParamList, 'Home'>
export type ProfileTabScreenProps = BottomTabNavigationProp<HomeTabParamList, 'Profile'>

