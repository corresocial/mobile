import AsyncStorage from '@react-native-async-storage/async-storage'

import { LOCAL_SMAS_REPOSITORY_KEY } from '@data/localStorageConfig'

async function getNisValue() {
	try {
		const storedNis = await AsyncStorage.getItem(LOCAL_SMAS_REPOSITORY_KEY)

		if (storedNis) {
			const storedNisObject = JSON.parse(storedNis)
			return storedNisObject.nis
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

async function saveNisValue(nis: string) {
	try {
		const nisObject = { nis }
		await AsyncStorage.setItem(LOCAL_SMAS_REPOSITORY_KEY, JSON.stringify(nisObject))
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

async function clearNisValue() {
	try {
		await AsyncStorage.removeItem(LOCAL_SMAS_REPOSITORY_KEY)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { getNisValue, saveNisValue, clearNisValue }
