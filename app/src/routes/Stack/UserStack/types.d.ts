import { PostCollection } from "../../../services/firebase/types"

export type UserStackParamList = {
	WelcomeNewUser: undefined
	HomeTab: { tourCompleted?: boolean, showShareModal?: boolean }
	SelectPostType: undefined
	ServiceStack: undefined
	SaleStack: undefined
	VacancyStack: undefined
	CultureStack: undefined
	SocialImpactStack: undefined
	ViewServicePost: { postData: PostCollection }
	ViewSalePost: { postData: PostCollection }
	ViewVacancyPost: { postData: PostCollection }
	ViewSocialImpactPost: { postData: PostCollection }
}
