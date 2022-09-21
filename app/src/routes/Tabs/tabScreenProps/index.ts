// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // TODO change to bottomTab

import { HomeTabParamList } from "../HomeTab/types";

export type HomeTabScreenProps = NativeStackScreenProps<HomeTabParamList, 'Home'>
export type ProfileTabScreenProps = NativeStackScreenProps<HomeTabParamList, 'Profile'>



