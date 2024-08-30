import { CultureEntity, IncomeEntity, LatLong, PostEntity, SocialImpactEntity } from '@domain/post/entity/types'
import { SocialMedia, UserEntity, VerifiedLabelName } from '@domain/user/entity/types'

import { StackLabelProps } from '../../types'
import { UserStackParamList } from '../UserStack/types'
import { DiscordContactUsType } from '@services/discord/types/contactUs'
import { ReportedTarget } from '@services/notion/types/contactUs'

export type ProfileStackParamList = {
	Profile: { userId: string, stackLabel: StackLabelProps } | undefined
	PostViewProfile: { postData: PostEntity, redirectedPostId: string }
	SearchProfile: { verifiedLabel: VerifiedLabelName, profileId: string } | undefined

	IncomePostReview: { postData: IncomeEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	SocialImpactPostReview: { postData: SocialImpactEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	CulturePostReview: { postData: CultureEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }

	EditProfile: { user: UserEntity }
	EditUserName: { userName: string, userId: string }
	EditUserDescription: { userDescription: string, userId: string }
	EditUserLocation: { initialCoordinates: LatLong } | undefined
	EditUserPicture: { profilePictureUrl: string, userId: string }
	SocialMediaManagement: { socialMedias?: SocialMedia[], isAuthor?: boolean }
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

	PostView: any
} & UserStackParamList
