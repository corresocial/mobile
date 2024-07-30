import { UserOwner } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

async function updateOwnerDataOnPostsDM(
	usePostRepository: () => PostRepositoryInterface,
	ownerData: Partial<UserOwner>
) {
	try {
		const { remoteStorage } = usePostRepository()

		if (!ownerData?.userId) throw new Error('Id de usuário inválido')

		const postIds = await remoteStorage.getPostIdsByUser(ownerData.userId)
		await remoteStorage.updateOwnerDataOnPosts(ownerData, postIds || [])
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { updateOwnerDataOnPostsDM }
