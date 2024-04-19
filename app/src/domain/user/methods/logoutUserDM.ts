import { ChatDomainInterface } from '@domain/chat/ChatDomainInterface'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { auth } from '@infrastructure/firebase' // Refactor

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

		await localStorage.clearLocalUserData()
		await localPostsStorage.clearOfflinePosts()
		await updateUserTokenNotification(userId, '')
		removeChatListeners()
		await auth.signOut()
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { logoutUserDM }
