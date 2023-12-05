import { doc, setDoc } from 'firebase/firestore'

import { firestore } from '..'

import { UserCollection } from '../types'

async function updateUser(docId: string, data: UserCollection) {
	try {
		const documentReference = doc(firestore, 'users', docId)
		const finished = await setDoc(
			documentReference,
			{
				...data, updatedAt: new Date()
			},
			{
				merge: true
			},
		)
			.then(() => true)
			.catch((err) => {
				console.log(err)
				return err
			})

		return finished
	} catch (error) {
		console.log(error)
	}
}

export { updateUser }
