import { PostCollection } from '../types'
import { getPostById } from './getPostById'

async function getListOfPosts(postsList: any) { // TODO Type
	try {
		const promisses = postsList.map(async ({ postId, collection }: any) => {
			const posts = await getPostById(postId, collection) // TODO Type
			return posts as PostCollection
		})
		return Promise.all(promisses)
	} catch (e) {
		console.log(e)
		return [] as PostCollection[]
	}
}

export { getListOfPosts }
