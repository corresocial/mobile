import { PostEntity, PostRange } from '@domain/post/entity/types'

export type UserAuthData = {
	cellNumber: string
	verificationCodeId?: string
}

export type UserRegisterData = {
	cellNumber: string
	verificationCodeId?: string
	email: string
	name?: string
	profilePictureUri?: string
	userId?: string
}

export type UserEntityOptional = Partial<UserEntity>
export type UserEntity = {
	userId: string
	name: string
	description?: string
	profilePictureUrl?: string[]
	createdAt?: Date
	updatedAt?: Date
	posts?: PostEntity[]
	verified?: VerifiedType
	socialMedias?: SocialMedia[]
	subscription?: UserSubscription
	unapprovedData?: UserEntityOptional & { reject?: boolean, owner?: UserOwner }
	private?: PrivateUserEntity
}

export type UserOwner = { // REFACTOR Adicionar tipagem às postagens
	userId: string
	name: string
	profilePictureUrl?: string[]
}

export type SocialMedia = {
	title: string,
	link: string
}

export type VerifiedLabelName = 'government' | 'leader' | 'impact' | 'default' | 'coordinator' | 'questionnaireAdministrator'

export type VerifiedType = {
	type: VerifiedLabelName
	by: string
	name: string
	at: Date
	admin?: boolean
	coordinatorId?: string
}

export type SubscriptionPlan = 'monthly' | 'yearly' | ''
export type SubscriptionPaymentMethod = 'pix' | 'creditCard' | 'debitCard' | ''

export type UserSubscriptionOptional = Partial<UserSubscription>
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

export type CompleteUser = UserEntity & PrivateUserEntity
