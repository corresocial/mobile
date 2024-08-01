import React, { createContext, useContext, useMemo, useState } from 'react'

import { FeedPosts, PostEntity, PostType } from '@domain/post/entity/types'

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

	const updatePostOnContext = (postData: PostEntity) => {
		const newDataContext = locationDataContext
		const nearFeedPosts: PostEntity[] = locationDataContext.feedPosts.nearby
		const cityFeedPosts: PostEntity[] = locationDataContext.feedPosts.city
		const countryFeedPosts: PostEntity[] = locationDataContext.feedPosts.country

		const updatePostInArray = (posts: PostEntity[]): PostEntity[] => {
			console.log('entrou updatePostInArray')
			const postIndex = posts.findIndex((post) => post.postId === postData.postId)
			if (postIndex !== -1) {
				return [
					...posts.slice(0, postIndex),
					postData,
					...posts.slice(postIndex + 1)
				]
			}
			return posts
		}

		const checkAndUpdatePosts = (): FeedPosts => {
			return {
				nearby: updatePostInArray(nearFeedPosts),
				city: postData.range === 'city' || postData.range === 'country' ? updatePostInArray(cityFeedPosts) : cityFeedPosts,
				country: postData.range === 'country' ? updatePostInArray(countryFeedPosts) : countryFeedPosts,
			}
		}

		newDataContext.feedPosts = checkAndUpdatePosts() as any
		setLocationDataContext(newDataContext)
	}

	const locationProviderData = useMemo(() => ({
		locationDataContext,
		setLocationDataOnContext,
		updatePostOnContext
	}), [locationDataContext])

	return (
		<LocationContext.Provider value={locationProviderData} >
			{children}
		</LocationContext.Provider>
	)
}

const useLocationContext = () => useContext(LocationContext)

export { LocationProvider, LocationContext, useLocationContext }
