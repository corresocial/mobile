import { Chat } from '@domain/chat/entity/types'
import { Id, PostCollection } from '@domain/post/entity/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ChatMessages: { chat: Chat }

	ProfileChat: { userId: Id, stackLabel?: string }
	ViewIncomePostChat: { postData: PostCollection }
	ViewVacancyPostChat: { postData: PostCollection }
	ViewSocialImpactPostChat: { postData: PostCollection }
	ViewCulturePostChat: { postData: PostCollection }
}
