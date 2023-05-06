// VER https://www.notion.so/corre/Atualizar-nomenclatura-dos-campos-no-firestore-74884c0bf0c142ddab7cca66676ab94b

import { collection, query, getDocs } from 'firebase/firestore'
import { firestore } from '..'
import { getPrivateAddress } from '../post/getPrivateAddress'
import { updatePost } from '../post/updatePost'
import { CultureCollectionRemote, PostCollection, PostCollectionType, PostType, SaleCollectionRemote, ServiceCollection, ServiceCollectionRemote, SocialImpactCollectionRemote, VacancyCollectionRemote } from '../types'
import { updateUser } from '../user/updateUser'

const updatePostFieldsName = async (currentCollection: PostCollectionType) => { // Set Collection Name
	const docs: any = []

	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach((doc) => {
		if (doc.id === 'RMCJAuUhLjSmAu3kgjTzRjjZ2jB2') {
			docs.push({ userId: doc.id, ...doc.data() })
		}
	})

	docs.map(async (doc: any) => {
		console.log(`\n\nanalisando... ${doc.userId} ------------------------------------------------------------------`)
		let userPosts = [...doc.posts]

		if (!userPosts) return console.log(doc.userId, 'não possui posts')

		if (doc.userId === 'RMCJAuUhLjSmAu3kgjTzRjjZ2jB2') {
			userPosts = await migratePostFields(userPosts)
			// userPosts = await removePostFields(userPosts)

			userPosts.map(async (post) => {
				const relativeCollection = getRelativeCollection(post.postType)
				console.log(relativeCollection, post.postId, post.title)

				if (!relativeCollection) return ''

				// UNCOMENT
				/* if (post.postId === 'fXXtaJ3Azyt5g93nxwST') {
					await updatePost(relativeCollection, post.postId, post)
						.then(() => console.log(`success: ${post.postId}`))
						.catch((err: any) => {
							console.log(err)
						})
				} */
			})

			// UNCOMENT

			/* await updateUser(doc.userId, { posts: userPosts })
				.then(() => console.log(`success userPosts: ${doc.userId}`))
				.catch((err: any) => {
					console.log(err)
				}) */
		}

		return ''
	})
}

const getRelativeCollection = (postType: PostType) => {
	switch (postType) {
		case 'service': return 'services'
		case 'sale': return 'sales'
		case 'socialImpact': return 'socialImpacts'
		case 'vacancy': return 'vacancies'
		case 'culture': return 'cultures'
		default: return ''
	}
}

const migratePostFields = async (posts: PostCollection[]) => {
	if (!posts) return []

	const updatedPosts = posts.map(((post) => {
		switch (post.postType) {
			case 'service': {
				const currentPost: ServiceCollectionRemote = { ...post }
				if (currentPost.range) currentPost.deliveryMethod = currentPost.range
				if (currentPost.openingHour) currentPost.startHour = currentPost.openingHour
				if (currentPost.closingHour) currentPost.endHour = currentPost.closingHour
				if (currentPost.attendanceWeekDays) currentPost.daysOfWeek = currentPost.attendanceWeekDays

				/* 	console.log('MODIFIED')
				console.log(`currentPost.deliveryMethod: ${currentPost.deliveryMethod}`)
				console.log(`currentPost.startHour: ${currentPost.startHour}`)
				console.log(`currentPost.endHour: ${currentPost.endHour}`)
				console.log(`currentPost.daysOfWeek: ${currentPost.daysOfWeek}`)
				console.log('\n\n') */
				return currentPost
			}
			case 'sale': {
				const currentPost: SaleCollectionRemote = { ...post }
				currentPost.itemStatus = 'used'
				if (currentPost.range) currentPost.deliveryMethod = currentPost.range
				if (currentPost.openingHour) currentPost.startHour = currentPost.openingHour
				if (currentPost.closingHour) currentPost.endHour = currentPost.closingHour
				if (currentPost.attendanceWeekDays) currentPost.daysOfWeek = currentPost.attendanceWeekDays

				/* console.log('MODIFIED')
				console.log(`currentPost.itemStatus: ${currentPost.itemStatus}`)
				console.log(`currentPost.deliveryMethod: ${currentPost.deliveryMethod}`)
				console.log(`currentPost.startHour: ${currentPost.startHour}`)
				console.log(`currentPost.endHour: ${currentPost.endHour}`)
				console.log(`currentPost.daysOfWeek: ${currentPost.daysOfWeek}`)
				console.log('\n\n') */

				return currentPost
			}
			case 'vacancy': {
				const currentPost: VacancyCollectionRemote = { ...post }

				currentPost.vacancyPurpose = 'findProffessional'
				// currentPost.picturesUrl = []
				currentPost.locationView = 'approximate'
				currentPost.workFrequency = 'someday'

				if (currentPost.questions) currentPost.importantPoints = currentPost.questions
				if (currentPost.workWeekdays) currentPost.daysOfWeek = currentPost.workWeekdays || []
				if (currentPost.startWorkDate) currentPost.startDate = currentPost.startWorkDate
				if (currentPost.endWorkDate) currentPost.endDate = currentPost.endWorkDate
				if (currentPost.startWorkHour) currentPost.startHour = currentPost.startWorkHour
				if (currentPost.endWorkHour) currentPost.endHour = currentPost.endWorkHour

				/* console.log('MODIFIED')
				console.log(`currentPost.vacancyPurpose: ${currentPost.vacancyPurpose}`)
				console.log(`currentPost.picturesUrl: ${currentPost.picturesUrl}`)
				console.log(`currentPost.locationView: ${currentPost.locationView}`)
				console.log(`currentPost.importantPoints: ${currentPost.importantPoints}`)
				console.log(`currentPost.daysOfWeek: ${currentPost.daysOfWeek}`)
				console.log(`currentPost.startDate: ${currentPost.startDate}`)
				console.log(`currentPost.endDate: ${currentPost.endDate}`)
				console.log(`currentPost.startHour: ${currentPost.startHour}`)
				console.log(`currentPost.endHour: ${currentPost.endHour}`)
				console.log('\n\n') */

				return currentPost
			}
			case 'socialImpact': {
				const currentPost: SocialImpactCollectionRemote = { ...post }

				// currentPost.exhibitionFrequency = ''
				// currentPost.startDate = ''
				// currentPost.endDate = ''
				currentPost.exhibitionPlace = 'city'
				currentPost.locationView = 'approximate'

				if (currentPost.openingHour) currentPost.startHour = currentPost.openingHour
				if (currentPost.closingHour) currentPost.endHour = currentPost.closingHour
				if (currentPost.socialImpactRepeat) currentPost.repeat = currentPost.socialImpactRepeat
				currentPost.exhibitionFrequency = 'someday'
				if (currentPost.exhibitionWeekDays) currentPost.daysOfWeek = currentPost.exhibitionWeekDays

				/* console.log('MODIFIED')
				console.log(`currentPost.exhibitionPlace: ${currentPost.exhibitionPlace}`)
				console.log(`currentPost.exhibitionFrequency: ${currentPost.exhibitionFrequency}`)
				console.log(`currentPost.startDate: ${currentPost.startDate}`)
				console.log(`currentPost.endDate: ${currentPost.endDate}`)
				console.log(`currentPost.locationView: ${currentPost.locationView}`)
				console.log(`currentPost.startHour: ${currentPost.startHour}`)
				console.log(`currentPost.endHour: ${currentPost.endHour}`)
				console.log(`currentPost.repeat: ${currentPost.repeat}`)
				console.log(`currentPost.daysOfWeek: ${currentPost.daysOfWeek}`)
				console.log('\n\n') */

				return currentPost
			}
			case 'culture': {
				const currentPost: CultureCollectionRemote = { ...post }

				currentPost.exhibitionFrequency = 'someday'
				currentPost.daysOfWeek = []

				currentPost.repeat = currentPost.eventRepeat
				currentPost.startDate = currentPost.eventStartDate
				currentPost.endDate = currentPost.eventEndDate
				currentPost.startHour = currentPost.eventStartHour
				currentPost.endHour = currentPost.eventEndHour

				/* console.log('MODIFIED')
				console.log(`currentPost.exhibitionFrequency: ${currentPost.exhibitionFrequency}`)
				console.log(`currentPost.daysOfWeek: ${currentPost.daysOfWeek}`)
				console.log(`currentPost.repeat: ${currentPost.repeat}`)
				console.log(`currentPost.startDate: ${currentPost.startDate}`)
				console.log(`currentPost.endDate: ${currentPost.endDate}`)
				console.log(`currentPost.startHour: ${currentPost.startHour}`)
				console.log(`currentPost.endHour: ${currentPost.endHour}`)
				console.log('\n\n') */

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

const removePostFields = async (posts: PostCollection[]) => {
	if (!posts) return []

	const updatedPosts = posts.map(((post) => {
		switch (post.postType) {
			case 'service': {
				const currentPost: ServiceCollectionRemote = { ...post }
				delete currentPost.openingHour
				delete currentPost.closingHour
				delete currentPost.attendanceWeekDays

				/* console.log('REMOVED')
				console.log(`currentPost.openingHour: ${currentPost.openingHour}`)
				console.log(`currentPost.closingHour: ${currentPost.closingHour}`)
				console.log(`currentPost.attendanceWeekDays: ${currentPost.attendanceWeekDays}`)
				console.log('\n\n') */
				return currentPost
			}
			case 'sale': {
				const currentPost: SaleCollectionRemote = { ...post }
				delete currentPost.openingHour
				delete currentPost.closingHour
				delete currentPost.attendanceWeekDays
				delete currentPost.itemName

				/* console.log('REMOVED')
				 console.log(`currentPost.itemName: ${currentPost.itemName}`)
				console.log(`currentPost.openingHour: ${currentPost.openingHour}`)
				console.log(`currentPost.closingHour: ${currentPost.closingHour}`)
				console.log(`currentPost.attendanceWeekDays: ${currentPost.attendanceWeekDays}`)
				console.log('\n\n') */
				return currentPost
			}
			case 'vacancy': {
				const currentPost: VacancyCollectionRemote = { ...post }
				delete currentPost.questions
				delete currentPost.workWeekdays
				delete currentPost.startWorkDate
				delete currentPost.endWorkDate
				delete currentPost.startWorkHour
				delete currentPost.endWorkHour
				delete currentPost.companyDescription

				/* console.log('REMOVED')
				console.log(`currentPost.questions: ${currentPost.questions}`)
				console.log(`currentPost.workWeekdays: ${currentPost.workWeekdays}`)
				console.log(`currentPost.startWorkDate: ${currentPost.startWorkDate}`)
				console.log(`currentPost.endWorkDate: ${currentPost.endWorkDate}`)
				console.log(`currentPost.startWorkHour: ${currentPost.startWorkHour}`)
				console.log(`currentPost.endWorkHour: ${currentPost.endWorkHour}`)
				console.log(`currentPost.companyDescription: ${currentPost.companyDescription}`)
				console.log('\n\n') */
				return currentPost
			}
			case 'socialImpact': {
				const currentPost: SocialImpactCollectionRemote = { ...post }
				delete currentPost.openingHour
				delete currentPost.closingHour
				delete currentPost.socialImpactRepeat
				delete currentPost.exhibitionWeekDays

				/* console.log('REMOVED')
				console.log(`currentPost.openingHour: ${currentPost.openingHour}`)
				console.log(`currentPost.closingHour: ${currentPost.closingHour}`)
				console.log(`currentPost.socialImpactRepeat: ${currentPost.socialImpactRepeat}`)
				console.log(`currentPost.exhibitionWeekDays: ${currentPost.exhibitionWeekDays}`)
				console.log('\n\n') */
				return currentPost
			}
			case 'culture': {
				const currentPost: CultureCollectionRemote = { ...post }
				delete currentPost.cultureType
				delete currentPost.eventRepeat
				delete currentPost.eventStartDate
				delete currentPost.eventEndDate
				delete currentPost.eventStartHour
				delete currentPost.eventEndHour

				/* console.log('REMOVED')
				console.log(`currentPost.cultureType: ${currentPost.cultureType}`)
				console.log(`currentPost.eventRepeat: ${currentPost.eventRepeat}`)
				console.log(`currentPost.eventStartDate: ${currentPost.eventStartDate}`)
				console.log(`currentPost.eventEndDate: ${currentPost.eventEndDate}`)
				console.log(`currentPost.eventStartHour: ${currentPost.eventStartHour}`)
				console.log(`currentPost.eventEndHour: ${currentPost.eventEndHour}`)
				console.log('\n\n') */
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
