import { PostCollection } from '@domain/post/entity/types'

function mergeArrayPosts(posts: PostCollection[], postDataToMerge: PostCollection) {
	if (!posts) return posts

	return posts.map((post) => {
		if (post.postId === postDataToMerge.postId) {
			return { ...postDataToMerge }
		}
		return post
	})
}

export { mergeArrayPosts }
