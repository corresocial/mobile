import { FeedPosts, Id } from '../../../domain/post/entity/types'
import { FeedSearchParams } from '../types/types'

import { firebaseFunctions } from '@infrastructure/firebase'

async function getPostsByLocationCloud(searchParams: FeedSearchParams, userId: Id) {
	try {
		const getPostsFn = firebaseFunctions.httpsCallable('getFeedPosts')
		const response = await getPostsFn({ searchParams, userId })
		return response.data as FeedPosts
	} catch (error) {
		console.log(error)
		console.log('Cloud function error:', error)
		return undefined
	}
}

export { getPostsByLocationCloud }
