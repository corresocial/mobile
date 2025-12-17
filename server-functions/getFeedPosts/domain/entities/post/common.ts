import { CultureCollection, CultureType } from "./culture"
import { IncomeCollection, IncomeType, VacancyCollection } from "./income"
import { SocialImpactCollection, SocialImpactType } from "./socialImpact"

type LocationViewType = 'private' | 'approximate' | 'public'
type PostRange = 'near' | 'city' | 'country'
type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'
export type PostType = 'income' | 'socialImpact' | 'culture'

export type Id = string

export interface PostCollectionCommonFields {
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

export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'
export type EventRepeatType = 'unrepeatable' | 'everyDay' | 'weekly' | 'biweekly' | 'monthly'

export type MacroCategoriesType = IncomeType | CultureType | SocialImpactType
export type PostCollection = Partial<IncomeCollection | VacancyCollection | CultureCollection | SocialImpactCollection>
export type PostCollectionRequired = IncomeCollection | VacancyCollection | CultureCollection | SocialImpactCollection

