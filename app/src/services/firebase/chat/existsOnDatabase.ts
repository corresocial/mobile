import { get, ref } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Id } from '../types'

function existsOnDatabase(id: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${id}`)
	return get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.exists())
		.catch((err) => console.log(err))
}

export { existsOnDatabase }
