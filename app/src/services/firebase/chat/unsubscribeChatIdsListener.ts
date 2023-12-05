import { off, ref } from 'firebase/database'

import { realTimeDatabase } from '@services/firebase'

async function unsubscribeChatIdsListener(chatIds: string[]) {
	if (!chatIds || !chatIds.length) return false
	try {
		chatIds.forEach((chatId) => {
			const listenerRef = ref(realTimeDatabase, `${chatId}`)
			off(listenerRef)
		})
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { unsubscribeChatIdsListener }
