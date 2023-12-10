import { off, ref } from 'firebase/database'

import { realTimeDatabase } from '@services/firebase'

async function unsubscribeMessageListener(chatId: string) {
	if (!chatId) return false
	try {
		const listenerRef = ref(realTimeDatabase, `${chatId}/messages`)
		off(listenerRef)
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { unsubscribeMessageListener }
