
import {saleCategories} from './saleCategories'

export type SaleCategories = keyof typeof saleCategories

export type SaleCategory = {
    label: string
    value: string
    tags: string[]
}

export type PaymentType = 'exchange' | 'sale' | 'both' 

export type Coordinates = {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}

export type CompleteAddress = {
    street?: string | null;
    streetNumber?: string | null;
    district?: string | null;
    postalCode?: string | null;
    city?: string | null;
    subregion?: string | null;
    country?: string | null;
}

export type LocationViewType = 'private' | 'approximate' | 'public'

export type ServiceFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type DeliveryMethod = 'unavailable' | 'near' | 'city' | 'country'

export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom' 