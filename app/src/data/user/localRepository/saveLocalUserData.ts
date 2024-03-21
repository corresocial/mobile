import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserCollection } from '@services/firebase/types'

async function saveLocalUserData(data: UserCollection) {
	// REFACTOR verificar se é objeto válido
	try {
		await AsyncStorage.setItem('corre.user', JSON.stringify(data))
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { saveLocalUserData }
