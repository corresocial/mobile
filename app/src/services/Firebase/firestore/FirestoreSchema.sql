usersCollection: {
    name: 'string',
    description: 'string',
    profilePictureUrl: 'array[string]',
    tourPerformed: 'boolean',
    tags: 'array[string]',
    createdAt: 'date',
    updatedAt: 'date',
    locationView: enum('private' | 'approximate' | 'public'), 
    posts: 'array[posts_denormalized]',
    ads: 'array[ads_denormalized]',
    private cellNumber: 'string',
    private address: {
                country: 'string',
                state: 'string',
                city: 'string',
                district: 'string',
                street: 'string',
                number: 'int',
                 reference: 'string',
                coordinates: { lat: 'float', lng: 'float' },
                geohash: 'string', /* Salvar hash point */
                geohashNear: 'array[string]',
                geohashCity: 'array[string]',
    }
}

serviceCollection: {
	title: 'string',
	description: 'string',
	postType: enum('service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'),
	pictureUrl: 'array[string]',
	tags: 'array[string]',
    paymentType: enum('exchange' | 'sale' | 'both')
	saleValue: 'float' 
	exchangeValue: 'string' 
    deliveryMethod: enum('unavailable' | 'near' | 'city' | 'country'),
    attendanceFrequency: enum('today' | 'everyday' | 'someday' | 'businessDay')
    attendanceWeekDays: 'array[string]',
    openingHour: 'date',
    closingHour: 'date',
    createdAt: 'date',
    private address: {
            country: 'string',
            state: 'string',
            city: 'string',
            district: 'string',
            street: 'string',
            number: 'int',
            reference: 'string',
            coordinates: { lat: 'float', lng: 'float'},
            geohash: 'string',
            geohashNear: 'array[string]',
            geohashCity: 'array[string]',
    },
    owner: {
        userId: 'string',
        name: 'string',
        profilePictureUrl: 'array[string]'
	},
}

saleCollection = {
    title: 'string',
    itemName: 'string',
    itemDescription: 'string',
    tags: 'array[string]',
    paymentType: enum('exchange' | 'sale' | 'both'),
    saleValue: 'string',
    exchangeValue: 'string',
    locationView: enum('private' | 'approximate' | 'public'), 
    deliveryMethod: enum('unavailable' | 'near' | 'city' | 'country'),
    attendanceFrequency: enum('today' | 'everyday' | 'someday' | 'businessDay')
    attendanceWeekDays: 'array[string]',
    openingHour: 'date',
    closingHour: 'date',
    picturesUrl: 'array[string]',
    createdAt: 'date',
    private address: {
            country: 'string',
            state: 'string',
            city: 'string',
            postalCode: 'string',
            district: 'string',
            street: 'string',
            number: 'string',
            reference: 'string',
            coordinates: {
                latitude: 'float',
                longitude: 'float',
            }
            geohash: 'string'
            geohashNear: 'array[string]',
            geohashCity: 'array[string]',
    }
    owner: {
        userId: 'string',
        name: 'string',
        profilePictureUrl: 'array[string]'
	},
}