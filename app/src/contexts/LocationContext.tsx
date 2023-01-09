import React, { createContext, useMemo, useState } from 'react'

import { LocationData } from './types'

type LocationContextType = {
	locationDataContext: LocationData
	setLocationDataOnContext: (data: LocationData) => void
}

interface LocationProviderProps {
	children: React.ReactNode
}

const initialValue = {
	locationDataContext: {
		range: '',
		city: '',
		country: '',
		postType: '',
		geohashes: []
	},
	setLocationDataOnContext: (data: LocationData) => { }
}

const LocationContext = createContext<LocationContextType>(initialValue)

function LocationProvider({ children }: LocationProviderProps) {
	const [locationDataContext, setLocationDataContext] = useState(initialValue.locationDataContext)

	const setLocationDataOnContext = async (data: LocationData) => {
		setLocationDataContext({ ...locationDataContext, ...data })
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
