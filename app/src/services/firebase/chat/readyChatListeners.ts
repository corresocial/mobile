import { where } from 'firebase/firestore'
import { equalTo, get, off, onChildChanged, onValue, orderByChild, query, ref } from 'firebase/database'
import { Id } from '../types'
import { realTimeDatabase } from '..'

async function readyChatListeners(allChats: Id[]) {
	return Promise.all(
		allChats.map((chatId: string) => {
			const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
			return onValue(realTimeDatabaseRef, (snapshot) => {
				const data = snapshot.val()
				return data
			})
		})
	)
}

export { readyChatListeners }
