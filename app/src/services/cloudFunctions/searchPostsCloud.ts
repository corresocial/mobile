import axios from 'axios'

import { Id } from '../firebase/types'
import { SearchParams } from '../googleMaps/types/maps'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const searchPostsCloud = async (searchText: string, searchParams: SearchParams, searchByRange: boolean, userId: Id) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/searchPostsByAlgolia`, { searchText, searchParams, searchByRange, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
			return false
		})
}

export { searchPostsCloud }
