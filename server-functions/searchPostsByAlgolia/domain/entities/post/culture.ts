import { EventRepeatType, PostCollectionCommonFields, WeekdaysFrequency } from "./common"

export type CultureType = 'art' | 'event' | 'education'
export type PlaceModalityType = 'presential' | 'online' | 'both'

export interface CultureCollection extends PostCollectionCommonFields {
    macroCategory: CultureType
    eventPlaceModality?: PlaceModalityType
    repeat?: EventRepeatType
    entryValue?: string
    exhibitionFrequency?: WeekdaysFrequency
    startDate?: Date
    endDate?: Date
}