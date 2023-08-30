import React from 'react'
import { SvgProps } from 'react-native-svg'

import { serviceCategories } from '../../utils/postsCategories/serviceCategories'
import { cultureCategories } from '../../utils/postsCategories/cultureCategories'
import { saleCategories } from '../../utils/postsCategories/saleCategories'
import { vacancyCategories } from '../../utils/postsCategories/vacancyCategories'
import { socialImpactCategories } from '../../utils/postsCategories/socialImpactCategories'

export type SaleCategories = keyof typeof saleCategories
export type ServiceCategories = keyof typeof serviceCategories
export type VacancyCategories = keyof typeof vacancyCategories
export type CultureCategories = keyof typeof cultureCategories
export type SocialImpactCategories = keyof typeof socialImpactCategories

export type PostCategoriesType = SaleCategories & ServiceCategories & VacancyCategories & CultureCategories & SocialImpactCategories

export type PostCategoriesObject = typeof saleCategories | typeof serviceCategories | typeof vacancyCategories | typeof cultureCategories | typeof socialImpactCategories

export type Id = string

export type ServiceCategory = typeof serviceCategories

export type LocationViewType = 'private' | 'approximate' | 'public'

export type ItemStatus = 'new' | 'used'

export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type PostRange = 'near' | 'city' | 'country'

export type SubscriptionPlan = 'monthly' | 'yearly' | ''

export type SubscriptionPaymentMethod = 'pix' | 'creditCard' | 'debitCard' | ''

export type DeliveryMethod = 'unavailable' | 'near' | 'city' | 'country'

export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'

export type PaymentType = 'sale' | 'exchange' | 'both'

export type SaleValueType = 'fixed' | 'toMatch'

export type WorkplaceType = 'homeoffice' | 'presential' | 'hybrid'

export type VacancyType = 'professional' | 'temporary' | 'beak'

export type ExhibitionPlaceType = 'near' | 'city' | 'country'

export type PlaceModalityType = 'presential' | 'online' | 'both'

export type EventRepeatType = 'unrepeatable' | 'everyDay' | 'weekly' | 'biweekly' | 'monthly'

export type VacancyPurpose = 'findProffessional' | 'findVacancy'

export type SocialImpactType = 'informative' | 'iniciative' | 'donation'

export type CultureType = 'art' | 'event' | 'education'

export type MacroCategory = {
	label: string
	value: string
	SvgIcon: React.FC<SvgProps>
	tags: string[]
}

export type Coordinates = {
	latitude: number
	longitude: number
	latitudeDelta: number
	longitudeDelta: number
}

export type LatLong = {
	latitude: number
	longitude: number
}

export type Location = {
	street?: string | null
	streetNumber?: string | null
	number?: string | null
	district?: string | null
	postalCode?: string | null
	city?: string | null
	subregion?: string | null
	state?: string | null
	country?: string | null
	coordinates: Coordinates
}

export type SocialMedia = {
	title: string,
	link: string
}

export type VerifiedLabelName = 'leader' | 'impact' | 'default'

export type VerifiedType = {
	type: VerifiedLabelName
	by: string
	name: string
	at: Date
	admin?: boolean
}

export type UserSubscription = {
	subscriptionRange?: PostRange
	subscriptionPlan?: SubscriptionPlan
	subscriptionPaymentMethod?: SubscriptionPaymentMethod
	receiptEmail?: string
	customerId?: Id
	subscriptionId?: Id
}

export type UserCollection = {
	userId?: Id
	name?: string
	description?: string
	profilePictureUrl?: string[]
	tourPerformed?: boolean
	tags?: string[]
	category?: string
	createdAt?: Date
	updatedAt?: Date
	posts?: PostCollection[]
	verified?: VerifiedType
	socialMedias?: SocialMedia[]
	subscription?: UserSubscription
}

export type PrivateUserCollection = {
	cellNumber: string
}

export type PrivateAddress = {
	postType?: string
	locationView?: LocationViewType
	country?: string
	state?: string
	city?: string
	district?: string
	street?: string
	residenceNumber?: number
	postalCode?: string
	number?: number
	reference?: string
	coordinates?: { lat: number, lng: number }
	geohash?: string
	geohashNear?: string[]
	geohashes?: string[]
	geohashCity?: string[]
}

export type PostType = 'service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'

export type PostCollectionType = 'posts' | 'services' | 'sales' | 'vacancies' | 'cultures' | 'socialImpacts' // Post type title

export type PostCollection = ServiceCollection | SaleCollection | VacancyCollection | CultureCollection | SocialImpactCollection

export type PostCollectionRemote = ServiceCollectionRemote | SaleCollectionRemote | VacancyCollectionRemote | CultureCollectionRemote | SocialImpactCollectionRemote

export type FeedPosts = {
	nearby: PostCollectionRemote[],
	city: PostCollectionRemote[],
	country: PostCollectionRemote[],
}

export type ServiceCollection = {
	postId?: string
	postType: PostType
	title?: string
	tags?: string[]
	description?: string
	category?: string
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
	createdAt?: Date
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates: {
			latitude: number
			longitude: number
		}
		geohash: string
		geohashNear: string[]
		geohashCity: string[]
	}
	owner?: {
		userId?: string
		name?: string
		profilePictureUrl?: string[]
	}
}

export type ServiceCollectionRemote = {
	postId: string
	postType: PostType
	title: string
	description: string
	tags: string[]
	category: string
	paymentType: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView: LocationViewType
	range?: PostRange
	deliveryMethod?: DeliveryMethod
	attendanceFrequency: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startHour: Date
	endHour: Date
	picturesUrl: string[]
	createdAt: Date
	location: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates: {
			latitude: number
			longitude: number
		}
		geohash: string
		geohashNear: string[]
		geohashCity: string[]
	}
	owner: {
		userId: string
		name: string
		profilePictureUrl?: string[]
	}
}

export type SaleCollection = {
	postId?: string
	postType?: PostType
	title?: string
	description?: string
	tags?: string[]
	itemStatus?: ItemStatus
	category?: string
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
	createdAt?: Date
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates: {
			latitude: number
			longitude: number
		}
		geohash: string
		geohashNear: string[]
		geohashCity: string[]
	}
	owner?: {
		userId?: string
		name?: string
		profilePictureUrl?: string[]
	}
}

export type SaleCollectionRemote = {
	postId: string
	postType: PostType
	title: string
	description: string
	tags: string[]
	category: string
	itemStatus: ItemStatus
	paymentType: PaymentType
	saleValue: string
	exchangeValue?: string
	locationView: LocationViewType
	range?: PostRange
	deliveryMethod?: DeliveryMethod
	attendanceFrequency: WeekdaysFrequency
	daysOfWeek: DaysOfWeek[]
	startHour: Date
	endHour: Date
	picturesUrl: string[]
	createdAt: Date
	location?: {
		country?: string
		state?: string
		city?: string
		postalCode?: string
		district?: string
		street?: string
		number?: string
		reference?: string
		coordinates: {
			latitude: number
			longitude: number
		}
		geohash: string
		geohashNear: string[]
		geohashCity: string[]
	}
	owner: {
		userId: string
		name: string
		profilePictureUrl: string[]
	}
}

export type VacancyCollection = {
	postId?: string
	vacancyPurpose?: VacancyPurpose
	postType?: PostType
	title?: string
	description?: string
	vacancyType?: VacancyType
	workplace?: WorkplaceType
	range?: ExhibitionPlaceType
	importantPoints?: string[]
	workFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startDate?: Date
	endDate?: Date
	startHour?: Date
	endHour?: Date
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	picturesUrl: string[]
	tags?: string[]
	category?: string
	createdAt?: Date
	locationView?: LocationViewType
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
	owner?: {
		userId?: string
		name?: string
		profilePictureUrl?: string[]
	}
}

export type VacancyCollectionRemote = {
	postId: string
	vacancyPurpose: VacancyPurpose
	postType: PostType
	title: string
	description: string
	vacancyType: VacancyType
	workplace: WorkplaceType
	range?: ExhibitionPlaceType
	importantPoints: string[]
	workFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startDate: Date
	endDate: Date
	startHour: Date
	endHour: Date
	paymentType: PaymentType
	saleValue?: string
	exchangeValue?: string
	picturesUrl: string[]
	tags: string[]
	category: string
	createdAt: Date
	locationView?: LocationViewType
	location: {
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
	owner: {
		userId: string
		name: string
		profilePictureUrl?: string[]
	}
}

export type CultureCollection = {
	postId?: string
	cultureType?: CultureType
	postType?: PostType
	title?: string
	description?: string
	locationView?: LocationViewType
	range?: ExhibitionPlaceType
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
	createdAt?: Date
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
	owner?: {
		userId?: string
		name?: string
		profilePictureUrl?: string[]
	}
}

export type CultureCollectionRemote = {
	postId: string
	cultureType: CultureType
	postType: PostType
	title: string
	description: string
	locationView: LocationViewType
	range: ExhibitionPlaceType
	eventPlaceModality?: PlaceModalityType
	repeat: EventRepeatType
	entryValue: string
	exhibitionFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startDate: Date
	endDate: Date
	startHour: Date
	endHour: Date
	picturesUrl: string[]
	tags: string[]
	category: string
	createdAt: Date
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
	owner: {
		userId: string
		name: string
		profilePictureUrl?: string[]
	}
}

export type SocialImpactCollection = {
	postId?: string
	socialImpactType?: SocialImpactType
	postType?: PostType
	title?: string
	description?: string
	tags?: string[]
	category?: string
	locationView?: LocationViewType
	range?: PostRange
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	repeat?: EventRepeatType,
	startDate?: Date
	endDate?: Date
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	createdAt?: Date
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
	owner?: {
		userId?: string
		name?: string
		profilePictureUrl?: string[]
	}
}

export type SocialImpactCollectionRemote = {
	postId: string
	socialImpactType: SocialImpactType
	postType: PostType
	title: string
	description: string
	tags: string[]
	category: string
	locationView: LocationViewType
	range?: PostRange
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	daysOfWeek: DaysOfWeek[]
	repeat: EventRepeatType,
	startDate?: Date
	endDate?: Date
	startHour: Date
	endHour: Date
	picturesUrl: string[]
	createdAt: Date
	location: {
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
	owner: {
		userId: string
		name: string
		profilePictureUrl?: string[]
	}
}

export type AdsCollection = any
