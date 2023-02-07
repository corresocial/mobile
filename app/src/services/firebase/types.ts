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

export type Id = string

export type ServiceCategory = typeof serviceCategories

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

export type UserCollection = {
	name?: string
	description?: string
	profilePictureUrl?: string[]
	tourPerformed?: boolean
	tags?: string[]
	category?: string
	createdAt?: Date
	updatedAt?: Date
	posts?: PostCollection[]
	ads?: AdsCollection[]
	locationView?: LocationViewType
	cellNumber?: string // private
	socialMedias?: SocialMedia[]
	location?: { // private
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
	range?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour?: Date
	closingHour?: Date
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
	description?: string
	tags: string[]
	category: string
	paymentType: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView: LocationViewType
	range: DeliveryMethod
	attendanceFrequency: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour: Date
	closingHour: Date
	picturesUrl?: string[]
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
	itemName?: string
	itemDescription?: string
	tags?: string[]
	category?: string
	paymentType?: PaymentType
	saleValue?: string
	exchangeValue?: string
	locationView?: LocationViewType
	range?: DeliveryMethod
	attendanceFrequency?: WeekdaysFrequency
	attendanceWeekDays?: DaysOfWeek[]
	openingHour?: Date
	closingHour?: Date
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
	itemName: string
	itemDescription: string
	tags: string[]
	category: string
	paymentType: PaymentType
	saleValue: string
	exchangeValue?: string
	locationView: LocationViewType
	range: DeliveryMethod
	attendanceFrequency: WeekdaysFrequency
	attendanceWeekDays: DaysOfWeek[]
	openingHour: Date
	closingHour: Date
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

export type VacancyCollectionRemote = {
	postId: string
	postType: PostType
	title: string
	description: string
	vacancyType: VacancyType
	workplace: WorkplaceType
	companyDescription: string
	questions: string[]
	workWeekdays: DaysOfWeek[]
	startWorkDate: Date
	endWorkDate: Date
	startWorkHour: Date
	endWorkHour: Date
	tags: string[]
	category: string
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
	postType: PostType
	title: string
	description: string
	cultureType: CultureType
	locationView: LocationViewType
	exhibitionPlace: ExhibitionPlaceType
	eventPlaceModality?: PlaceModalityType
	eventRepeat: EventRepeatType
	entryValue: string
	eventStartDate: Date
	eventEndDate: Date
	eventStartHour: Date
	eventEndHour: Date
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
	postType?: PostType
	title?: string
	description?: string
	tags?: string[]
	category?: string
	locationView?: LocationViewType
	exhibitionRange?: ExhibitionPlaceType
	exhibitionWeekDays?: DaysOfWeek[]
	socialImpactRepeat?: EventRepeatType,
	openingHour?: Date
	closingHour?: Date
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
	postType: PostType
	title: string
	description: string
	tags: string[]
	category: string
	locationView: LocationViewType
	exhibitionRange: ExhibitionPlaceType
	exhibitionWeekDays: DaysOfWeek[]
	socialImpactRepeat: EventRepeatType,
	openingHour: Date
	closingHour: Date
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
