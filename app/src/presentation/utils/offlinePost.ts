import AsyncStorage from '@react-native-async-storage/async-storage'

import { LOCAL_OFFLINE_POSTS_REPOSITORY_KEY } from '@data/localStorageKeys'

import { PostCollection } from '@services/firebase/types'

// data
const getNumberOfStoredOfflinePosts = async () => {
	const storedPosts = await AsyncStorage.getItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY)
	if (storedPosts) {
		const storedPostsObject = JSON.parse(storedPosts)
		return storedPostsObject ? storedPostsObject.length : 0
	}
	return 0
}

const getOfflinePosts = async () => {
	const storedPosts = await AsyncStorage.getItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY)
	if (storedPosts) {
		const storedPostsObject = JSON.parse(storedPosts)
		return storedPostsObject
	}
	return [] as PostCollection[]
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

	await AsyncStorage.setItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY, JSON.stringify(allOfflinePosts))
	return true
}

const deletePostByDescription = async (description: string) => {
	const storedPosts = await getOfflinePosts()

	const filteredPosts = storedPosts.filter((post: PostCollection) => post.description !== description)

	await AsyncStorage.setItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY, JSON.stringify(filteredPosts))
	return true
}

const clearOfflinePosts = async () => {
	await AsyncStorage.removeItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY)
	return true
}

export {
	getOfflinePosts,
	getNumberOfStoredOfflinePosts,
	setOfflinePost,
	deletePostByDescription,
	clearOfflinePosts
}
