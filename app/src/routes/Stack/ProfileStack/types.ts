import { PostCollection } from '../../../services/firebase/types'

export type ProfileStackParamList = {
	Profile: { userId?: string }
	ViewServicePost: { postData: PostCollection }
	ViewSalePost: { postData: PostCollection }
	ViewVacancyPost: { postData: PostCollection }
	ViewSocialImpactPost: { postData: PostCollection }
	ViewCulturePost: { postData: PostCollection }
}
