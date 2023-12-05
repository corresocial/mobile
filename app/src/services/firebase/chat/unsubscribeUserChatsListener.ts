import { off, ref } from 'firebase/database'

import { Id } from '../types'

import { realTimeDatabase } from '@services/firebase'

async function unsubscribeUserChatsListener(userId?: Id) {
	if (!userId) return false
	try {
		const listenerRef = ref(realTimeDatabase, `${userId}`)
		off(listenerRef)
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { unsubscribeUserChatsListener }
