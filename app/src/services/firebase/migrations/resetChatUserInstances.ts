import { collection, query, getDocs } from 'firebase/firestore'

import { firestore } from '@services/firebase'

import { registerNewUser } from '../chat/registerNewUser'

const resetChatUserInstances = async () => { // Set Collection Name
	const docs: any = []

	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach((doc) => {
		// if (doc.id === 'RMCJAuUhLjSmAu3kgjTzRjjZ2jB2') { // MOCK USER
		docs.push({ userId: doc.id, ...doc.data() })
		// }
	})

	docs.map(async (doc: any) => {
		console.log(`\n\nanalisando... ${doc.userId} ------------------------------------------------------------------`)
		registerNewUser(doc.userId, {
			blockedUsers: [''],
			chatIds: ['']
		})
	})
}

export { resetChatUserInstances }
