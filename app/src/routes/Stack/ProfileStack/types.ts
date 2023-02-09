import { PostCollection } from '../../../services/firebase/types'
import { HomeTabParamList } from '../../Tabs/HomeTab/types'

export type ProfileStackParamList = {
	Profile: { userId: string } | undefined
	ViewServicePost: { postData: PostCollection }
	ViewSalePost: { postData: PostCollection }
	ViewVacancyPost: { postData: PostCollection }
	ViewSocialImpactPost: { postData: PostCollection }
	ViewCulturePost: { postData: PostCollection }
} & HomeTabParamList
