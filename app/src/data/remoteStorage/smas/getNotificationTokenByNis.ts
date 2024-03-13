import { get, ref } from 'firebase/database'

import { smasRealTimeDatabase } from '@services/firebase'

async function getNotificationTokenByNis(nis: string) {
	const realTimeDatabaseRef = ref(smasRealTimeDatabase, `${nis}`)

	const token = await get(realTimeDatabaseRef)
		.then((snapshot) => snapshot.val())

	return token
}

export { getNotificationTokenByNis }
