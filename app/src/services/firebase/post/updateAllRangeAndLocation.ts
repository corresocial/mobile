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
	newPostRangeLocation: PostRangeLocation
) {
	if (!userPosts) return console.log('não possui posts')

	const updatedUserPosts = await updatePosts(userPosts, newPostRangeLocation)

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

const updatePosts = async (posts: PostCollection[], newPostRangeLocation: PostRangeLocation) => {
	if (!posts) return []

	const updatedPosts = posts.map((post) => {
		if (newPostRangeLocation.range === 'near') {
			return {
				...post,
				location: newPostRangeLocation.location
			}
		}

		if (newPostRangeLocation.range === 'city') {
			if (newPostRangeLocation.location?.city !== post.location?.city) {
				return {
					...post,
					location: newPostRangeLocation.location
				}
			}
		}

		return post
	})

	return updatedPosts
}

export { updateAllRangeAndLocation }
