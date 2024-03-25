import axios from 'axios'

import { FeedPosts, Id } from '../../firebase/types'
import { FeedSearchParams } from '../types/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function getPostsByLocationCloud(searchParams: FeedSearchParams, userId: Id) {
	return axios.post(`${FIREBASE_CLOUD_URL}/getFeedPosts`, { searchParams, userId })
		.then((res) => res.data as FeedPosts)
		.catch((err) => {
			console.log(err)
		})
}

export { getPostsByLocationCloud }
