import { PostCollection } from '../../../services/firebase/types'

export type ProfileStackParamList = {
	Profile: { userId?: string }
	ViewServicePost: { postData: PostCollection, isAuthor: boolean }
	ViewSalePost: { postData: PostCollection, isAuthor: boolean }
	ViewVacancyPost: { postData: PostCollection, isAuthor: boolean }
	ViewSocialImpactPost: { postData: PostCollection, isAuthor: boolean }
	ViewCulturePost: { postData: PostCollection, isAuthor: boolean }
}
