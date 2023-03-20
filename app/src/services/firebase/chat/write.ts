import { getDatabase, ref, set } from 'firebase/database'
import { Id } from '../types'

function writeOnDatabase(userId: Id) {
	const db = getDatabase()
	set(ref(db, `chat/${userId}`), {
		username: 'zé',
	})
}

export { writeOnDatabase }
