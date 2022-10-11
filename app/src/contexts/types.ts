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
    locationViewType?: string
    saleValue?: string
}

