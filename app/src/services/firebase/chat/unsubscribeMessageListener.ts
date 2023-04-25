import { off, ref } from 'firebase/database'
import { realTimeDatabase } from '..'

async function unsubscribeMessageListener(path: string) {
	if (!path) return false
	try {
		const listenerRef = ref(realTimeDatabase, `${path}/messages`)
		off(listenerRef)
		console.log('off')
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { unsubscribeMessageListener }
