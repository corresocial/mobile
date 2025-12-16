
export interface PageData {
    page: string
    query: {
        slug: string
        id: string
    }
    props: {
        pageProps: PageProps
    }
}

export interface PageProps {
    hydrationData: {
        eventHydration: {
            event: ExternalEvent,
            isBetaUrl: boolean
        }
    }
}

export interface ExternalEvent {
    logoUrl: string
    eventsAddress: {
        id: number
        name: string
        address: string
        addressNum: string
        addressAlt: string
        neighborhood: string
        city: string
        state: string
        zipCode: string
        country: string
        location: string
        geolocation: {
            latitude: number
            longitude: number
        }
    }
    eventPaymentOptions: {
        creditCard: boolean
        creditCardInternational: boolean
        debit: boolean
        boleto: boolean
        applePay: boolean
        paypal: boolean
        debitBanks: string[]
        pix: boolean
        googlePay: boolean
        nuPay: boolean
    }
    hasCertificate: boolean
    onlineInfo: any // Defina o tipo adequado se conhecido
    eventPolicies: {
        title: string
        description: string
        policyLinkLabel?: string // opcional
    }[]
    paymentEventType: 'paid' | 'unpaid'
    id: number
    name: string
    startDate: string
    endDate: string
    detail: string
    images: {
        logoFileName: string
        logoUrl: string
        logoLarge: string
        logoSmall: string
        logoCover: string
        logoProfile: string
    }
    newUrl: string
    slug: string
    published: boolean
    cancelled: boolean
    visible: boolean
    eventType: string
    eventSubType: string
    isClosed: boolean
    eventsCategory: {
        id: number
        name: string
        description: string
        vertical: string
        slug: string
    }
    eventsHost: {
        id: number
        name: string
    }
    showMaps: boolean
    startDateMultiFormat: {
        default: string
    }
    endDateMultiFormat: {
        default: string
    }
}
