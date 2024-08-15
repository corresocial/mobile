import { StackNavigationProp } from '@react-navigation/stack'

import { PostRange } from '@domain/post/entity/types'

import { DiscordContactUsType } from '@services/discord/types/contactUs'
import { ReportedTarget } from '@services/notion/types/contactUs'

export type UserStackNavigationProps = StackNavigationProp<UserStackParamList>

export type UserStackParamList = {
	WelcomeNewUser: undefined
	HomeTab: { tourCompleted?: boolean, showShareModal?: boolean, showsInFirstTab?: boolean } | undefined

	// REFACTOR Limbo
	OfflinePostsManagement: undefined

	// Cadastro de posts
	SelectPostType: undefined
	IncomeStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	CultureStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SocialImpactStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	PollStack: undefined
	PetitionStack: undefined

	ContactUsUserStack: undefined
	ContactUsInsertMessageUserStack: { title: string, contactUsType: DiscordContactUsType, reportedType?: ReportedTarget, reportedId?: string }
	ContactUsSuccessUserStack: { reportType: ReportedTarget } | undefined

	// Assinatura
	SelectSubscriptionRange: { postReview: boolean } | undefined
	EditCurrentSubscription: { postReview?: boolean, postRange: PostRange, leaveFromPaidSubscription?: PostRange | '' }
	SelectSubscriptionPlan: { postReview?: boolean, postRange: PostRange }
	SelectSubsciptionPaymentMethod: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByPix: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByCard: { postReview?: boolean, editPaymentMethod?: boolean } | undefined
	SubscriptionPaymentResult: { postReview?: boolean, editPaymentMethod?: boolean, successfulPayment: boolean }
}
