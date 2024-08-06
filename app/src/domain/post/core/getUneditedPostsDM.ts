import { PostEntity, PostEntityOptional } from '../entity/types'

// REFACTOR Verificar se está sendo usado

function getUneditedPostsDM(allUserPosts: PostEntity[], editedPostData: PostEntityOptional) {
	return allUserPosts.filter((post) => post.postId !== editedPostData.postId) || []
}

export { getUneditedPostsDM }
