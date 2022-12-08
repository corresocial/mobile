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
	EditProfile: { user: LocalUserData }
	EditUserName: { userName: string, userId: string }
	EditUserDescription: { userDescription: string, userId: string }
}
