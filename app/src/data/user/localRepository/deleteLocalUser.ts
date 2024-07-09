import AsyncStorage from '@react-native-async-storage/async-storage'

import { LOCAL_USER_REPOSITORY_KEY } from '@data/shared/storageKeys/localStorageKeys'

async function clearLocalUserData() {
	try {
		await AsyncStorage.removeItem(LOCAL_USER_REPOSITORY_KEY)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { clearLocalUserData }
