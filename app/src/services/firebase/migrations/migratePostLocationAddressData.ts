/* eslint-disable no-param-reassign */
import { collection, query, getDocs } from 'firebase/firestore'

import { PostCollectionType } from '../types'

import { firestore } from '@services/firebase'

import { getPrivateAddress } from '../post/getPrivateAddress'
import { updatePost } from '../post/updatePost'

const migratePostLocationAddressData = async (currentCollection: PostCollectionType) => { // Set Collection Name
	const docs: any = []

	const docsQuery = query(collection(firestore, currentCollection))

	const querySnapshot = await getDocs(docsQuery)
	querySnapshot.forEach((doc) => {
		docs.push({ postId: doc.id, ...doc.data() })
	})

	const docsWithLocation = await extractPrivateLocation(docs)

	docsWithLocation.map(async (doc: any, index: number) => {
		const docsWithoutId = { ...doc }
		delete docsWithoutId.postId
		delete docsWithoutId.location.postId
		delete docsWithoutId.location.postType
		delete docsWithoutId.location.locationView

		await updatePost(currentCollection, doc.postId, docsWithoutId)
			.then(() => console.log(`success: row(${index + 1})`))
			.catch((err: any) => {
				console.log(err)
			})
	})
}

const extractPrivateLocation = async (docs: any) => {
	const docsWithLocation = await docs.map(async (doc: any) => {
		const privateAddress = await getPrivateAddress(doc.postType, doc.postId)
		doc.location = { ...privateAddress }
		return doc
	})
	return Promise.all(docsWithLocation)
}

export { migratePostLocationAddressData }
