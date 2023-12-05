import axios from 'axios'
import { Id } from '../firebase/types'
import { SearchParams } from '../maps/types'
import { getEnvVars } from '../../infraestructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const getPostsByLocationCloud = async (searchParams: SearchParams, userId: Id) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/getFeedPostsBeta`, { searchParams, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
		})
}

export { getPostsByLocationCloud }
