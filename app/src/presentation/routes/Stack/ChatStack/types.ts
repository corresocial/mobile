import { Chat } from '@domain/chat/entity/types'
import { Id, PostEntityOptional } from '@domain/post/entity/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ChatMessages: { chat: Chat }

	ProfileChat: { userId: Id, stackLabel?: string }
	ViewIncomePostChat: { postData: PostEntityOptional }
	ViewVacancyPostChat: { postData: PostEntityOptional }
	ViewSocialImpactPostChat: { postData: PostEntityOptional }
	ViewCulturePostChat: { postData: PostEntityOptional }
}
