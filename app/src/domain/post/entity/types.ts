import React from 'react'
import { SvgProps } from 'react-native-svg'

import { cultureCategories } from '@utils/postsCategories/cultureCategories'
import { saleCategories } from '@utils/postsCategories/saleCategories'
import { serviceCategories } from '@utils/postsCategories/serviceCategories'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'
import { vacancyCategories } from '@utils/postsCategories/vacancyCategories'

export type SaleCategories = keyof typeof saleCategories
export type ServiceCategories = keyof typeof serviceCategories
export type VacancyCategories = keyof typeof vacancyCategories
export type CultureCategories = keyof typeof cultureCategories
export type SocialImpactCategories = keyof typeof socialImpactCategories

export type PostCategoriesType = SaleCategories | ServiceCategories | VacancyCategories | CultureCategories | SocialImpactCategories

export type PostCategoriesObject = typeof saleCategories | typeof serviceCategories | typeof vacancyCategories | typeof cultureCategories | typeof socialImpactCategories

export type MacroCategory = {
	label: string
	value: string
	SvgIcon: React.FC<SvgProps>
	tags: string[]
}

export type Id = string

export type ServiceCategory = typeof serviceCategories

export type LocationViewType = 'private' | 'approximate' | 'public'

export type ItemStatus = 'new' | 'used'

export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type PostRange = 'near' | 'city' | 'country'

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

export type CompleteAddress = {
	country: string
	state: string
	city: string
	postalCode: string
	district: string
	street: string
	number: string
	coordinates: {
		latitude: number
		longitude: number
	}
}

export type FeedPosts = {
	nearby: PostEntity[],
	city: PostEntity[],
	country: PostEntity[],
}

export type PostType = 'income' | 'socialImpact' | 'culture'

export type PostEntityKeys = keyof IncomeEntityOptional | keyof VacancyEntityOptional | keyof CultureEntityOptional | keyof SocialImpactEntityOptional
export type PostEntity = IncomeEntity | VacancyEntity | CultureEntity | SocialImpactEntity
export type PostEntityOptional = IncomeEntityOptional | VacancyEntityOptional | CultureEntityOptional | SocialImpactEntityOptional

export type IncomeEntityOptional = Partial<IncomeEntity>
export interface IncomeEntity extends PostEntityCommonFields {
	macroCategory?: IncomeType
	saleValue?: string
	exchangeValue?: string
	itemStatus: ItemStatus
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	unapprovedData?: IncomeEntityOptional & { reject?: boolean }
}

export type VacancyEntityOptional = Partial<VacancyEntity>
export interface VacancyEntity extends PostEntityCommonFields {
	macroCategory?: IncomeType
	vacancyType?: VacancyType
	workplace?: WorkplaceType
	importantPoints?: string[]
	workFrequency?: WeekdaysFrequency
	startDate?: Date
	endDate?: Date
	saleValue?: string
	exchangeValue?: string
	unapprovedData?: VacancyEntityOptional & { reject?: boolean }
}

export type CultureEntityOptional = Partial<CultureEntity>
export interface CultureEntity extends PostEntityCommonFields {
	macroCategory: CultureType
	eventPlaceModality?: PlaceModalityType
	repeat?: EventRepeatType
	entryValue?: string
	exhibitionFrequency?: WeekdaysFrequency
	startDate?: Date
	endDate?: Date
	unapprovedData?: CultureEntityOptional & { reject?: boolean }
}

export type SocialImpactEntityOptional = Partial<SocialImpactEntity>
export interface SocialImpactEntity extends PostEntityCommonFields {
	macroCategory?: SocialImpactType
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	repeat?: EventRepeatType
	startDate?: Date
	endDate?: Date
	unapprovedData?: SocialImpactEntityOptional & { reject?: boolean }
}

export interface PostEntityCommonFields {
	postId: string
	postType: PostType
	category: string
	tags: string[]
	description: string
	lookingFor: boolean
	completed?: boolean
	locationView: LocationViewType
	range: PostRange
	daysOfWeek?: DaysOfWeek[]
	startHour?: Date
	endHour?: Date
	picturesUrl?: string[]
	videosUrl?: string[]
	links?: string[]
	createdAt: Date
	updatedAt: Date
	location: {
		name?: string
		country: string
		state: string
		city: string
		postalCode: string
		district: string
		street: string
		number: string
		coordinates: {
			latitude: number
			longitude: number
		}
		geohashNearby: string[]
	}
	owner: {
		userId: string
		name: string
		profilePictureUrl?: string[]
	}
}

// [DEPRECATED] ---------------------

/* export interface IncomeCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory: IncomeType
	saleValue?: string
	exchangeValue?: string
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	itemStatus: ItemStatus
} */

/* export interface VacancyCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory: IncomeType
	vacancyType: VacancyType
	workplace: WorkplaceType
	workFrequency?: WeekdaysFrequency
	importantPoints?: string[]
	startDate?: Date
	endDate?: Date
	saleValue?: string
	exchangeValue?: string
} */

/* export interface CultureCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory: CultureType
	eventPlaceModality?: PlaceModalityType
	repeat?: EventRepeatType
	entryValue?: string
	exhibitionFrequency?: WeekdaysFrequency
	startDate?: Date
	endDate?: Date
} */

/* export interface SocialImpactCollectionRemote extends PostCollectionCommonFieldsRemote {
	macroCategory?: SocialImpactType
	exhibitionPlace?: ExhibitionPlaceType
	exhibitionFrequency?: WeekdaysFrequency
	repeat?: EventRepeatType
	startDate?: Date
	endDate?: Date
} */

/* export interface PostCollectionCommonFieldsRemote {
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
		geohashNearby: string[]
		geohashCity: string[]
	}
	owner: {
		userId: string
		name: string
		profilePictureUrl?: string[]
	}
} */
