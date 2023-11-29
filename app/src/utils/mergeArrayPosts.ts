import { PostCollection } from '../services/firebase/types'

function mergeArrayPosts(posts: PostCollection[] | undefined, postDataToMerge: PostCollection) {
	if (!posts) return posts

	return posts.map((post) => {
		if (post.postId === postDataToMerge.postId) {
			return { ...postDataToMerge }
		}
		return post
	})
}

export { mergeArrayPosts }
