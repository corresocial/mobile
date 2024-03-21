import { collection, query, getDocs } from 'firebase/firestore'

import { useUserRepository } from '@data/user/useUserRepository'

import { firestore } from '@services/firebase'

const { remoteUser } = useUserRepository()

const insertNewFieldOnUsers = async () => {
	const docs: any = []

	const usersQuery = query(collection(firestore, 'users'))

	const userSnapshot = await getDocs(usersQuery)
	userSnapshot.forEach((doc) => {
		docs.push({ userId: doc.id, ...doc.data() })
	})

	docs.map(async (currentUser: any) => {
		console.log(`\n\nanalisando... ${currentUser.userId} ------------------------------------------------------------------`)

		const createdAt = currentUser.updatedAt || new Date()

		await remoteUser.updateUserData(currentUser.userId, { createdAt })
			.then(() => console.log(`success userPosts: ${currentUser.userId}`))
			.catch((err: any) => {
				console.log(err)
			})

		return ''
	})
}

export { insertNewFieldOnUsers }
