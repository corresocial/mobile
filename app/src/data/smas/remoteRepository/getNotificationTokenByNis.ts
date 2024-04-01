import { get, ref } from 'firebase/database'

import { smasRealTimeDatabase } from '@infrastructure/firebase/index'

async function getNotificationTokenByNis(nis: string) {
	try {
		const realTimeDatabaseRef = ref(smasRealTimeDatabase, `${nis}`)

		const token: string = await get(realTimeDatabaseRef)
			.then((snapshot) => snapshot.val())
			.catch(() => '')

		return token
	} catch (error) {
		console.log(error)
		return false
	}
}

export { getNotificationTokenByNis }
