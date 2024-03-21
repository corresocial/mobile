import { ref, set } from 'firebase/database'

import { smasRealTimeDatabase } from '@services/firebase'

async function updateSmasTokenNotification(nis: string, userId: string) {
	try {
		const dbRef = ref(smasRealTimeDatabase, `${nis}`)

		await set(dbRef, userId)

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateSmasTokenNotification }
