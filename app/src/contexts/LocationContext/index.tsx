import React, { createContext, useContext, useMemo, useState } from 'react'

import { PostType } from '@domain/post/entity/types'

import { MacroCategoriesType } from '../../presentation/utils/postMacroCategories/types'
import { LocationContextType, LocationData, LocationProviderProps } from './types'

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

	const setLocationDataOnContext = async (data: Partial<LocationData>) => {
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

const useLocationContext = () => useContext(LocationContext)

export { LocationProvider, LocationContext, useLocationContext }
