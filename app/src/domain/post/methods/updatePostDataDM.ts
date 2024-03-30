import { UserSubscription } from '@domain/user/entity/types'

import { uploadPostPictures } from '@data/post/bucketStorage/uploadPostPictures'
import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { picturesUrlUpdatedDM } from '../core/editPostValidationDM'
import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'

async function updatePostDataDM(
	usePostRepository: () => PostRepositoryInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	userPosts: PostEntity[],
	storedPostData: PostEntity,
	newPostData: PostEntity,
	unsavedPostPictures: string[]
) {
	const { remoteStorage } = usePostRepository()

	const owner = { ...storedPostData.owner }

	const postLocationIsOutsideSubscriptionRange = await postLocationChangedDM(
		userSubscriptionRange,
		storedPostData,
		newPostData
	)

	let userPostsUpdated: PostEntity[] = []
	if (postLocationIsOutsideSubscriptionRange) {
		userPostsUpdated = await remoteStorage.updateRangeAndLocationOnPosts(
			owner,
			getUneditedPostsDM(userPosts, newPostData),
			{ range: newPostData.range, location: newPostData.location }
		)
	}

	// Tratamento de imagens ///////////////////////////////////////////////

	console.log(picturesUrlUpdatedDM(unsavedPostPictures) ? 'Fotos atualizadas' : 'Fotos não atualizadas')

	let newPostPicturesUrl: string[] = unsavedPostPictures || []
	if (picturesUrlUpdatedDM(unsavedPostPictures)) {
		const picturesNotUploaded = (unsavedPostPictures || []).filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = (unsavedPostPictures || []).filter((url: string) => url.includes('https://')) || []

		const uploadedPicturesUrl = await uploadPostPictures(picturesNotUploaded) // REFACTOR puxar da interface postRepository
		newPostPicturesUrl = [...picturesAlreadyUploaded, ...uploadedPicturesUrl] || []
	}

	const storedPicturesUrl = storedPostData.picturesUrl || []
	const picturesAlreadyUploadedToRemove = storedPicturesUrl.filter((pictureUrl) => unsavedPostPictures && !unsavedPostPictures.includes(pictureUrl))
	if (picturesAlreadyUploadedToRemove.length) {
		await remoteStorage.deletePostPictures(picturesAlreadyUploadedToRemove)
	}

	// Tratamento de imagens ^ ///////////////////////////////////////////////

	const newPostWithUploadedPictures = { ...newPostData, picturesUrl: newPostPicturesUrl }

	userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUneditedPostsDM(userPosts, newPostWithUploadedPictures)

	await remoteStorage.updatePostData(storedPostData.postId, newPostWithUploadedPictures)

	const newPostDesnormalized = convertPostToDesnormalizedPostDM(newPostWithUploadedPictures) // PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	return {
		updatedUserPosts: [...userPostsUpdated, newPostDesnormalized as PostEntity],
		picturesUrlUploaded: newPostPicturesUrl
	}
}

export { updatePostDataDM }
