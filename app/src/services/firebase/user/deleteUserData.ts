import { deleteDoc, doc } from 'firebase/firestore'
import { firestore } from '..'

async function deleteUserData(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId)

		await deleteDoc(docRef)
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

export { deleteUserData }
