import { StackNavigationProp } from '@react-navigation/stack'
import { Chat } from '../../../@types/chat/types'
import { LocalUserData } from '../../../contexts/types'
import { ContactUsType } from '../../../services/discord/types'
import {
	CultureCollectionRemote,
	PostCollectionRemote,
	PostRange,
	PostType,
	SaleCollectionRemote,
	ServiceCollectionRemote,
	SocialImpactCollectionRemote,
	SocialMedia,
	VacancyCollectionRemote
} from '../../../services/firebase/types'
import { ReportedTarget } from '../../../services/types'

export type UserStackNavigationProps = StackNavigationProp<UserStackParamList>

export type UserStackParamList = {
	WelcomeNewUser: undefined
	ViewPostsByRange: { postsByRange: PostCollectionRemote[], postRange: PostRange | '', postType?: PostType, searchByRange?: boolean }
	HomeTab: { tourCompleted?: boolean, showShareModal?: boolean, showsInFirstTab?: boolean } | undefined
	SelectPostType: undefined
	ServiceStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SaleStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	VacancyStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	CultureStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SocialImpactStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	EditProfile: { user: LocalUserData }
	EditUserName: { userName: string, userId: string }
	EditUserDescription: { userDescription: string, userId: string }
	EditUserPicture: { profilePictureUrl: string, userId: string }
	EditServicePost: { postData: ServiceCollectionRemote }
	EditSalePost: { postData: SaleCollectionRemote }
	EditVacancyPost: { postData: VacancyCollectionRemote }
	EditSocialImpactPost: { postData: SocialImpactCollectionRemote }
	EditCulturePost: { postData: CultureCollectionRemote }

	SocialMediaManagement: { socialMedias: SocialMedia[], isAuthor?: boolean }
	InsertLinkTitle: { socialMedia?: SocialMedia, index?: number }
	InsertLinkValue: { socialMedia: SocialMedia, index?: number }
	Configurations: undefined
	WhoWeAre: undefined
	WhoWeAreIncome: undefined
	WhoWeAreCulture: undefined
	WhoWeAreTransformation: undefined
	HelpUs: undefined
	ContactUs: undefined
	ContactUsInsertMessage: { title: string, contactUsType: ContactUsType, reportedType?: ReportedTarget, reportedId?: string }
	ContactUsSuccess: { reportType: ReportedTarget } | undefined
	PrivacyAndSecurity: undefined
	UserDataConfigurations: undefined

	ChatMessages: { chat: Chat }

	SelectSubscriptionRange: { postReview: boolean } | undefined
	EditCurrentSubscription: { postReview?: boolean, postRange: PostRange, leaveFromPaidSubscription?: PostRange | '' }
	SelectSubscriptionPlan: { postReview?: boolean, postRange: PostRange }
	SelectSubsciptionPaymentMethod: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByPix: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByCard: { postReview?: boolean, editPaymentMethod?: boolean } | undefined
	SubscriptionPaymentResult: { postReview?: boolean, editPaymentMethod?: boolean, successfulPayment: boolean }
}
