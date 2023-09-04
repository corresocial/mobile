import AsyncStorage from '@react-native-async-storage/async-storage'
import { PostCollection } from '../services/firebase/types'

const getOfflinePosts = async () => {
	const storageAddresses = await AsyncStorage.getItem('corre.offlinePosts')
	if (storageAddresses) {
		const addressesList = JSON.parse(storageAddresses)
		return addressesList
	}
	return [] as PostCollection[]
}

const setOfflinePost = async (newPost: PostCollection) => {
	const storedPosts = await getOfflinePosts()

	const allAddresses = [...storedPosts, { ...newPost }]

	if (allAddresses.length > 10) {
		allAddresses.shift()
	}

	await AsyncStorage.setItem('corre.addresses', JSON.stringify(allAddresses))
	return true
}

export {
	getOfflinePosts,
	setOfflinePost
}
