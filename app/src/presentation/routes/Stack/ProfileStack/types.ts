import { UserData } from '@contexts/AuthContext/types'

import { StackLabelProps } from '../../types'
import { DiscordContactUsType } from '@services/discord/types/contactUs'
import { CultureCollectionRemote, IncomeCollectionRemote, PostCollection, SocialImpactCollectionRemote, SocialMedia, VacancyCollectionRemote } from '@services/firebase/types'
import { LatLong } from '@services/googleMaps/types/maps'
import { ReportedTarget } from '@services/types'

export type ProfileStackParamList = {
	Profile: { userId: string, stackLabel: StackLabelProps } | undefined
	ViewIncomePost: { postData: PostCollection }
	ViewVacancyPost: { postData: PostCollection }
	ViewSocialImpactPost: { postData: PostCollection }
	ViewCulturePost: { postData: PostCollection }

	EditServicePost: { postData: IncomeCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	EditSalePost: { postData: IncomeCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	EditVacancyPost: { postData: VacancyCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	EditSocialImpactPost: { postData: SocialImpactCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	EditCulturePost: { postData: CultureCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }

	EditProfile: { user: UserData }
	EditUserName: { userName: string, userId: string }
	EditUserDescription: { userDescription: string, userId: string }
	EditUserLocation: { initialCoordinates: LatLong | null }
	EditUserPicture: { profilePictureUrl: string, userId: string }
	SocialMediaManagement: { socialMedias: SocialMedia[], isAuthor?: boolean }
	InsertLinkTitle: { socialMedia?: SocialMedia, index?: number }
	InsertLinkValue: { socialMedia: SocialMedia, index?: number }

	Configurations: undefined
	ViewCompletedPosts: undefined
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
	ContactUsInsertMessage: { title: string, contactUsType: DiscordContactUsType, reportedType?: ReportedTarget, reportedId?: string }
	ContactUsSuccess: { reportType: ReportedTarget } | undefined
	PrivacyAndSecurity: undefined
	UserDataConfigurations: undefined
	NotificationSettings: undefined
	NotificationPublicServicesSettings: undefined
}
