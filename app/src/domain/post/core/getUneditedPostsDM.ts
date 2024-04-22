import { PostEntity, PostEntityOptional } from '../entity/types'

function getUneditedPostsDM(allUserPosts: PostEntity[], editedPostData: PostEntityOptional) {
	return allUserPosts.filter((post) => post.postId !== editedPostData.postId) || []
}

export { getUneditedPostsDM }
