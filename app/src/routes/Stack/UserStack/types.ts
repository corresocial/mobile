import { StackNavigationProp } from '@react-navigation/stack'
import { Chat } from '../../../@types/chat/types'
import { LocalUserData } from '../../../contexts/types'
import { ContactUsType } from '../../../services/discord/types'
import {
	CultureCollectionRemote,
	PostCollectionRemote,
	PostRange,
	PostType,
	IncomeCollectionRemote,
	SocialImpactCollectionRemote,
	SocialMedia,
	VacancyCollectionRemote,
	PostCollection
} from '../../../services/firebase/types'
import { ReportedTarget } from '../../../services/types'

export type UserStackNavigationProps = StackNavigationProp<UserStackParamList>

export type UserStackParamList = {
	WelcomeNewUser: undefined
	ViewPostsByRange: { postsByRange: PostCollectionRemote[], postRange: PostRange | '', postType?: PostType, searchByRange?: boolean }
	HomeTab: { tourCompleted?: boolean, showShareModal?: boolean, showsInFirstTab?: boolean } | undefined
	SelectPostType: undefined
	SelectIncomeType: { editMode: boolean } | undefined
	ServiceStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SaleStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	VacancyStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	CultureStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SocialImpactStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	EditProfile: { user: LocalUserData }
	EditUserName: { userName: string, userId: string }
	EditUserDescription: { userDescription: string, userId: string }
	EditUserPicture: { profilePictureUrl: string, userId: string }
	EditServicePost: { postData: IncomeCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean }
	EditSalePost: { postData: IncomeCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean }
	EditVacancyPost: { postData: VacancyCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean }
	EditSocialImpactPost: { postData: SocialImpactCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean }
	EditCulturePost: { postData: CultureCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean }
	OfflinePostsManagement: undefined

	ViewCompletedPosts: undefined
	SocialMediaManagement: { socialMedias: SocialMedia[], isAuthor?: boolean }
	InsertLinkTitle: { socialMedia?: SocialMedia, index?: number }
	InsertLinkValue: { socialMedia: SocialMedia, index?: number }
	Configurations: undefined
	EntryMethodManagement: undefined
	InsertCellNumberLinkAccount: undefined
	InsertConfirmationCodeLinkAccount: { cellNumber: string, verificationCodeId: string }
	LinkingAccountResult: { accountIdentifier?: string | null, wasLinked: boolean }
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
	NotificationSettings: undefined

	ChatMessages: { chat: Chat }

	SelectSubscriptionRange: { postReview: boolean } | undefined
	EditCurrentSubscription: { postReview?: boolean, postRange: PostRange, leaveFromPaidSubscription?: PostRange | '' }
	SelectSubscriptionPlan: { postReview?: boolean, postRange: PostRange }
	SelectSubsciptionPaymentMethod: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByPix: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByCard: { postReview?: boolean, editPaymentMethod?: boolean } | undefined
	SubscriptionPaymentResult: { postReview?: boolean, editPaymentMethod?: boolean, successfulPayment: boolean }

	ViewIncomePostUser: { postData: PostCollection }
	ViewVacancyPostUser: { postData: PostCollection }
	ViewSocialImpactPostUser: { postData: PostCollection }
	ViewCulturePostUser: { postData: PostCollection }
}
