import { ref, set } from 'firebase/database'

import { smasRealTimeDatabase } from '@services/firebase'

async function updateSmasTokenNotification(nis: string, tokenNotification: string) {
	const dbRef = ref(smasRealTimeDatabase, `${nis}`)

	console.log(nis)
	set(dbRef, tokenNotification)
}

export { updateSmasTokenNotification }
