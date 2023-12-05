import { off, ref } from 'firebase/database'

import { realTimeDatabase } from '@services/firebase'

async function unsubscribeMessageListener(path: string) {
	if (!path) return false
	try {
		const listenerRef = ref(realTimeDatabase, `${path}/messages`)
		off(listenerRef)
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { unsubscribeMessageListener }
