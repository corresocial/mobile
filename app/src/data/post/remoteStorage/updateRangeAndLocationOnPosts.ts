import { PostEntity } from '@domain/post/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { updatePostData } from './updatePostData' // from data/post

export type PostRangeLocation = {
	range: string
	location: PostEntity['location']
}

// REFACTOR THIS is DOMAIN

const { remoteStorage } = useUserRepository()

async function updateRangeAndLocationOnPosts(
	userOwner: PostEntity['owner'],
	userPosts: PostEntity[],
	newPostRangeLocation: PostRangeLocation,
	subscriptionChange?: boolean
) {
	try {
		if (!userPosts || (userPosts && !userPosts.length)) {
			console.log('Usuário não outros posts')
			return []
		}

		let updatedUserPosts = await updatePostsLocation(userPosts, newPostRangeLocation)
		if (subscriptionChange) {
			updatedUserPosts = await updatePostsRange(updatedUserPosts, newPostRangeLocation)
		}

		updatedUserPosts.map(async (post) => {
			if (!post.postId) return []

			await updatePostData(post.postId, {
				...post,
				owner: { ...userOwner }
			})
				.then(() => {
					console.log(`success: ${post.postId}`)
				})
				.catch((err: any) => {
					console.log(err)
				})
		})

		return remoteStorage.updateUserData(userOwner.userId, { posts: updatedUserPosts })
			.then(() => updatedUserPosts)
			.catch((error) => {
				console.log(error)
				return []
			})
	} catch (error) {
		console.log(error)
		return []
	}
}

const updatePostsLocation = async (posts: PostEntity[], newPostRangeLocation: PostRangeLocation) => {
	if (!posts) return []

	const updatedPosts = posts.map((post) => {
		switch (newPostRangeLocation.range) {
			case 'near': {
				if (post.postType === 'socialImpact') {
					return post
				}

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

const updatePostsRange = async (posts: PostEntity[], newPostRangeLocation: PostRangeLocation) => {
	if (!posts) return []

	const updatedPosts = posts.map((post) => {
		switch (newPostRangeLocation.range) {
			case 'near': {
				if (post.postType === 'socialImpact') {
					return post
				}

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

export { updateRangeAndLocationOnPosts }
