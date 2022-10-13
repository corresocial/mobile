import { Dimensions, StatusBar } from "react-native";

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height
export const statusBarHeight = StatusBar.currentHeight || 0