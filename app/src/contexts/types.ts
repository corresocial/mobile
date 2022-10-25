import { DaysOfWeek, DeliveryMethod, LocationViewType, ServiceFrequency } from "../screens/serviceScreens/types"

export type ServiceData = {
    completeAddress: {
        city?: string
        coordinates: {
            latitude: number
            longitude: number
        } 
        country?: string
        district?: string
        postalCode?: string
        street?: string
        streetNumber?: string
        subregion?: string
    }
    saleValue?: string
    exchangeValue?: string
    locationViewType?: LocationViewType
    deliveryMethod?: DeliveryMethod
    serviceFrequency?: ServiceFrequency
    weekdayService?: DaysOfWeek[]
    openingHour?: Date
    closingHour?: Date
    picturesUrl?: string[]
}

export type UserData = {
    tourStarted: boolean
    showFinishedTourModal: boolean
}

