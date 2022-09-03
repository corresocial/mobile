export type UserCollection = {
    address?: {
        map: {
            coordinates: { map: { lat: number, lng: number } }
            city: string
            number: number
            reference: string
            street: string
            state: string
            country: string
            geohashNear: string[]
            geohashCity: string[]
        }
    }
    ads?: any[] // TODO Type
    created_at?: Date
    description?: string
    img_url?: string[]
    mobility?: string
    name: string
    posts?: any[] // TODO Type
    range?: string
    tags?: string[]
    visibility?: string
    updated_at?: Date
}
