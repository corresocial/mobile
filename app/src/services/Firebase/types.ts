import { LocationViewType } from "../../@types/types"
import { UserIdentification } from "../../screens/authRegisterScreens/types"

export type UserCollection = {
    userId?: string, // localOnly

    name?: string,
    description?: string,
    profilePictureUrl?: string[],
    tourPerformed?: boolean,
    tags?: string[],
    createdAt?: Date,
    updatedAt?: Date,
    posts?: PostCollection[],
    ads?: AdsCollection[],
    locationView?: LocationViewType,
    cellNumber?: string, // private
    address?: {          // private
        country?: string,
        state?: string,
        city?: string,
        district?: 'string',
        street?: string,
        residenceNumber?: number,
        reference?: string,
        coordinates?: { lat: number, lng: number },
        geohash?: string,
        geohashNear?: string[],
        geohashCity?: string[],
    }
}

export interface LocalUserData extends UserCollection {
    userIdentification: UserIdentification
}

export type PostCollection = {
    // All post types
}

export type PostCollectionType = 'services' | 'sales'
    // Post type title


export type ServiceCollection = {

}

export type AdsCollection = {

}
