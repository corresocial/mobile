import { ReactNode } from 'react'

import { FeedSearchParams } from '@services/cloudFunctions/types/types'
import { FeedPosts } from '@services/firebase/types'
import { CurrentCategory } from '@services/googleMaps/types/maps'

export interface LocationProviderProps {
	children: ReactNode
}

export type LocationData = {
	searchParams?: FeedSearchParams
	currentCategory?: CurrentCategory
	feedPosts?: FeedPosts
	lastRefreshInMilliseconds?: number
}

export type LocationContextType = {
	locationDataContext: {
		searchParams: Partial<FeedSearchParams>
		currentCategory: CurrentCategory
		feedPosts: FeedPosts
		lastRefreshInMilliseconds: number
	}
	setLocationDataOnContext: (data: LocationData) => void
}
