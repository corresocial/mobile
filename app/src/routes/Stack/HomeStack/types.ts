import { PostCollection } from '../../../services/firebase/types'

export type HomeStackParamList = {
	Home: { userId?: string }
	ViewServicePostHome: { postData: PostCollection, isAuthor: boolean }
	ViewSalePostHome: { postData: PostCollection, isAuthor: boolean }
	ViewVacancyPostHome: { postData: PostCollection, isAuthor: boolean }
	ViewSocialImpactPostHome: { postData: PostCollection, isAuthor: boolean }
	ViewCulturePostHome: { postData: PostCollection, isAuthor: boolean }
	PostCategories: { title: string }
}
