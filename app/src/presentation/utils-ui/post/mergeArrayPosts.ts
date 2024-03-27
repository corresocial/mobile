import { PostEntityOptional } from '@domain/post/entity/types'

function mergeArrayPosts(posts: PostEntityOptional[], postDataToMerge: PostEntityOptional) {
	if (!posts) return posts

	return posts.map((post) => {
		if (post.postId === postDataToMerge.postId) {
			return { ...postDataToMerge }
		}
		return post
	})
}

export { mergeArrayPosts }
