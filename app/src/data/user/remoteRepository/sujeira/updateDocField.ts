import { arrayUnion, doc, setDoc } from 'firebase/firestore'

import { firestore } from '../../../../infrastructure/firebase/index'

async function updateDocField( // REFACTOR sujeira // updateUserData
	collection: string,
	docId: string,
	field: string,
	value: any,
	union?: boolean,
) {
	const docRef = doc(firestore, collection, docId)
	if (union) {
		const finished = await setDoc(
			docRef,
			{
				[field]: arrayUnion(value),
				updatedAt: new Date(),
			},
			{ merge: true },
		)

		return finished
	}
	const finished = await setDoc(
		docRef,
		{ [field]: value },
		{ merge: true }
	)
	return finished
}

export { updateDocField }
