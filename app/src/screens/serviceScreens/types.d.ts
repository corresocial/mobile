import { serviceCategories } from './serviceCategories';

export type ServiceCategories = keyof typeof serviceCategories

export type PaymentType = 'exchange' | 'sale' | 'any'

export type LocationViewType = 'private' | 'approximate' | 'public'

export type ServiceFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'

export type Coordinates = {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}