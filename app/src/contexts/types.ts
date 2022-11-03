import { DaysOfWeek, DeliveryMethod, LocationViewType, PaymentType, UserCollection, WeekdaysFrequency } from "../services/Firebase/types";

export type UserIdentification = {
    uid: string;
    authTime: string;
    accessToken: string;
    tokenExpirationTime: string;
    refreshToken: string;
}

export type RegisterUserData = {
    userPhone: string
    userName: string
    profilePictureUri?: string
    userIdentification: UserIdentification
}

export interface LocalUserData extends UserCollection {
    userId?: string,
    userIdentification: UserIdentification
}

export type LocalUserPost = { //TODO Posts locais do usuario

}

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
        coordinates?: {
            latitude?: number
            longitude?: number
        }
        geohash?: string
        geohashNear?: string[]
        geohashCity?: string[]
    } ,
    title?: string
    tags?: string[]
    paymentType?: PaymentType
    saleValue?: string
    exchangeValue?: string
    locationView?: LocationViewType
    deliveryMethod?: DeliveryMethod
    attendanceFrequency?: WeekdaysFrequency
    attendanceWeekDays?: DaysOfWeek[]
    openingHour?: Date
    closingHour?: Date
    picturesUrl?: string[]
}

export type SaleData = {
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
    title: string
    itemName: string
    itemDescription: string
    tags: string[]
    paymentType: PaymentType
    saleValue?: string
    exchangeValue?: string
    locationView?: LocationViewType
    deliveryMethod?: DeliveryMethod
    attendanceFrequency?: WeekdaysFrequency
    attendanceWeekDays?: DaysOfWeek[]
    openingHour?: Date
    closingHour?: Date
    picturesUrl?: string[]
}

export type VacancyData = {

}
