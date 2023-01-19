import { doc, setDoc } from 'firebase/firestore'
import { getPostCollectionName } from '../common/dbAuxiliaryFunctions'
import { firestore } from '../index'
import { PostType } from '../types'

async function updateAllOwnerOnPosts(
	owner: {
		userId: string,
		name: string,
		profilePictureUrl: string[]
	},
	userPostIds: { postId: string, postType: PostType }[]
) {
	userPostIds.map(async (post) => {
		const ref = doc(firestore, getPostCollectionName(post.postType), post.postId)
		await setDoc(
			ref,
			{
				owner,
				// updatedAt: new Date(),
			},
			{ merge: true },
		)
	})
}

export { updateAllOwnerOnPosts }
