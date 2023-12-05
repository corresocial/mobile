/* eslint-disable no-param-reassign */
import { collection, query, getDocs } from 'firebase/firestore'

import { CultureCollectionRemote, PostCollectionType, IncomeCollectionRemote, SocialImpactCollectionRemote, VacancyCollectionRemote } from '../types'

import { firestore } from '@services/firebase'

import { createPostWithCustomId } from '../post/createPostWithCustomId'

const moveAllPostsByCollection = async (currentCollection: PostCollectionType) => { // Set Collection Name
	const destinationCollection = 'posts'

	const docsQuery = query(collection(firestore, currentCollection))

	const querySnapshot = await getDocs(docsQuery)
	querySnapshot.forEach(async (doc: any) => {
		const postObject = {
			postId: doc.id,
			...doc.data(),
			...getRelativeAdditionalData(currentCollection, { ...doc.data() })
		}
		// console.log(doc.id)

		if (postObject.exhibitionRange) delete postObject.exhibitionRange // SocialImpacts
		if (postObject.exhibitionPlace) delete postObject.exhibitionPlace // Cultures
		if (postObject.deliveryMethod) delete postObject.deliveryMethod // Cultures

		// if (doc.id !== 'mxKGfYQjyUyqbjs1Duha') return

		await createPostWithCustomId(postObject, postObject.owner, destinationCollection, postObject.postType, doc.id)
			.then(() => console.log(`success: row(${postObject.postId})`))
			.catch((err: any) => {
				console.log(err)
			})
	})
}

const getRelativeAdditionalData = (colletion: PostCollectionType, docData: any) => {
	switch (colletion) {
		case 'services': {
			const postData = { ...docData } as IncomeCollectionRemote | any
			return { range: postData.deliveryMethod || 'city' }// deliveryMethod is deprecated
		}
		case 'sales': {
			const postData = { ...docData } as IncomeCollectionRemote | any
			return { range: postData.deliveryMethod || 'city' }// deliveryMethod is deprecated
		}
		case 'vacancies': {
			const postData = { ...docData } as VacancyCollectionRemote
			return {
				range: postData.workplace === 'homeoffice' ? 'country' : 'city',
				location: postData.workplace === 'homeoffice' ? { country: 'Brasil', city: 'any' } : postData.location
			}
		}
		case 'socialImpacts': {
			const postData = { ...docData } as SocialImpactCollectionRemote | any
			return { range: postData.exhibitionRange }// exhibitionRange is deprecated
		}
		case 'cultures': {
			const postData = { ...docData } as CultureCollectionRemote | any
			return { range: postData.exhibitionPlace || 'city' }// exhibitionPlace is deprecated
		}
		default: {
			return { range: 'city' }
		}
	}
}

export { moveAllPostsByCollection }
