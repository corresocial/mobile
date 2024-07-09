import AsyncStorage from '@react-native-async-storage/async-storage'

import { PostEntityOptional } from '@domain/post/entity/types'

import { LOCAL_OFFLINE_POSTS_REPOSITORY_KEY } from '@data/shared/storageKeys/localStorageKeys'

async function getOfflinePosts() {
	try {
		const storedPosts = await AsyncStorage.getItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY)
		if (storedPosts) {
			const storedPostsObject: PostEntityOptional[] = JSON.parse(storedPosts)
			return storedPostsObject
		}
		return []
	} catch (error) {
		console.log(error)
		return []
	}
}

async function getNumberOfOfflinePosts() {
	try {
		const storedPosts = await getOfflinePosts()
		return storedPosts ? storedPosts.length : 0
	} catch (error) {
		console.log(error)
		return 0
	}
}

async function saveOfflinePost(newPost: PostEntityOptional) {
	try {
		const storedPosts = await getOfflinePosts()

		const filteredPosts = storedPosts.reduce((acc: PostEntityOptional[], post: PostEntityOptional) => {
			if (post.description === newPost.description) {
				return [...acc]
			}

			return [...acc, { ...post }]
		}, [])

		const allOfflinePosts = [...filteredPosts, { ...newPost }]

		await AsyncStorage.setItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY, JSON.stringify(allOfflinePosts))
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

async function deleteOfflinePostByDescription(description: string) {
	try {
		const storedPosts = await getOfflinePosts()

		const filteredPosts = storedPosts.filter((post: PostEntityOptional) => post.description !== description)
		await AsyncStorage.setItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY, JSON.stringify(filteredPosts))
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

async function clearOfflinePosts() {
	try {
		await AsyncStorage.removeItem(LOCAL_OFFLINE_POSTS_REPOSITORY_KEY)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export {
	getOfflinePosts,
	getNumberOfOfflinePosts,
	saveOfflinePost,
	deleteOfflinePostByDescription,
	clearOfflinePosts
}
