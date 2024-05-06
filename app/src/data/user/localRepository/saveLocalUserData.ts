import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserEntityOptional } from '@domain/user/entity/types'

import { LOCAL_USER_REPOSITORY_KEY } from '@data/localStorageKeys'

async function saveLocalUserData(data: UserEntityOptional) {
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
