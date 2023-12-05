// VER https://www.notion.so/corre/Atualizar-nomenclatura-dos-campos-no-firestore-74884c0bf0c142ddab7cca66676ab94b

// Erros de tipagem devido a atualização nos tipos

import { collection, query, getDocs } from 'firebase/firestore'

import { PostCollection } from '../types'

import { firestore } from '@services/firebase'

import { updatePost } from '../post/updatePost'
import { updateUser } from '../user/updateUser'

const updatePostFieldsDescriptionName = async () => {
	const docs: any = []

	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach((doc) => {
		// if (doc.id === 'A9xyLZluxJhEfQbpjggYPAxaV9u2') { // MOCK USER
		docs.push({ userId: doc.id, ...doc.data() })
		// }
	})

	docs.map(async (doc: any) => {
		console.log(`\n\nanalisando... ${doc.userId} ------------------------------------------------------------------`)
		const userPosts = [...doc.posts]

		if (!userPosts) return console.log(doc.userId, 'não possui posts')

		const updatedUserPosts = await Promise.all(
			userPosts.map(async (post) => {
				if (post.postType !== 'sale') {
					return post
				}

				return updatePost('posts', post.postId, {
					...post,
					description: post.itemDescription || post.description,
					owner: {
						name: doc.name,
						userId: doc.userId,
						profilePictureUrl: doc.profilePictureUrl || []
					}
				})
					.then(() => {
						console.log(`success: ${post.postId}`)
						return {
							...post,
							description: post.itemDescription || post.description,
						}
					})
					.catch((err: any) => {
						console.log(err)
					})
			})
		)

		await updateUser(doc.userId, { posts: updatedUserPosts as PostCollection[] })
			.then(() => {
				console.log(`success updatedUserPosts: ${doc.userId}`)
			})
			.catch((err: any) => {
				console.log(err)
			})

		return ''
	})
}

export { updatePostFieldsDescriptionName }
