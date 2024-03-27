import { PostCollection, PostRange } from '@domain/post/entity/types'

export type UserEntity = {
	userId: string
	name?: string
	description?: string
	profilePictureUrl?: string[]
	tourPerformed?: boolean
	createdAt?: Date
	updatedAt?: Date
	posts?: PostCollection[]
	verified?: VerifiedType
	socialMedias?: SocialMedia[]
	subscription?: UserSubscription
	private?: PrivateUserEntity
}

export type SocialMedia = {
	title: string,
	link: string
}

export type VerifiedLabelName = 'government' | 'leader' | 'impact' | 'default'

export type VerifiedType = {
	type: VerifiedLabelName
	by: string
	name: string
	at: Date
	admin?: boolean
}

export type SubscriptionPlan = 'monthly' | 'yearly' | ''
export type SubscriptionPaymentMethod = 'pix' | 'creditCard' | 'debitCard' | ''

export type UserSubscription = {
	subscriptionRange?: PostRange
	subscriptionPlan?: SubscriptionPlan
	subscriptionPaymentMethod?: SubscriptionPaymentMethod
	customerId?: string
	subscriptionId?: string
}

export type PrivateUserEntity = {
	contacts: {
		cellNumber?: string
		email?: string
	},
	location: {
		userId?: string,
		country?: string
		state?: string
		city?: string
		district?: string
		street?: string
		postalCode?: string
		geohashNearby?: string[],
		visibleToGovernment: boolean
	}
}
