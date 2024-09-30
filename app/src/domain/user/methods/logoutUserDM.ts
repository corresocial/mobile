import { ChatDomainInterface } from '@domain/chat/ChatDomainInterface'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { firebaseAuth } from '@infrastructure/firebase' // REFACTOR

async function logoutUserDM(
	useUserRepository: () => UserRepositoryInterface,
	usePostRepository: () => PostRepositoryInterface,
	useChatDomain: () => ChatDomainInterface,
	removeChatListeners: () => void,
	userId: string
) {
	try {
		const { localStorage } = useUserRepository()
		const { localStorage: localPostsStorage } = usePostRepository()
		const { updateUserTokenNotification } = useChatDomain()

		if (!firebaseAuth.currentUser?.uid) throw new Error('Usuário não encontrado ou não está logado!')

		console.log('LOGOUt user')
		await localStorage.clearLocalUserData()
		await localPostsStorage.clearOfflinePosts()
		await updateUserTokenNotification(userId, '')
		removeChatListeners()

		await firebaseAuth.signOut()
	} catch (error: any) {
		console.log(error)
		// throw new Error(error)
	}
}

export { logoutUserDM }
