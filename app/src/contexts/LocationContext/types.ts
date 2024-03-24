import { ReactNode } from 'react'

import { FeedPosts } from '@services/firebase/types'
import { CurrentCategory, SearchParams } from '@services/googleMaps/types/types'

export interface LocationProviderProps {
	children: ReactNode
}

export type LocationData = {
	searchParams?: SearchParams
	currentCategory?: CurrentCategory
	feedPosts?: FeedPosts
	lastRefreshInMilliseconds?: number
}

export type LocationContextType = {
	locationDataContext: {
		searchParams: SearchParams
		currentCategory: CurrentCategory
		feedPosts: FeedPosts
		lastRefreshInMilliseconds: number
	}
	setLocationDataOnContext: (data: LocationData) => void
}
