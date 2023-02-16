import axios from 'axios'
import { Id } from '../firebase/types'
import { SearchParams } from '../maps/types'

const getPostsByLocationCloud = async (searchParams: SearchParams, userId: Id) => {
	return axios.post('https://us-central1-corresocial-66840.cloudfunctions.net/getFeedPosts', { searchParams, userId })
		.then((res) => res.data)
		.catch((error) => {
			console.log(error)
		})
}

export { getPostsByLocationCloud }
