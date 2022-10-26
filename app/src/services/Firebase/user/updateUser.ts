import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';
import { UserCollection } from '../types';

async function updateUser(docId: string, data: UserCollection) {
	try {
		const documentReference = doc(firestore, 'users', docId);
		const finished = await setDoc(
			documentReference,
			{ ...data, updated_at: new Date() },
			{ merge: true },
		)
			.then(() => true)
			.catch(err => {
				console.log(err)
				return err
			}) // TODO Error Handling

		return finished;

	} catch (error) {
		console.log(error)
	}
}

export default updateUser
