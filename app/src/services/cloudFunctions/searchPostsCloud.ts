import axios from 'axios'

import { getEnvVars } from '../../infraestructure/environment'
import { Id } from '../firebase/types'
import { SearchParams } from '../maps/types'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const searchPostsCloud = async (searchText: string, searchParams: SearchParams, searchByRange: boolean, userId: Id) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/searchPostsByAlgoliaBeta`, { searchText, searchParams, searchByRange, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
			return false
		})
}

export { searchPostsCloud }
