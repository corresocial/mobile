import {
	DaysOfWeek,
	PostRange,
	DeliveryMethod,
	EventRepeatType,
	ExhibitionPlaceType,
	LocationViewType,
	PaymentType,
	PlaceModalityType,
	UserCollection,
	VacancyType,
	WeekdaysFrequency,
	WorkplaceType,
	ItemStatus,
	VacancyPurpose,
	SocialImpactType,
	CultureType,
	PostCollection,
	UserSubscription,
	FeedPosts,
	IncomeType
} from '../services/firebase/types'
import { CurrentCategory, SearchParams } from '../services/maps/types'

export interface SubscriptionData extends UserSubscription {
	currentPost?: PostCollection
}

export type UserIdentification = {
	uid: string
	authTime?: string
	accessToken?: string
	tokenExpirationTime?: string
	refreshToken?: string
}

export type RegisterUserData = {
	cellNumber: string
	email?: string
	userName: string
	profilePictureUri?: string
	userIdentification: UserIdentification
}

export interface LocalUserData extends UserCollection {
	userId?: string,
	userIdentification?: UserIdentification
}

export interface StateData {
	showTourModal?: boolean
	showShareModal?: boolean
	lastPostTitle?: string
	lastPostId?: string
}

export type LocationData = {
	searchParams?: SearchParams
	currentCategory?: CurrentCategory
	feedPosts?: FeedPosts
	lastRefreshInMilliseconds?: number
}

export type ServiceData = {
	isAdvertising?: boolean
	description?: string
	title?: string
	category?: string
	tags?: string[]
	incomeType?: IncomeType
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	range?: PostRange
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates?: {
			latitude?: number
			longitude?: number
		}
		geohash?: string
		geohashNear?: string[]
		geohashCity?: string[]
	}
}

export type SaleData = {
	title?: string
	description?: string
	tags?: string[]
	category?: string
	incomeType? IncomeTi
	isAdvertising?: boolean
	itemStatus?: ItemStatus
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	range?: PostRange
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates?: {
			latitude?: number
			longitude?: number
		}
		geohash?: string
		geohashNear?: string[]
		geohashCity?: string[]
	}
}

export type VacancyData = {
	isAdvertising?: boolean
	title?: string
	description?: string
	vacancyType?: VacancyType
	locationView?: LocationViewType
	workplace?: WorkplaceType
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	range?: PostRange
	importantPoints?: string[]
	vacancyPurpose?: VacancyPurpose
	workFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startDate?: Date
	endDate?: Date
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	tags?: string[]
	category?: string
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates?: {
			latitude?: number
			longitude?: number
		}
		geohash?: string
		geohashNear?: string[]
		geohashCity?: string[]
	}
}

export type CultureData = {
	isAdvertising?: boolean
	cultureType?: CultureType
	title?: string
	description?: string
	locationView?: LocationViewType
	range?: PostRange
	eventPlaceModality?: PlaceModalityType
	repeat?: EventRepeatType
	entryValue?: string
	exhibitionFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startDate?: Date
	endDate?: Date
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	tags?: string[]
	category?: string
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates?: {
			latitude?: number
			longitude?: number
		}
		geohash?: string
		geohashNear?: string[]
		geohashCity?: string[]
	}
}

export type SocialImpactData = {
	isAdvertising?: boolean
	socialImpactType?: SocialImpactType
	title?: string
	description?: string
	tags?: string[]
	category?: string
	locationView?: LocationViewType
	range?: PostRange
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	repeat?: EventRepeatType
	startDate?: Date
	startHour?: Date
	endDate?: Date
	endHour?: Date
	picturesUrl?: string[]
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates?: {
			latitude?: number
			longitude?: number
		}
		geohash?: string
		geohashNear?: string[]
		geohashCity?: string[]
	}
}
