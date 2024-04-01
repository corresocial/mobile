import { HomeTabParamList } from '../../Tabs/HomeTab/types'
import { StackLabelProps } from '../../types'
import { CultureCollection, IncomeCollection, SocialImpactCollection, VacancyCollection } from '@services/firebase/types'

export type ProfileStackParamList = {
	Profile: { userId: string, stackLabel: StackLabelProps } | undefined
	ViewIncomePost: { postData: IncomeCollection, redirectedPostId: string }
	ViewVacancyPost: { postData: VacancyCollection, redirectedPostId: string }
	ViewSocialImpactPost: { postData: SocialImpactCollection, redirectedPostId: string }
	ViewCulturePost: { postData: CultureCollection, redirectedPostId: string }
} & HomeTabParamList
