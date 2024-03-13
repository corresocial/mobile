import { ref, set } from 'firebase/database'

import { smasRealTimeDatabase } from '@services/firebase'

async function updateSmasTokenNotification(nis: string, userId: string) {
	const dbRef = ref(smasRealTimeDatabase, `${nis}`)
	set(dbRef, userId)
}

export { updateSmasTokenNotification }
