import { Dimensions, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const statusBarHeight = StatusBar.currentHeight || 0

const relativeScreenWidth = (percentage: number) => {
	if (!percentage) return 0
	return (percentage / 100) * screenWidth
}

const relativeScreenHeight = (percentage: number) => {
	if (!percentage) return 0
	return (percentage / 100) * screenHeight
}

const relativeScreenDensity = (value: number) => {
	if (!value) return 50
	return RFValue(value)
}

export {
	screenWidth,
	screenHeight,
	statusBarHeight,
	relativeScreenWidth,
	relativeScreenHeight,
	relativeScreenDensity
}
