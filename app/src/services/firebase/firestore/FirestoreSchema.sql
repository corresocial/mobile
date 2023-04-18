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
    location: {
		country: 'string',
		state: 'string',
		city: 'string',
		district: 'string',
		street: 'string',
		number: 'int',
		reference: 'string',
		coordinates: {
			latiitudeitude: 'float',
			longitude: 'float'
		},
		geohashNear: 'array[string]',
		geohashCity: 'array[string]'
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
    range: enum('unavailable' | 'near' | 'city' | 'country'),
    attendanceFrequency: enum('today' | 'everyday' | 'someday' | 'businessDay')
    attendanceWeekDays: 'array[string]',
    startHour: 'date',
    endHour: 'date',
    createdAt: 'date',
    location: {
		country: 'string',
		state: 'string',
		city: 'string',
		district: 'string',
		street: 'string',
		number: 'int',
		reference: 'string',
		coordinates: {
			latiitudeitude: 'float',
			longitude: 'float'
		},
		geohashNear: 'array[string]',
		geohashCity: 'array[string]'
    },
    owner: {
        userId: 'string',
        name: 'string',
        profilePictureUrl: 'array[string]'
	},
}

saleCollection = {
    title: 'string',
    postType: enum('service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'),
    itemName: 'string',
    itemDescription: 'string',
    tags: 'array[string]',
    paymentType: enum('exchange' | 'sale' | 'both'),
    saleValue: 'string',
    exchangeValue: 'string',
    locationView: enum('private' | 'approximate' | 'public'),
    range: enum('unavailable' | 'near' | 'city' | 'country'),
    attendanceFrequency: enum('today' | 'everyday' | 'someday' | 'businessDay')
    attendanceWeekDays: 'array[string]',
    startHour: 'date',
    endHour: 'date',
    picturesUrl: 'array[string]',
    createdAt: 'date',
    location: {
		country: 'string',
		state: 'string',
		city: 'string',
		postalCode: 'string',
		district: 'string',
		street: 'string',
		number: 'string',
		reference: 'string',
		coordinates: {
			latiitudeitude: 'float',
			longitude: 'float'
		},
		geohashNear: 'array[string]',
		geohashCity: 'array[string]'
    }
    owner: {
        userId: 'string',
        name: 'string',
        profilePictureUrl: 'array[string]'
	},
}

vacancyCollection = {
    title: 'string'
    postType: enum('service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'),
    description: 'string'
    vacancyType: enum('professional' | 'temporary' | 'beak')
    workplace: enum('homeoffice' | 'presential' | 'hybrid')
	range: enum('near' | 'city' | 'country'),
    companyDescription: 'string'
    questions: string[]
    workWeekdays: DaysOfWeek[]
    startHour: 'date'
    endHour: 'date'
    tags: string[]
    createdAt: 'date'
    location: {
		country: 'string',
		state: 'string',
		city: 'string',
		postalCode: 'string',
		district: 'string',
		street: 'string',
		number: 'string',
		reference: 'string',
		coordinates: {
			latiitudeitude: 'float',
			longitude: 'float'
		}
		geohashNear: 'array[string]',
		geohashCity: 'array[string]'
    }
    owner: {
        userId: 'string',
        name: 'string',
        profilePictureUrl: 'array[string]'
	},
}

cultureCollection = {
    title: 'string',
    postType: enum('service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'),
    description: 'string',
    cultureType: enum('artistProfile' | 'eventPost'),
    locationView: enum('private' | 'approximate' | 'public'),
    range: enum('near' | 'city' | 'country'),
    eventPlaceModality: enum('online' | 'both' | 'presential'),
    repeat: enum('unrepeatable' | 'weekly' | 'everyDay' | 'biweekly' | 'monthly'),
    entryValue: 'string',
    startDate: 'date',
    endDate: 'date',
    startHour: 'date',
    endHour: 'date',
    picturesUrl: 'array[string]',
    tags: 'array[string]',
    createdAt: 'date',
    location: {
		country: 'string',
		state: 'string',
		city: 'string',
		postalCode: 'string',
		district: 'string',
		street: 'string',
		number: 'string',
		reference: 'string',
		coordinates: {
			latiitudeitude: 'float',
			longitude: 'float'
		}
		geohashNear: 'array[string]',
		geohashCity: 'array[string]'
    }
    owner: {
        userId: 'string',
        name: 'string',
        profilePictureUrl: 'array[string]'
	},
}

socialImpactCollection: {
	title: 'string',
	postType: enum('service' | 'sale' | 'vacancy' | 'socialImpact' | 'culture'),
	description: 'string',
	tags: 'array[string]',
	locationView: enum('private' | 'approximate' | 'public'),
	range: enum('near' | 'city' | 'country'),
	exhibitionWeekDays: 'array[string]',
	repeat: enum('unrepeatable' | 'weekly' | 'everyDay' | 'biweekly' | 'monthly'),
	startHour: 'date',
	endHour: 'date',
	picturesUrl: 'array[string]',
	createdAt: 'date',
	location: {
		country: 'string',
		state: 'string',
		city: 'string',
		postalCode: 'string',
		district: 'string',
		street: 'string',
		number: 'string',
		reference: 'string',
		coordinates: {
			latiitudeitude: 'float',
			longitude: 'float'
		},
		geohashNear: 'array[string]',
		geohashCity: 'array[string]'
	},
	owner: {
		userId: 'string',
		name: 'string',
		profilePictureUrl: 'array[string]'
	}
}
