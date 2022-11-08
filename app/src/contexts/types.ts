import { DaysOfWeek, DeliveryMethod, LocationViewType, PaymentType, UserCollection, WeekdaysFrequency } from "../services/Firebase/types";

export type UserIdentification = {
    uid: string;
    authTime: string;
    accessToken: string;
    tokenExpirationTime: string;
    refreshToken: string;
}

export type RegisterUserData = {
    cellNumber: string
    userName: string
    profilePictureUri?: string
    userIdentification: UserIdentification
}

export interface LocalUserData extends UserCollection {
    userId?: string,
    userIdentification?: UserIdentification
}

export interface UserData extends UserCollection {
    userId?: string,
    userIdentification?: UserIdentification,
    verificationCodeId?: string,
    cellNumber?: string
}

export type LocalUserPost = { //TODO Posts locais do usuario

}

export type ServiceData = {
    profileDescription?: string // on context
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
    }
}

export type SaleData = {
    title?: string
    itemName?: string
    itemDescription?: string
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
    }
}

export type VacancyData = {
    title?: string
    description?: string
    vacancyType?: string
    workplace?: string
    companyDescription?: string
    questions?: string[]
    workWeekdays?: []
    startWorkHour?: Date
    endWorkHour?: Date
    tags?: string[]
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
    }
}
