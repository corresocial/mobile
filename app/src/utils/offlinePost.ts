import AsyncStorage from '@react-native-async-storage/async-storage'
import { PostCollection } from '../services/firebase/types'

const getOfflinePosts = async () => {
	const storedPosts = await AsyncStorage.getItem('corre.offlinePosts')
	if (storedPosts) {
		const addressesList = JSON.parse(storedPosts)
		return addressesList
	}
	return [] as PostCollection[]
}

const setOfflinePost = async (newPost: PostCollection) => {
	const storedPosts = await getOfflinePosts()

	const allOfflinePosts = [...storedPosts, { ...newPost }]

	await AsyncStorage.setItem('corre.offlinePosts', JSON.stringify(allOfflinePosts))
	return true
}

const deletePostByDescription = async (description: string) => {
	const storedPosts = await getOfflinePosts()

	const filteredPosts = storedPosts.filter((post: PostCollection) => post.description !== description)

	await AsyncStorage.setItem('corre.offlinePosts', JSON.stringify(filteredPosts))
	return true
}

export {
	getOfflinePosts,
	setOfflinePost,
	deletePostByDescription
}
