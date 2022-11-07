import { saleCategories } from "../../screens/saleScreens/saleCategories"
import { serviceCategories } from "../../screens/serviceScreens/serviceCategories"
import { vacancyCategories } from "../../screens/vacancyScreens/vacancyCategories"

export type SaleCategories = keyof typeof saleCategories
export type ServiceCategories = keyof typeof serviceCategories
export type VacancyCategories = keyof typeof vacancyCategories

export type LocationViewType = 'private' | 'approximate' | 'public'

export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type DeliveryMethod = 'unavailable' | 'near' | 'city' | 'country'

export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'

export type PaymentType = 'exchange' | 'sale' | 'both'

export type WorkplaceType = 'homeoffice' | 'presential' | 'hybrid'

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
    district?: string | null
    postalCode?: string | null
    city?: string | null
    subregion?: string | null
    country?: string | null
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
    address?: {          // private
        country?: string
        state?: string
        city?: string
        district?: 'string'
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
    district?: 'string'
    street?: string
    residenceNumber?: number
    reference?: string
    coordinates?: { lat: number, lng: number }
    geohash?: string
    geohashNear?: string[]
    geohashCity?: string[]
}

export type PostCollectionType = 'services' | 'sales' // Post type title

export type PostCollection = ServiceCollection | SaleCollection

export type ServiceCollection = {
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
    title: string
    tags: string[]
    paymentType: PaymentType
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
}

export type SaleCollection = {
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
    title: string
    itemName: string
    itemDescription: string
    tags: string[]
    paymentType: PaymentType
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
}

export type AdsCollection = {

}
