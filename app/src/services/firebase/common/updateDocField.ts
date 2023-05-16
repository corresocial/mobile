import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { firestore } from '../index'

async function updateDocField(
	collection: string,
	docId: string,
	field: string,
	value: any,
	union?: boolean,
) {
	const ref = doc(firestore, collection, docId)
	if (union) {
		const finished = await setDoc(
			ref,
			{
				[field]: arrayUnion(value),
				updatedAt: new Date(),
			},
			{ merge: true },
		)

		return finished
	}
	const finished = await setDoc(
		ref,
		{ [field]: value },
		{ merge: true }
	)
	return finished
}

export { updateDocField }
