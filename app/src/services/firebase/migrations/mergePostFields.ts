/* eslint-disable no-underscore-dangle */
// VER https://www.notion.so/corre/Atualizar-nomenclatura-dos-campos-no-firestore-74884c0bf0c142ddab7cca66676ab94b

// Erros de tipagem devido a atualização nos tipos

import { collection, query, getDocs } from 'firebase/firestore'

import { useUserRepository } from '@data/user/useUserRepository'

import { PostCollection } from '../types'

import { firestore } from '@services/firebase'

import { updatePost } from '../post/updatePost'

const { remoteStorage } = useUserRepository()

const mergePostFields = async () => {
	const docs: any = []

	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach((doc) => {
		// if (doc.id === 'ndlE8OSkN5apjwcVKqWlSjhTIcI2') { // MOCK USER
		docs.push({ userId: doc.id, ...doc.data() })
		// }
	})

	docs.map(async (doc: any) => {
		console.log(`\n\nanalisando... ${doc.userId} ------------------------------------------------------------------`)
		const userPosts = [...doc.posts]

		if (!userPosts) return console.log(doc.userId, 'não possui posts')

		const allUserPosts = await migrateFields(userPosts, doc)
		const filteredAllPosts = allUserPosts.filter((post) => post)

		// console.log(filteredAllPosts)

		await remoteStorage.updateUserData(doc.userId, { posts: filteredAllPosts as PostCollection[] })
			.then(() => console.log(`success userPosts: ${doc.userId}`))
			.catch((err: any) => {
				console.log(err)
			})

		return ''
	})
}

const migrateFields = (userPosts: any[], doc: any) => {
	return Promise.all(
		userPosts.map(async (post) => {
			const customDateTimes = {} as any

			// if (post.postId === 'BUzB3d5Tbtvs6B0pfxaG') { // MOCK POST
			if (
				post.createdAt
				&& typeof (post.createdAt) === 'object'
				&& (Object.keys(post.createdAt).includes('_seconds')
					|| Object.keys(post.createdAt).includes('seconds'))) customDateTimes.createdAt = post.createdAt._seconds ? new Date(post.createdAt._seconds * 1000) : new Date(post.createdAt.seconds * 1000)
			if (
				post.updatedAt
				&& typeof (post.updatedAt) === 'object'
				&& (Object.keys(post.updatedAt).includes('_seconds')
					|| Object.keys(post.updatedAt).includes('seconds'))) customDateTimes.updatedAt = post.updatedAt._seconds ? new Date(post.updatedAt._seconds * 1000) : new Date(post.updatedAt.seconds * 1000)
			if (
				post.startHour
				&& typeof (post.startHour) === 'object'
				&& (Object.keys(post.startHour).includes('_seconds')
					|| Object.keys(post.startHour).includes('seconds'))) customDateTimes.startHour = post.startHour._seconds ? new Date(post.startHour._seconds * 1000) : new Date(post.startHour.seconds * 1000)
			if (
				post.endHour
				&& typeof (post.endHour) === 'object'
				&& (Object.keys(post.endHour).includes('_seconds')
					|| Object.keys(post.endHour).includes('seconds'))) customDateTimes.endHour = post.endHour._seconds ? new Date(post.endHour._seconds * 1000) : new Date(post.endHour.seconds * 1000)
			if (
				post.startDate
				&& typeof (post.startDate) === 'object'
				&& (Object.keys(post.startDate).includes('_seconds')
					|| Object.keys(post.startDate).includes('seconds'))) customDateTimes.startDate = post.startDate._seconds ? new Date(post.startDate._seconds * 1000) : new Date(post.startDate.seconds * 1000)
			if (
				post.endDate
				&& typeof (post.endDate) === 'object'
				&& (Object.keys(post.endDate).includes('_seconds')
					|| Object.keys(post.endDate).includes('seconds'))) customDateTimes.endDate = post.endDate._seconds ? new Date(post.endDate._seconds * 1000) : new Date(post.endDate.seconds * 1000)

			return updatePost('posts', post.postId, {
				...post,
				description: `${post.title ? `${post.title}. ` : ''}${post.description || ''} `,
				...customDateTimes,
				owner: {
					name: doc.name,
					userId: doc.userId,
					profilePictureUrl: doc.profilePictureUrl || []
				}
			})
				.then(() => {
					console.log(`success: ${post.postId}`)
					const postsDesnormalized = {
						...post,
						description: `${post.title ? `${post.title}. ` : ''}${post.description || ''} `,
						...customDateTimes
					}

					if (postsDesnormalized.owner) delete postsDesnormalized.owner
					return postsDesnormalized
				})
				.catch((err: any) => {
					console.log(err)
				})

			/* return {
				...post,
				owner: {
					name: doc.name,
					userId: doc.userId,
					profilePictureUrl: doc.profilePictureUrl || []
				}
			} */
		})
	)
}

export { mergePostFields }
