import React, { createContext, useMemo, useState } from 'react'
import { PostCollectionRemote } from '../services/firebase/types'
import { CurrentCategory, SearchParams } from '../services/maps/types'

import { LocationData } from './types'

type LocationContextType = {
	locationDataContext: {
		searchParams: SearchParams
		currentCategory: CurrentCategory
		nearbyPosts: PostCollectionRemote[]
		lastRefreshInMilliseconds: number
	}
	setLocationDataOnContext: (data: LocationData) => void
}

interface LocationProviderProps {
	children: React.ReactNode
}

const initialValue = {
	locationDataContext: {
		searchParams: {
			searchText: '',
			range: '',
			category: '',
			tag: '',
			city: '',
			country: '',
			postType: '',
			geohashes: [],
			coordinates: { lat: 0, lon: 0 }
		},
		currentCategory: {
			backgroundColor: '',
			inactiveColor: 'white',
			categoryName: '',
			categoryTitle: '',
			categoryIcon: '',
			categoryTags: []
		},
		nearbyPosts: [],
		lastRefreshInMilliseconds: Date.now(),
	},
	setLocationDataOnContext: (data: LocationData) => { }
}

const LocationContext = createContext<LocationContextType>(initialValue) // TODO Types

function LocationProvider({ children }: LocationProviderProps) {
	const [locationDataContext, setLocationDataContext] = useState(initialValue.locationDataContext)

	const setLocationDataOnContext = async (data: LocationData) => {
		setLocationDataContext({ ...locationDataContext, ...data as any })
	}

	const locationProviderData = useMemo(() => ({
		locationDataContext,
		setLocationDataOnContext
	}), [locationDataContext])

	return (
		<LocationContext.Provider value={locationProviderData} >
			{children}
		</LocationContext.Provider>
	)
}

export { LocationProvider, LocationContext }
