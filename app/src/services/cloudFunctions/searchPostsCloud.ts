import axios from 'axios'
import { Id } from '../firebase/types'
import { SearchParams } from '../maps/types'

const searchPostsCloud = async (searchText: string, searchParams: SearchParams, userId: Id) => {
	return axios.post('https://us-central1-corresocial-66840.cloudfunctions.net/searchPostsByAlgolia', { searchText, searchParams, userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
		})
}

export { searchPostsCloud }
