import { set } from '@react-native-firebase/database'

import { firebaseSmasDatabase } from '@infrastructure/firebase/index'

async function updateSmasTokenNotification(nis: string, userId: string) {
	try {
		const dbRef = firebaseSmasDatabase.ref(`${nis}`)
		await set(dbRef, userId)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateSmasTokenNotification }
