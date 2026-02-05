import { Id } from '../../../domain/post/entity/types'
import { FeedSearchParams } from '../types/types'
import { callCloudFunction } from '@infrastructure/firebase/cloudFunctions'

async function searchPostsCloud(
	searchText: string,
	searchParams: FeedSearchParams,
	searchByRange: boolean,
	userId: Id
) {
	try {
		const response = await callCloudFunction(
			'searchPostsByAlgolia',
			{ searchText, searchParams, searchByRange }
		)
		return response
	} catch (error) {
		console.log(error)
		console.log('Cloud function error:', error)
		return false
	}
}

export { searchPostsCloud }
