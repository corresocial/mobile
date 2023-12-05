import { HomeTabParamList } from '../../Tabs/HomeTab/types'
import { StackLabelProps } from '../../types'
import { PostCollection } from '@services/firebase/types'

export type ProfileStackParamList = {
	Profile: { userId: string, stackLabel: StackLabelProps } | undefined
	ViewIncomePost: { postData: PostCollection }
	ViewVacancyPost: { postData: PostCollection }
	ViewSocialImpactPost: { postData: PostCollection }
	ViewCulturePost: { postData: PostCollection }
} & HomeTabParamList
