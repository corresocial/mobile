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
		// if (doc.id === 'RMCJAuUhLjSmAu3kgjTzRjjZ2jB2') { // MOCK USER
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

		await updateUser(doc.userId, { posts: userPosts })
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
			case 'service': {
				const currentPost: ServiceCollectionRemote | any = { ...post }

				if (!currentPost.range) currentPost.range = 'near'
				currentPost.deliveryMethod = currentPost.range || 'unavailable'
				currentPost.startHour = currentPost.openingHour || currentPost.startHour
				currentPost.endHour = currentPost.closingHour || currentPost.endHour
				currentPost.daysOfWeek = currentPost.attendanceWeekDays || currentPost.daysOfWeek

				Object.entries(currentPost).map((value) => {
					if (value[1] === undefined || value[1] === '') {
						// console.log(`${value[0]} is undefined`)
						delete currentPost[value[0]]
					}

					return ''
				})

				delete currentPost.openingHour
				delete currentPost.closingHour
				delete currentPost.attendanceWeekDays

				if (currentPost.range === 'unavailable') {
					currentPost.range = 'near'
				}
				return currentPost
			}
			case 'sale': {
				const currentPost: SaleCollectionRemote | any = { ...post }

				if (!currentPost.itemStatus) currentPost.itemStatus = 'used'

				if (!currentPost.range) currentPost.range = 'near'
				currentPost.deliveryMethod = currentPost.range || (currentPost.deliveryMethod || 'unavailable')
				currentPost.startHour = currentPost.openingHour || currentPost.startHour
				currentPost.endHour = currentPost.closingHour || currentPost.endHour
				currentPost.daysOfWeek = currentPost.attendanceWeekDays || currentPost.daysOfWeek

				Object.entries(currentPost).map((value) => {
					if (value[1] === undefined || value[1] === '') {
						// console.log(`${value[0]} is undefined`)
						delete currentPost[value[0]]
					}

					return ''
				})

				delete currentPost.openingHour
				delete currentPost.closingHour
				delete currentPost.attendanceWeekDays
				delete currentPost.itemName

				if (currentPost.range === 'unavailable') {
					currentPost.range = 'near'
				}
				return currentPost
			}
			case 'vacancy': {
				const currentPost: VacancyCollectionRemote | any = { ...post }

				currentPost.vacancyPurpose = 'findProffessional'
				// currentPost.picturesUrl = []
				currentPost.locationView = 'approximate'
				currentPost.workFrequency = 'someday'

				if (currentPost.questions) currentPost.importantPoints = currentPost.questions
				currentPost.range = 'near'
				currentPost.daysOfWeek = currentPost.workWeekdays || currentPost.daysOfWeek
				currentPost.startDate = currentPost.startWorkDate || currentPost.startDate
				currentPost.endDate = currentPost.endWorkDate || currentPost.endDate
				currentPost.startHour = currentPost.startWorkHour || currentPost.startHour
				currentPost.endHour = currentPost.endWorkHour || currentPost.endHour

				if (currentPost.workplace === 'homeoffice') delete currentPost.location

				Object.entries(currentPost).map((value) => {
					if (value[1] === undefined || value[1] === '') {
						// console.log(`${value[0]} is undefined`)
						delete currentPost[value[0]]
					}

					return ''
				})

				delete currentPost.questions
				delete currentPost.workWeekdays
				delete currentPost.startWorkDate
				delete currentPost.endWorkDate
				delete currentPost.startWorkHour
				delete currentPost.endWorkHour
				delete currentPost.companyDescription

				if (currentPost.range === 'unavailable') {
					currentPost.range = 'near'
				}
				return currentPost
			}
			case 'socialImpact': {
				const currentPost: SocialImpactCollectionRemote | any = { ...post }

				// currentPost.exhibitionFrequency = ''
				// currentPost.startDate = ''
				// currentPost.endDate = ''
				currentPost.exhibitionPlace = 'city'
				currentPost.locationView = 'approximate'

				if (!currentPost.range) currentPost.range = 'near'
				currentPost.startHour = currentPost.openingHour || currentPost.startHour
				currentPost.endHour = currentPost.closingHour || currentPost.endHour
				currentPost.repeat = currentPost.socialImpactRepeat || currentPost.repeat
				currentPost.exhibitionFrequency = 'someday'
				currentPost.daysOfWeek = currentPost.exhibitionWeekDays || currentPost.daysOfWeek

				Object.entries(currentPost).map((value) => {
					if (value[1] === undefined || value[1] === '') {
						// console.log(`${value[0]} is undefined`)
						delete currentPost[value[0]]
					}

					return ''
				})

				delete currentPost.openingHour
				delete currentPost.closingHour
				delete currentPost.socialImpactRepeat
				delete currentPost.exhibitionWeekDays

				if (currentPost.range === 'unavailable') {
					currentPost.range = 'near'
				}
				return currentPost
			}
			case 'culture': {
				const currentPost: CultureCollectionRemote | any = { ...post }

				currentPost.exhibitionFrequency = 'someday'
				currentPost.daysOfWeek = []

				if (!currentPost.range) currentPost.range = 'near'
				if (!currentPost.exhibitionPlace) currentPost.exhibitionPlace = 'near'

				currentPost.repeat = currentPost.eventRepeat || currentPost.repeat
				currentPost.startDate = currentPost.eventStartDate || currentPost.startDate
				currentPost.endDate = currentPost.eventEndDate || currentPost.endDate
				currentPost.startHour = currentPost.eventStartHour || currentPost.startHour
				currentPost.endHour = currentPost.eventEndHour || currentPost.endHour

				Object.entries(currentPost).map((value) => {
					if (value[1] === undefined || value[1] === '') {
						// console.log(`${value[0]} is undefined`)
						delete currentPost[value[0]]
					}

					return ''
				})

				delete currentPost.cultureType
				delete currentPost.eventRepeat
				delete currentPost.eventStartDate
				delete currentPost.eventEndDate
				delete currentPost.eventStartHour
				delete currentPost.eventEndHour

				if (currentPost.range === 'unavailable') {
					currentPost.range = 'near'
				}
				return currentPost
			}
			default: {
				// console.log(`Problema no post de id${post.postId}`)
				return post
			}
		}
	}))

	return updatedPosts
}

export { updatePostFieldsName }
