export interface EventPost {
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
    macroCategory: CultureType
    eventPlaceModality?: PlaceModalityType
    repeat?: EventRepeatType
    entryValue?: string
    exhibitionFrequency?: WeekdaysFrequency
    startDate?: Date
    endDate?: Date
    unapprovedData?: Partial<EventPost> & { reject?: boolean }
    location: {
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
        redirect?: string
        name: string
        profilePictureUrl?: string[]
    }

    externalPostId?: string
    isClosed?: boolean
    cancelled?: boolean
}

export type PostType = 'income' | 'socialImpact' | 'culture'
export type CultureType = 'art' | 'event' | 'education'
export type ExhibitionPlaceType = 'near' | 'city' | 'country'
export type PlaceModalityType = 'presential' | 'online' | 'both'
export type LocationViewType = 'private' | 'approximate' | 'public'
export type WeekdaysFrequency = 'today' | 'everyday' | 'someday' | 'businessDay'
export type PostRange = 'near' | 'city' | 'country'
export type EventRepeatType = 'unrepeatable' | 'everyDay' | 'weekly' | 'biweekly' | 'monthly'
export type DaysOfWeek = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'
