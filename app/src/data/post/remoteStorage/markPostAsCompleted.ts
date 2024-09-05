import { PostEntityOptional } from '@domain/post/entity/types'

import { updatePostData } from './updatePostData'

const markPostAsComplete = async (postId: string, postData: PostEntityOptional, state: boolean) => {
	try {
		await updatePostData(postId, { ...postData, completed: state })
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { markPostAsComplete }
