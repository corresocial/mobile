import { PostCollection, SocialMedia } from "../../../services/firebase/types"

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
	EditUserPicture: { profilePictureUrl: string, userId: string }
	SocialMediaManagement: { userId?: string, socialMedias: SocialMedia[], isAuthor?: boolean }
	InsertLinkTitle: { socialMedia?: SocialMedia, index?: number }
	InsertLinkValue: { linkTitle: string, socialMedia: SocialMedia, index?: number }
	Configurations: undefined
	WhoWeAre: undefined
	WhoWeAreIncome: undefined
	WhoWeAreCulture: undefined
	WhoWeAreTransformation: undefined
	HelpUs: undefined
	ContactUs: undefined
}
