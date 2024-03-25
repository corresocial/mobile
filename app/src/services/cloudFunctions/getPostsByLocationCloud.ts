import axios from 'axios'

import { Id } from '../firebase/types'
import { SearchParams } from '../googleMaps/types/maps'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const getPostsByLocationCloud = async (searchParams: SearchParams, userId: Id) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/getFeedPosts`, { searchParams, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
		})
}

export { getPostsByLocationCloud }
