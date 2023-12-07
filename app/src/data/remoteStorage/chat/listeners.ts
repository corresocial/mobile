import { onValue, ref } from 'firebase/database'

import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

function startUserChatIdsListener(userId: Id, callback: (chatIds: Id[]) => void) {
	if (!userId) return

	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}/chatIds`,) // getDatabaseRef

	onValue(realTimeDatabaseRef, async (snapshot) => {
		const userChatIds: Id[] = snapshot.val()
		callback(userChatIds)
	})
}

export { startUserChatIdsListener }
