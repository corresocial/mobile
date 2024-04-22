import { ReactNode } from 'react'

import { FeedPosts } from '@domain/post/entity/types'

import { FeedSearchParams } from '@services/cloudFunctions/types/types'
import { CurrentCategory } from '@services/googleMaps/types/maps'

export interface LocationProviderProps {
	children: ReactNode
}

export type LocationData = {
	searchParams: FeedSearchParams
	currentCategory: CurrentCategory
	feedPosts: FeedPosts
	lastRefreshInMilliseconds?: number
}

export type LocationContextType = {
	locationDataContext: LocationData
	setLocationDataOnContext: (data: Partial<LocationData>) => void
}
