import { ref, set } from '@react-native-firebase/database'

import { UserDatabase } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function registerNewUser(userId: Id, initialUserData: Partial<UserDatabase>) {
	if (!userId) return false

	const realTimeDatabaseRef = ref(firebaseDatabase, `${userId}`)
	await set(realTimeDatabaseRef, initialUserData) // Adicione await para garantir que a operação seja concluída
	return true
}

export { registerNewUser }
