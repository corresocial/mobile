import { PostCollectionCommonFields, WeekdaysFrequency } from "./common"

export type IncomeType = 'sale' | 'service' | 'vacancy'
export type DeliveryMethod = 'unavailable' | 'near' | 'city' | 'country'
export type ItemStatus = 'new' | 'used'

export interface IncomeCollection extends PostCollectionCommonFields {
    macroCategory: IncomeType
    saleValue?: string
    exchangeValue?: string
    deliveryMethod?: DeliveryMethod
    attendanceFrequency?: WeekdaysFrequency
    itemStatus: ItemStatus
}

export type VacancyType = 'professional' | 'temporary' | 'beak'
export type WorkplaceType = 'homeoffice' | 'presential' | 'hybrid'

export interface VacancyCollection extends PostCollectionCommonFields {
    macroCategory: IncomeType
    vacancyType: VacancyType
    workplace: WorkplaceType
    workFrequency?: WeekdaysFrequency
    importantPoints?: string[]
    startDate?: Date
    endDate?: Date
    saleValue?: string
    exchangeValue?: string
}