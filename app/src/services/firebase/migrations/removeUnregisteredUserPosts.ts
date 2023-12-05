/* eslint-disable no-param-reassign */
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore'

import { firestore } from '@services/firebase'

import { getPostCollectionName } from '@common/dbAuxiliaryFunctions'

import { updateUser } from '../user/updateUser'

const removeUnregisteredUserPosts = async () => { // Set Collection Name
	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach(async (user) => {
		const currentUser = user.data()
		currentUser.userId = user.id

		if (!currentUser.posts) return

		console.log(`${currentUser.name}: Number of posts before - ${currentUser.posts.length}`)
		const filteredPosts = await filterPosts(currentUser) || []
		console.log(`${currentUser.name}: Number of posts after - ${filteredPosts.length}`)
		console.log('\n')

		const postsFiltered = filteredPosts.map((post) => {
			const postFiltered = post
			delete postFiltered.owner

			if (postFiltered.location) {
				delete postFiltered.location.geohashNearby
				delete postFiltered.location.geohashCity
			}
			return postFiltered
		})

		await updateUser(currentUser.userId, { posts: postsFiltered } as any)
			.then(() => console.log(`${currentUser.name}: success!`))
			.catch((err) => {
				console.log(err)
				console.log(`${currentUser.name}: Deu ruim!`)
			})
	})
}

const filterPosts = async (currentUser: any) => {
	const filteredPosts = await currentUser.posts.map(async (post: any) => {
		const postRef = doc(firestore, getPostCollectionName(post.postType), post.postId)

		const postSnap = await getDoc(postRef)
		console.log(`${post.postType} ${post.postId} - ${postSnap.exists() ? 'exists' : 'not exists'}`)

		if (postSnap.exists()) {
			return {
				...postSnap.data(),
				postId: postSnap.id
			}
		}

		return false
	})

	return (await Promise.all(filteredPosts)).filter((post) => !!post)
}

export { removeUnregisteredUserPosts }
