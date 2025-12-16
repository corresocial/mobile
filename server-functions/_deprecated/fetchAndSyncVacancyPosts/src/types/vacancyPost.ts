export interface VacancyPost {
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
    owner: UserOwner
    vacancyType?: VacancyType
    workplace?: WorkplaceType
    importantPoints?: string[]
    workFrequency?: WeekdaysFrequency
    startDate?: Date
    endDate?: Date
    saleValue?: string
    exchangeValue?: string
    unapprovedData?: VacancyPost & { reject?: boolean }

    externalPostId?: string
    isClosed?: boolean
    cancelled?: boolean
}

export type UserOwner = {
    userId: string
    name: string
    profilePictureUrl?: string[]
    redirect?: string
}


export type WorkplaceType = 'homeoffice' | 'presential' | 'hybrid'
export type VacancyType = 'professional' | 'temporary' | 'beak'
export type VacancyPurpose = 'findProffessional' | 'findVacancy'
export type PostType = 'income' | 'socialImpact' | 'culture'
export type ExhibitionPlaceType = 'near' | 'city' | 'country'
export type PlaceModalityType = 'presential' | 'online' | 'both'
export type LocationViewType = 'private' | 'approximate' | 'public'
export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'
export type PostRange = 'near' | 'city' | 'country'
export type EventRepeatType = 'unrepeatable' | 'everyDay' | 'weekly' | 'biweekly' | 'monthly'
export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'
