import { httpsCallable } from '@react-native-firebase/functions'

import { Id } from '../../../domain/post/entity/types'
import { FeedSearchParams } from '../types/types'

import { firebaseFunctions } from '@infrastructure/firebase'

async function searchPostsCloud(
	searchText: string,
	searchParams: FeedSearchParams,
	searchByRange: boolean,
	userId: Id
) {
	try {
		const searchPostsFn = httpsCallable(firebaseFunctions, 'searchPostsByAlgolia')
		const response = await searchPostsFn({ searchText, searchParams, searchByRange })
		return response.data as any
	} catch (error) {
		console.log(error)
		console.log('Cloud function error:', error)
		return false
	}
}

export { searchPostsCloud }
