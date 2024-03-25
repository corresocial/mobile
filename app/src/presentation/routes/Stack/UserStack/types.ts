import { StackNavigationProp } from '@react-navigation/stack'

import { Chat } from '@domain/entities/chat/types'

import { LocalUserData } from '@contexts/AuthContext/types'

import { DiscordContactUsType } from '@services/discord/types/contactUs'
import {
	CultureCollectionRemote,
	PostCollectionRemote,
	PostRange,
	PostType,
	IncomeCollectionRemote,
	SocialImpactCollectionRemote,
	SocialMedia,
	VacancyCollectionRemote,
	PostCollection,
	LatLong
} from '@services/firebase/types'
import { ReportedTarget } from '@services/types'

export type UserStackNavigationProps = StackNavigationProp<UserStackParamList>

export type UserStackParamList = {
	WelcomeNewUser: undefined
	HomeTab: { tourCompleted?: boolean, showShareModal?: boolean, showsInFirstTab?: boolean } | undefined

	SelectPostType: undefined
	SelectIncomeType: { editMode: boolean } | undefined
	ServiceStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SaleStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	VacancyStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	CultureStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined
	SocialImpactStack: { screen: string, params: { editMode: boolean, initialValue: any } } | undefined

	OfflinePostsManagement: undefined

	SelectSubscriptionRange: { postReview: boolean } | undefined
	EditCurrentSubscription: { postReview?: boolean, postRange: PostRange, leaveFromPaidSubscription?: PostRange | '' }
	SelectSubscriptionPlan: { postReview?: boolean, postRange: PostRange }
	SelectSubsciptionPaymentMethod: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByPix: { postReview?: boolean } | undefined
	FinishSubscriptionPaymentByCard: { postReview?: boolean, editPaymentMethod?: boolean } | undefined
	SubscriptionPaymentResult: { postReview?: boolean, editPaymentMethod?: boolean, successfulPayment: boolean }

}
