import {
	DaysOfWeek,
	PostRange,
	DeliveryMethod,
	EventRepeatType,
	ExhibitionPlaceType,
	LocationViewType,
	PaymentType,
	PlaceModalityType,
	PostCollectionRemote,
	UserCollection,
	VacancyType,
	WeekdaysFrequency,
	WorkplaceType,
	ItemStatus
} from '../services/firebase/types'
import { CurrentCategory, SearchParams } from '../services/maps/types'

export type UserIdentification = {
	uid: string
	authTime: string
	accessToken: string
	tokenExpirationTime: string
	refreshToken: string
}

export type RegisterUserData = {
	cellNumber: string
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
}

export type LocationData = {
	searchParams?: SearchParams
	currentCategory?: CurrentCategory
	nearbyPosts?: PostCollectionRemote[]
	lastRefreshInMilliseconds?: number
}

export type ServiceData = {
	description?: string
	title?: string
	category?: string
	tags?: string[]
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	range?: PostRange
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour?: Date
	closingHour?: Date
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
	itemDescription?: string
	tags?: string[]
	category?: string
	itemStatus?: ItemStatus
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	range?: PostRange
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour?: Date
	closingHour?: Date
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
	title?: string
	description?: string
	vacancyType?: VacancyType
	locationView?: LocationViewType
	workplace?: WorkplaceType
	paymentType?: PaymentType
	range?: ExhibitionPlaceType
	companyDescription?: string
	questions?: string[]
	workFrequency?: WeekdaysFrequency
	workWeekdays?: DaysOfWeek[]
	startWorkDate?: Date
	endWorkDate?: Date
	startWorkHour?: Date
	endWorkHour?: Date
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
	title?: string
	description?: string
	locationView?: LocationViewType
	range?: ExhibitionPlaceType
	eventPlaceModality?: PlaceModalityType
	eventRepeat?: EventRepeatType
	entryValue?: string
	exhibitionFrequency?: WeekdaysFrequency
	exhibitionWeekDays?: DaysOfWeek[]
	eventStartDate?: Date
	eventEndDate?: Date
	eventStartHour?: Date
	eventEndHour?: Date
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
	title?: string
	description?: string
	tags?: string[]
	category?: string
	locationView?: LocationViewType
	range?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	exhibitionWeekDays?: DaysOfWeek[]
	socialImpactRepeat?: EventRepeatType
	openingHour?: Date
	closingHour?: Date
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
