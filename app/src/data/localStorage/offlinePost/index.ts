import AsyncStorage from '@react-native-async-storage/async-storage'

import { PostCollection } from '../../../services/firebase/types'

const getOfflinePosts = async () => {
	const storedPosts = await AsyncStorage.getItem('corre.offlinePosts')
	if (storedPosts) {
		const storedPostsObject = JSON.parse(storedPosts)
		return storedPostsObject
	}
	return [] as PostCollection[]
}

const getNumberOfStoredOfflinePosts = async () => {
	const storedPosts = await getOfflinePosts()
	if (storedPosts) {
		const storedPostsObject = JSON.parse(storedPosts)
		return storedPostsObject ? storedPostsObject.length : 0
	}
	return 0
}

const setOfflinePost = async (newPost: PostCollection) => {
	const storedPosts = await getOfflinePosts()

	const filteredPosts = storedPosts.reduce((acc: PostCollection[], post: PostCollection) => {
		if (post.description === newPost.description) {
			return [...acc]
		}

		return [...acc, { ...post }]
	}, [])

	const allOfflinePosts = [...filteredPosts, { ...newPost }]

	await AsyncStorage.setItem('corre.offlinePosts', JSON.stringify(allOfflinePosts))
	return true
}

const deletePostByDescription = async (description: string) => {
	const storedPosts = await getOfflinePosts()

	const filteredPosts = storedPosts.filter((post: PostCollection) => post.description !== description)

	await AsyncStorage.setItem('corre.offlinePosts', JSON.stringify(filteredPosts))
	return true
}

const clearOfflinePosts = async () => {
	await AsyncStorage.removeItem('corre.offlinePosts')
	return true
}

export {
	getOfflinePosts,
	getNumberOfStoredOfflinePosts,
	setOfflinePost,
	deletePostByDescription,
	clearOfflinePosts
}
