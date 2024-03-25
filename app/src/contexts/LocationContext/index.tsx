import React, { createContext, useMemo, useState } from 'react'

import { MacroCategoriesType } from '../../presentation/utils/postMacroCategories/types'
import { LocationContextType, LocationData, LocationProviderProps } from './types'
import { NewHomePostType } from '@services/firebase/types'

import QuestionMarkIcon from '@assets/icons/questionMark-white.svg'

const initialValue = {
	locationDataContext: {
		searchParams: {
			searchText: '',
			range: '',
			macroCategory: '' as MacroCategoriesType,
			category: '',
			tag: '',
			city: '',
			country: '',
			postType: '' as NewHomePostType,
			geohashes: [],
			coordinates: { latitude: 0, longitude: 0 }
		},
		currentCategory: {
			backgroundColor: '',
			inactiveColor: 'white',
			categoryName: '',
			categoryTitle: '',
			categorySvgIcon: QuestionMarkIcon,
			categoryTags: []
		},
		feedPosts: { nearby: [], city: [], country: [] },
		lastRefreshInMilliseconds: Date.now(),
	},
	setLocationDataOnContext: (data: LocationData) => { }
}

const LocationContext = createContext<LocationContextType>(initialValue as any)

function LocationProvider({ children }: LocationProviderProps) {
	const [locationDataContext, setLocationDataContext] = useState(initialValue.locationDataContext)

	const setLocationDataOnContext = async (data: LocationData) => { // REFACTOR Implementar verificação se dados mudaram
		setLocationDataContext({ ...locationDataContext, ...data as any }) // REFACTOR Type
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
