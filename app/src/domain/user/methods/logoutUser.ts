import { ChatDomainInterface } from '@domain/chat/ChatDomainInterface'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { auth } from '@infrastructure/firebase' // Refactor

async function logoutUser(
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

		await updateUserTokenNotification(userId, '')
		await localStorage.clearLocalUserData()
		await localPostsStorage.clearOfflinePosts()
		await auth.signOut()
		removeChatListeners()
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { logoutUser }
