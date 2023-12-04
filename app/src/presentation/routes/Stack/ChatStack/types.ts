import { Chat } from '../../../../types/chat/types'
import { UserStackParamList } from '../UserStack/types'
import { Id, PostCollection } from '@services/firebase/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ProfileChat: { userId: Id, stackLabel?: string }
	ChatMessages: { chat: Chat }

	ViewIncomePostChat: { postData: PostCollection }
	ViewVacancyPostChat: { postData: PostCollection }
	ViewSocialImpactPostChat: { postData: PostCollection }
	ViewCulturePostChat: { postData: PostCollection }
} & UserStackParamList
