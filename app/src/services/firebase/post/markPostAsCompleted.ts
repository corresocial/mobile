import { updateDocField } from '@data/user/remoteRepository/sujeira/updateDocField'

import { LocalUserData } from '@contexts/AuthContext/types'

import { Id, PostCollection } from '../types'

import { updatePost } from './updatePost'

const markPostAsComplete = async (
	localUser: LocalUserData,
	postId: string,
	data: PostCollection,
	userPosts: PostCollection[]
) => {
	await updatePost('posts', postId, data)

	await updateDocField(
		'users',
		localUser.userId as Id,
		'posts',
		userPosts,
		false
	)
}

export { markPostAsComplete }
