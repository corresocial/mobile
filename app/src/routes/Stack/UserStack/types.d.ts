import { ContactUsType } from "../../../services/discord/types"
import { PostCollection, ServiceCollectionRemote, SocialMedia } from "../../../services/firebase/types"
import { ReportedTarget } from './../../../services/types'


export type UserStackParamList = {
	WelcomeNewUser: undefined
	HomeTab: { tourCompleted?: boolean, showShareModal?: boolean }
	SelectPostType: undefined
	ServiceStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SaleStack: undefined
	VacancyStack: undefined
	CultureStack: undefined
	SocialImpactStack: undefined
	EditProfile: { user: LocalUserData }
	EditUserName: { userName: string, userId: string }
	EditUserDescription: { userDescription: string, userId: string }
	EditUserPicture: { profilePictureUrl: string, userId: string }
	EditServicePost: { postData: ServiceCollectionRemote }
	SocialMediaManagement: { socialMedias: SocialMedia[], isAuthor?: boolean }
	InsertLinkTitle: { socialMedia?: SocialMedia, index?: number }
	InsertLinkValue: { linkTitle: string, socialMedia: SocialMedia, index?: number }
	Configurations: undefined
	WhoWeAre: undefined
	WhoWeAreIncome: undefined
	WhoWeAreCulture: undefined
	WhoWeAreTransformation: undefined
	HelpUs: undefined
	ContactUs: undefined
	ContactUsInsertMessage: { title: string, contactUsType: ContactUsType, reportedType?: ReportedTarget, reportedId?: string }
	ContactUsSuccess: undefined
	PrivacyAndSecurity: undefined
}
