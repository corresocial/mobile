import { UserSubscription } from '@domain/user/entity/types'

import { PostEntity } from '../entity/types'

async function postLocationChangedDM(
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	storedPostData: PostEntity,
	newPostData: PostEntity
) {
	// Se near location foi editada && location.latitute ou latitude foi editada
	// Se city location foi editada && location city unsaved ou initialData city foi editada

	if (userSubscriptionRange === 'near') {
		return Object.keys(newPostData).includes('location')
			&& newPostData
			&& newPostData.location
			&& newPostData.location.coordinates
			&& storedPostData.location.coordinates
			&& (
				newPostData.location.coordinates.latitude !== storedPostData.location.coordinates.latitude
				|| newPostData.location.coordinates.longitude !== storedPostData.location.coordinates.longitude
			)
	}

	if (userSubscriptionRange === 'city') {
		return Object.keys(newPostData).includes('location')
			&& newPostData
			&& newPostData.location
			&& newPostData.location.coordinates
			&& storedPostData.location.coordinates
			&& (
				newPostData.location.city !== storedPostData.location.city
			)
	}

	return false
}

export { postLocationChangedDM }
