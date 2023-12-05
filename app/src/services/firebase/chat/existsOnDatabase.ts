import { get, ref } from 'firebase/database'

import { Id } from '../types'

import { realTimeDatabase } from '@services/firebase'

function existsOnDatabase(id?: Id) {
	if (!id) return false

	const realTimeDatabaseRef = ref(realTimeDatabase, `${id}`)
	return get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.exists())
		.catch((err) => console.log(err))
}

export { existsOnDatabase }
