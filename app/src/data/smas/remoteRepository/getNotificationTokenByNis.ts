import { get } from '@react-native-firebase/database'

import { firebaseSmasDatabase } from '@infrastructure/firebase/index'

async function getNotificationTokenByNis(nis: string) {
	try {
		const realTimeDatabaseRef = firebaseSmasDatabase.ref(`${nis}`)
		const snapshot = await get(realTimeDatabaseRef)
		const token: string = snapshot.val() || ''
		return token
	} catch (error) {
		console.log(error)
		return false
	}
}

export { getNotificationTokenByNis }
