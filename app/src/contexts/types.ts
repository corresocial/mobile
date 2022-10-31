import { PaymentType } from "../@types/types"
import { DaysOfWeek, DeliveryMethod, LocationViewType, ServiceFrequency } from "../screens/serviceScreens/types"

export type ServiceData = {
    profileDescription?: string // on context
    address?: {
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
    },
    tags: string[]
    paymentType: PaymentType
    saleValue?: string
    exchangeValue?: string
    locationView?: LocationViewType
    deliveryMethod?: DeliveryMethod
    attendanceFrequency?: ServiceFrequency
    attendanceWeekDays?: DaysOfWeek[]
    openingHour?: Date
    closingHour?: Date
    picturesUrl?: string[]
}

export type SaleData = {
    
}

/* export type PostData {
    localUser,
    postId,
    completeServiceData,
    picturePostsUrls
}
 */

