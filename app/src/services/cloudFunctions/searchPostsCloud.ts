import { FIREBASE_CLOUD_URL } from '@env'

import axios from 'axios'
import { Id } from '../firebase/types'
import { SearchParams } from '../maps/types'

const searchPostsCloud = async (searchText: string, searchParams: SearchParams, userId: Id) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/searchPostsByAlgolia`, { searchText, searchParams, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
		})
}

export { searchPostsCloud }
