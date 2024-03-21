import AsyncStorage from '@react-native-async-storage/async-storage'

async function clearLocalUserData() {
	try {
		await AsyncStorage.removeItem('corre.user')
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { clearLocalUserData }
