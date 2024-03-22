import AsyncStorage from '@react-native-async-storage/async-storage'

import { LOCAL_USER_REPOSITORY_KEY } from '@data/localStorageConfig'

import { UserCollection } from '@services/firebase/types'

async function getLocalUserData() { // REFACTOR Isso deveria ter um id?
	try {
		const storagedDataJSON = await AsyncStorage.getItem(LOCAL_USER_REPOSITORY_KEY)
		const storagedData = storagedDataJSON ? JSON.parse(storagedDataJSON) : null
		return storagedData as UserCollection
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getLocalUserData }
