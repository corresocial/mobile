/* eslint-disable no-underscore-dangle */
// VER https://www.notion.so/corre/Atualizar-nomenclatura-dos-campos-no-firestore-74884c0bf0c142ddab7cca66676ab94b

// Erros de tipagem devido a atualização nos tipos

import { collection, query, getDocs } from 'firebase/firestore'
import { firestore } from '..'
import { updatePost } from '../post/updatePost'
import { CultureCollectionRemote, PostCollection, SaleCollectionRemote, ServiceCollectionRemote, SocialImpactCollectionRemote, VacancyCollectionRemote } from '../types'
import { updateUser } from '../user/updateUser'

const updatePostFieldsName = async () => {
	const docs: any = []

	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach((doc) => {
		// if (doc.id === 'userId') { // MOCK USER
		docs.push({ userId: doc.id, ...doc.data() })
		// }
	})

	docs.map(async (doc: any) => {
		console.log(`\n\nanalisando... ${doc.userId} ------------------------------------------------------------------`)
		let userPosts = [...doc.posts]

		if (!userPosts) return console.log(doc.userId, 'não possui posts')

		userPosts = await migratePostFields(userPosts)

		userPosts.map(async (post) => {
			// if (post.postId === 'postId') { // MOCK POST
			await updatePost('posts', post.postId, {
				...post,
				owner: {
					name: doc.name,
					userId: doc.userId,
					profilePictureUrl: doc.profilePictureUrl || []
				}
			})
				.then(() => console.log(`success: ${post.postId}`))
				.catch((err: any) => {
					console.log(err)
				})
			// }
		})

		await updateUser(doc.userId, { posts: userPosts as PostCollection[] })
			.then(() => console.log(`success userPosts: ${doc.userId}`))
			.catch((err: any) => {
				console.log(err)
			})

		return ''
	})
}

const migratePostFields = async (posts: PostCollection[]) => {
	if (!posts) return []

	const updatedPosts = posts.map(((post) => {
		switch (post.postType) {
			case 'income': {
				const currentPost: ServiceCollectionRemote | any = { ...post }

				currentPost.macroCategory = currentPost.incomeType

				return fixPostDateTimes(currentPost)
			}
			case 'service': {
				const currentPost: ServiceCollectionRemote | any = { ...post }

				currentPost.macroCategory = post.postType
				// currentPost.postType = 'income'   // TODO RUN After

				return fixPostDateTimes(currentPost)
			}
			case 'sale': {
				const currentPost: SaleCollectionRemote | any = { ...post }

				currentPost.macroCategory = post.postType
				// currentPost.postType = 'income' // TODO RUN After

				return fixPostDateTimes(currentPost)
			}
			case 'vacancy': {
				const currentPost: VacancyCollectionRemote | any = { ...post }

				if (currentPost.vacancyPurpose) {
					currentPost.lookingFor = currentPost.vacancyPurpose === 'findVacancy'
				}
				currentPost.macroCategory = post.postType
				// currentPost.postType = 'income' // TODO RUN After

				// delete currentPost.vacancyPurpose

				return fixPostDateTimes(currentPost)
			}
			case 'socialImpact': {
				const currentPost: SocialImpactCollectionRemote | any = { ...post }

				currentPost.macroCategory = currentPost.socialImpactType

				return fixPostDateTimes(currentPost)
			}
			case 'culture': {
				const currentPost: CultureCollectionRemote | any = { ...post }

				currentPost.macroCategory = currentPost.cultureType

				return fixPostDateTimes(currentPost)
			}
			default: {
				// console.log(`Problema no post de id${post.postId}`)
				return fixPostDateTimes(post)
			}
		}
	}))

	return updatedPosts
}

const fixPostDateTimes = (post: any) => {
	const customDateTimes = {} as any

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

	return post
}

export { updatePostFieldsName }
