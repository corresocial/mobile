import { updatePost } from './updatePost'
import { updateUser } from '../user/updateUser'
import { PostCollection, PostCollectionRemote } from '../types'

type PostRangeLocation = {
	range: string
	location: PostCollectionRemote['location']
}

async function updateAllRangeAndLocation(
	userOwner: PostCollectionRemote['owner'],
	userPosts: PostCollection[],
	newPostRangeLocation: PostRangeLocation,
	subscriptionChange?: boolean
) {
	if (!userPosts) return console.log('não possui posts')

	let updatedUserPosts = await updatePostsLocation(userPosts, newPostRangeLocation)
	if (subscriptionChange) {
		updatedUserPosts = await updatePostsRange(updatedUserPosts, newPostRangeLocation)
	}

	updatedUserPosts.map(async (post) => {
		if (!post.postId) return

		await updatePost('posts', post.postId, {
			...post,
			owner: { ...userOwner }
		})
			.then(() => console.log(`success: ${post.postId}`))
			.catch((err: any) => {
				console.log(err)
			})
	})

	await updateUser(userOwner.userId, { posts: updatedUserPosts })
		.then(() => console.log(`success updatedUserPosts: ${userOwner.userId}`))
		.catch((err: any) => {
			console.log(err)
		})

	return updatedUserPosts
}

const updatePostsLocation = async (posts: PostCollection[], newPostRangeLocation: PostRangeLocation) => {
	if (!posts) return []

	const updatedPosts = posts.map((post) => {
		switch (newPostRangeLocation.range) {
			case 'near': {
				return {
					...post,
					location: newPostRangeLocation.location || post.location
				}
			}
			case 'city': {
				if (newPostRangeLocation.location?.city !== post.location?.city) {
					return {
						...post,
						location: newPostRangeLocation.location || post.location
					}
				}
				return post
			}
			default: return post
		}
	})

	return updatedPosts
}

const updatePostsRange = async (posts: PostCollection[], newPostRangeLocation: PostRangeLocation) => {
	if (!posts) return []

	const updatedPosts = posts.map((post) => {
		switch (newPostRangeLocation.range) {
			case 'near': {
				return {
					...post,
					range: newPostRangeLocation.range,
				}
			}
			case 'city': {
				return {
					...post,
					range: newPostRangeLocation.range,
				}
			}
			case 'country': {
				return {
					...post,
					range: newPostRangeLocation.range
				}
			}
			default: return post
		}
	})

	return updatedPosts
}

export { updateAllRangeAndLocation }
