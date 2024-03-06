import React from 'react'
import { SvgProps } from 'react-native-svg'

import { cultureCategories } from '../../presentation/utils/postsCategories/cultureCategories'
import { saleCategories } from '../../presentation/utils/postsCategories/saleCategories'
import { serviceCategories } from '../../presentation/utils/postsCategories/serviceCategories'
import { socialImpactCategories } from '../../presentation/utils/postsCategories/socialImpactCategories'
import { vacancyCategories } from '../../presentation/utils/postsCategories/vacancyCategories'

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

export type IncomeType = 'sale' | 'service' | 'vacancy'

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

export type VerifiedLabelName = 'government' | 'leader' | 'impact' | 'default'

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
	customerId?: Id
	subscriptionId?: Id
}

export type UserCollection = {
	userId?: Id
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
	newUser?: boolean // local only
}

export type PrivateUserCollection = {
	cellNumber?: string
	email?: string
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

export type PostType = 'service' | 'sale' | 'vacancy' | 'income' | 'socialImpact' | 'culture'

export type NewHomePostType = 'income' | 'socialImpact' | 'culture'

export type PostCollectionType = 'posts' | 'services' | 'sales' | 'vacancies' | 'cultures' | 'socialImpacts'

export type PostCollection = IncomeCollection | VacancyCollection | CultureCollection | SocialImpactCollection

export type PostCollectionRemote = IncomeCollectionRemote | VacancyCollectionRemote | CultureCollectionRemote | SocialImpactCollectionRemote

export type CompleteAddress = {
	country: string
	state: string
	city: string
	postalCode: string
	district: string
	street: string
	number: string
	coordinates: {
		latitude?: number
		longitude?: number
	}
}

export type FeedPosts = {
	nearby: PostCollectionRemote[],
	city: PostCollectionRemote[],
	country: PostCollectionRemote[],
}

export interface PostCollectionCommonFields {
	postId?: string
	postType?: PostType
	category?: string
	tags?: string[]
	description?: string
	lookingFor?: boolean
	completed?: boolean
	locationView?: LocationViewType
	range?: PostRange
	daysOfWeek?: DaysOfWeek[]
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	links?: string[]
	createdAt?: Date
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

export interface PostCollectionCommonFieldsRemote {
	postId: string
	postType: PostType
	category: string
	tags: string[]
	description: string
	lookingFor?: boolean
	completed?: boolean
	locationView: LocationViewType
	range: PostRange
	daysOfWeek?: DaysOfWeek[]
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	links?: string[]
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

export interface IncomeCollection extends PostCollectionCommonFields {
	macroCategory?: IncomeType
	saleValue?: string
	exchangeValue?: string
	itemStatus: ItemStatus
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
}

export interface IncomeCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory: IncomeType
	saleValue?: string
	exchangeValue?: string
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	itemStatus: ItemStatus
}

export interface VacancyCollection extends PostCollectionCommonFields {
	macroCategory?: IncomeType
	vacancyType?: VacancyType
	workplace?: WorkplaceType
	importantPoints?: string[]
	workFrequency?: WeekdaysFrequency
	startDate?: Date
	endDate?: Date
	saleValue?: string
	exchangeValue?: string
}

export interface VacancyCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory: IncomeType
	vacancyType: VacancyType
	workplace: WorkplaceType
	workFrequency?: WeekdaysFrequency
	importantPoints?: string[]
	startDate?: Date
	endDate?: Date
	saleValue?: string
	exchangeValue?: string
}

export interface CultureCollection extends PostCollectionCommonFields {
	macroCategory: CultureType
	eventPlaceModality?: PlaceModalityType
	repeat?: EventRepeatType
	entryValue?: string
	exhibitionFrequency?: WeekdaysFrequency
	startDate?: Date
	endDate?: Date
}

export interface CultureCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory: CultureType
	eventPlaceModality?: PlaceModalityType
	repeat?: EventRepeatType
	entryValue?: string
	exhibitionFrequency?: WeekdaysFrequency
	startDate?: Date
	endDate?: Date
}

export interface SocialImpactCollection extends PostCollectionCommonFields {
	macroCategory?: SocialImpactType
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	repeat?: EventRepeatType
	startDate?: Date
	endDate?: Date
}

export interface SocialImpactCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory?: SocialImpactType
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	repeat?: EventRepeatType
	startDate?: Date
	endDate?: Date
}
