import { cultureCategories } from '../../screens/cultureScreens/cultureCategories'
import { saleCategories } from '../../screens/saleScreens/saleCategories'
import { serviceCategories } from '../../screens/serviceScreens/serviceCategories'
import { vacancyCategories } from '../../screens/vacancyScreens/vacancyCategories'
import { socialImpactCategories } from '../../screens/socialImpactScreens/socialImpactCategories'

export type SaleCategories = keyof typeof saleCategories
export type ServiceCategories = keyof typeof serviceCategories
export type VacancyCategories = keyof typeof vacancyCategories
export type CultureCategories = keyof typeof cultureCategories
export type SocialImpactCategories = keyof typeof socialImpactCategories

export type LocationViewType = 'private' | 'approximate' | 'public'

export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type DeliveryMethod = 'unavailable' | 'near' | 'city' | 'country'

export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'

export type PaymentType = 'exchange' | 'sale' | 'both'

export type WorkplaceType = 'homeoffice' | 'presential' | 'hybrid'

export type VacancyType = 'professional' | 'temporary' | 'beak'

export type CultureType = 'artistProfile' | 'eventPost'

export type ExhibitionPlaceType = 'near' | 'city' | 'country'

export type PlaceModalityType = 'presential' | 'online' | 'both'

export type EventRepeatType = 'unrepeatable' | 'everyDay' | 'weekly' | 'biweekly' | 'monthly'

export type MacroCategory = {
	label: string
	value: string
	tags: string[]
}

export type Coordinates = {
	latitude: number
	longitude: number
	latitudeDelta: number
	longitudeDelta: number
}

export type CompleteAddress = {
	street?: string | null
	streetNumber?: string | null
	number?: string | null
	district?: string | null
	postalCode?: string | null
	city?: string | null
	subregion?: string | null
	state?: string | null
	country?: string | null
	coordinates?: Coordinates
}

export type UserCollection = {
	name?: string
	description?: string
	profilePictureUrl?: string[]
	tourPerformed?: boolean
	tags?: string[]
	createdAt?: Date
	updatedAt?: Date
	posts?: PostCollection[]
	ads?: AdsCollection[]
	locationView?: LocationViewType
	cellNumber?: string // private
	address?: { // private
		country?: string
		state?: string
		city?: string
		district?: string
		street?: string
		residenceNumber?: number
		reference?: string
		coordinates?: { lat: number, lng: number }
		geohash?: string
		geohashNear?: string[]
		geohashCity?: string[]
	}
}

export type PrivateAddress = {
	country?: string
	state?: string
	city?: string
	district?: string
	street?: string
	residenceNumber?: number
	reference?: string
	coordinates?: { lat: number, lng: number }
	geohash?: string
	geohashNear?: string[]
	geohashCity?: string[]
}

export type PostType = 'service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'

export type PostCollectionType = 'services' | 'sales' | 'vacancies' | 'cultures' | 'socialImpacts' // Post type title

export type PostCollection = ServiceCollection | SaleCollection | VacancyCollection | CultureCollection | SocialImpactCollection

export type ServiceCollection = {
	postId?: string
	postType?: PostType
	title?: string
	tags?: string[]
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour?: Date
	closingHour?: Date
	picturesUrl?: string[]
	createdAt?: Date
	address?: {
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
	postId?: string
	postType: PostType
	title: string
	tags: string[]
	paymentType: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView: LocationViewType
	deliveryMethod: DeliveryMethod
	attendanceFrequency: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour: Date
	closingHour: Date
	picturesUrl?: string[]
	createdAt: Date
	address: {
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
	itemName?: string
	itemDescription?: string
	tags?: string[]
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	deliveryMethod?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour?: Date
	closingHour?: Date
	picturesUrl?: string[]
	createdAt?: Date
	address?: {
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

export type VacancyCollection = {
	postId?: string
	postType?: PostType
	title?: string
	description?: string
	vacancyType?: VacancyType
	workplace?: WorkplaceType
	companyDescription?: string
	questions?: string[]
	workWeekdays?: DaysOfWeek[]
	startWorkDate?: Date
	endWorkDate?: Date
	startWorkHour?: Date
	endWorkHour?: Date
	tags?: string[]
	createdAt?: Date
	address?: {
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

export type CultureCollection = {
	postId?: string
	postType?: PostType
	title?: string
	description?: string
	cultureType?: CultureType
	locationView?: LocationViewType
	exhibitionPlace?: ExhibitionPlaceType
	eventPlaceModality?: PlaceModalityType
	eventRepeat?: EventRepeatType
	entryValue?: string
	eventStartDate?: Date
	eventEndDate?: Date
	eventStartHour?: Date
	eventEndHour?: Date
	picturesUrl?: string[]
	tags?: string[]
	createdAt?: Date
	address?: {
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

export type SocialImpactCollection = {
	postId?: string
	postType?: PostType
	title?: string
	description?: string
	tags?: string[]
	locationView?: LocationViewType
	exhibitionRange?: ExhibitionPlaceType
	exhibitionWeekDays?: DaysOfWeek[]
	socialImpactRepeat?: EventRepeatType,
	openingHour?: Date
	closingHour?: Date
	picturesUrl?: string[]
	createdAt?: Date
	address?: {
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

export type AdsCollection = any
