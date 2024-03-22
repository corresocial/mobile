import AsyncStorage from '@react-native-async-storage/async-storage'

import { LOCAL_USER_REPOSITORY_KEY } from '@data/localStorageKeys'

import { UserCollection } from '@services/firebase/types'

async function saveLocalUserData(data: UserCollection) {
	// REFACTOR verificar se é objeto válido
	try {
		await AsyncStorage.setItem(LOCAL_USER_REPOSITORY_KEY, JSON.stringify(data))
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { saveLocalUserData }
