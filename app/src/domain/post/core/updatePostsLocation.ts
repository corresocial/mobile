import { PostEntity } from '../entity/types'

export type PostRangeLocation = {
	range: string
	location: PostEntity['location']
}

export async function updatePostsLocation(posts: PostEntity[], newPostRangeLocation: PostRangeLocation) {
	if (!posts) return [] as PostEntity[]

	const updatedPosts = posts.map((post) => {
		switch (newPostRangeLocation.range) {
			case 'near': {
				if (post.postType === 'socialImpact' || (post.unapprovedData && post.unapprovedData.postType === 'socialImpact')) {
					return post
				}

				if (post.unapprovedData && post.unapprovedData.location) {
					return {
						...post,
						location: newPostRangeLocation.location || post.location,
						unapprovedData: {
							...post.unapprovedData,
							location: newPostRangeLocation.location || post.location
						}
					}
				}

				return { ...post, location: newPostRangeLocation.location || post.location }
			}
			case 'city': {
				if (newPostRangeLocation.location?.city !== post.location?.city) {
					if (post.unapprovedData && post.unapprovedData.location) {
						return {
							...post,
							location: newPostRangeLocation.location || post.location,
							unapprovedData: {
								...post.unapprovedData,
								location: newPostRangeLocation.location || post.location
							}
						}
					}

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

	return updatedPosts as PostEntity[]
}

export async function updatePostsRange(posts: PostEntity[], newPostRangeLocation: PostRangeLocation) {
	if (!posts) return [] as PostEntity[]

	const updatedPosts = posts.map((post) => {
		switch (newPostRangeLocation.range) {
			case 'near': {
				if (post.postType === 'socialImpact' || (post.unapprovedData && post.unapprovedData.postType === 'socialImpact')) {
					return post
				}

				if (post.unapprovedData && post.unapprovedData.range) {
					return {
						...post,
						unapprovedData: {
							...post.unapprovedData,
							range: newPostRangeLocation.range || 'near'
						}
					}
				}

				return { ...post, range: newPostRangeLocation.range }
			}
			case 'city': {
				if (post.unapprovedData && post.unapprovedData.range) {
					return {
						...post,
						unapprovedData: {
							...post.unapprovedData,
							range: newPostRangeLocation.range || 'near'
						}
					}
				}
				return { ...post, range: newPostRangeLocation.range }
			}
			case 'country': {
				if (post.unapprovedData && post.unapprovedData.range) {
					return {
						...post,
						unapprovedData: {
							...post.unapprovedData,
							range: newPostRangeLocation.range || 'near'
						}
					}
				}
				return { ...post, range: newPostRangeLocation.range }
			}
			default: return post
		}
	})

	return updatedPosts as PostEntity[]
}
