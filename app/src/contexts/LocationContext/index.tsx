import React, { createContext, useMemo, useState } from 'react'

import { MacroCategoriesType } from '../../presentation/utils/postMacroCategories/types'
import { LocationContextType, LocationData, LocationProviderProps } from './types'
import { PostType } from '@services/firebase/types'

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
			postType: '' as PostType,
			geohashes: [],
			coordinates: { lat: 0, lon: 0 }
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

const LocationContext = createContext<LocationContextType>(initialValue)

function LocationProvider({ children }: LocationProviderProps) {
	const [locationDataContext, setLocationDataContext] = useState(initialValue.locationDataContext)

	const setLocationDataOnContext = async (data: LocationData) => {
		setLocationDataContext({ ...locationDataContext, ...data as any })
	}

	console.log('ContextUpdated === LocationContext')

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
