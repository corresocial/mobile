import { serviceCategories } from "../screens/serviceScreens/serviceCategories"

export type ServiceCategories = keyof typeof serviceCategories

export type ServiceCategory = {
    label: string
    value: string
    tags: string[]
}

export type PaymentType = 'exchange' | 'sale' | 'any' | 'both' // both TODO remove any

export type LocationViewType = 'private' | 'approximate' | 'public'

export type ServiceFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type DeliveryMethod = 'unavailable' | 'near' | 'city' | 'country'

export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom' 

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
