import { EventRepeatType, PostCollectionCommonFields, WeekdaysFrequency } from "./common"

export type SocialImpactType = 'informative' | 'iniciative' | 'donation'
export type ExhibitionPlaceType = 'near' | 'city' | 'country'

export interface SocialImpactCollection extends PostCollectionCommonFields {
    macroCategory?: SocialImpactType
    exhibitionPlace?: ExhibitionPlaceType
    exhibitionFrequency?: WeekdaysFrequency
    repeat?: EventRepeatType
    startDate?: Date
    endDate?: Date
}