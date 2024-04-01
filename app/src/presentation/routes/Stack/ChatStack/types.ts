import { Chat } from '@domain/chat/entity/types'
import { CultureEntity, Id, IncomeEntity, SocialImpactEntity, VacancyEntity } from '@domain/post/entity/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ChatMessages: { chat: Chat }

	ProfileChat: { userId: Id, stackLabel?: string }
	ViewIncomePostChat: { postData: IncomeEntity }
	ViewVacancyPostChat: { postData: VacancyEntity }
	ViewSocialImpactPostChat: { postData: SocialImpactEntity }
	ViewCulturePostChat: { postData: CultureEntity }
}
