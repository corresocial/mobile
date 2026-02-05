import { FeedPosts, Id } from '../../../domain/post/entity/types'
import { FeedSearchParams } from '../types/types'
import { callCloudFunction } from '@infrastructure/firebase/cloudFunctions'

async function getPostsByLocationCloud(searchParams: FeedSearchParams, userId: Id) {
	try {
		const response = await callCloudFunction<{ searchParams: FeedSearchParams, userId: Id }, FeedPosts>(
			'getFeedPosts',
			{ searchParams, userId }
		)
		return response
	} catch (error) {
		console.log(error)
		console.log('Cloud function error:', error)
		return undefined
	}
}

export { getPostsByLocationCloud }
