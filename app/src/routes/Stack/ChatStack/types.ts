import { Chat } from '../../../@types/chat/types'
import { Id, PostCollection } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ProfileChat: { userId: Id, stackLabel?: string }
	ChatMessages: { chat: Chat }

	ViewServicePostChat: { postData: PostCollection }
	ViewSalePostChat: { postData: PostCollection }
	ViewVacancyPostChat: { postData: PostCollection }
	ViewSocialImpactPostChat: { postData: PostCollection }
	ViewCulturePostChat: { postData: PostCollection }
} & UserStackParamList
