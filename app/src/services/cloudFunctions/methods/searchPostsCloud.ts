import axios from 'axios'

import { Id } from '../../../domain/post/entity/types'
import { FeedSearchParams } from '../types/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function searchPostsCloud(searchText: string, searchParams: FeedSearchParams, searchByRange: boolean, userId: Id) {
	return axios.post(`${FIREBASE_CLOUD_URL}/searchPostsByAlgolia`, { searchText, searchParams, searchByRange, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
			return false
		})
}

export { searchPostsCloud }
