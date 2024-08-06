import { Chat } from '@domain/chat/entity/types'
import { Id, PostEntity } from '@domain/post/entity/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ChatMessages: { chat: Chat, via?: 'profile' | 'post', postType?: 'income' | 'socialImpact' | 'culture' }

	ProfileChat: { userId: Id, stackLabel?: string }
	PostViewChat: { postData: PostEntity }
}
