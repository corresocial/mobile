import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { mediaUrlUpdatedDM } from '../core/mediaUrlUpdatedDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'

async function updatePostDM(
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

	console.log(mediaUrlUpdatedDM(unsavedPostPictures) ? 'Fotos atualizadas' : 'Fotos não atualizadas')

	let newPostPicturesUrl: string[] = unsavedPostPictures || []
	if (mediaUrlUpdatedDM(unsavedPostPictures)) {
		const picturesNotUploaded = (unsavedPostPictures || []).filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = (unsavedPostPictures || []).filter((url: string) => url.includes('https://')) || []

		const uploadedPicturesUrl = await remoteStorage.uploadPostMedias(picturesNotUploaded, 'pictures')
		newPostPicturesUrl = [...picturesAlreadyUploaded, ...uploadedPicturesUrl] || []
	}

	const storedPicturesUrl = storedPostData.picturesUrl || []
	const picturesAlreadyUploadedToRemove = storedPicturesUrl.filter(
		(pictureUrl) => (unsavedPostPictures && !unsavedPostPictures.includes(pictureUrl))
			|| (newPostData.unapprovedData?.picturesUrl && !newPostData.unapprovedData?.picturesUrl.includes(pictureUrl))
	)
	console.log(picturesAlreadyUploadedToRemove)
	if (picturesAlreadyUploadedToRemove.length) {
		await remoteStorage.deletePostMedias(picturesAlreadyUploadedToRemove, 'pictures')
	}

	// Tratamento de imagens ^ ///////////////////////////////////////////////

	const postMediasUploaded = newPostPicturesUrl && newPostPicturesUrl.length ? { picturesUrl: newPostPicturesUrl || [] } : {}

	const newPostWithUploadedMedia = {
		...newPostData,
		unapprovedData: { ...(newPostData.unapprovedData || {}), ...postMediasUploaded },
		// videosUrl: newPostVideosUrl
	} as PostEntity

	userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUneditedPostsDM(userPosts, newPostWithUploadedMedia)

	await remoteStorage.updatePostData(storedPostData.postId, newPostWithUploadedMedia)

	const newPostDesnormalized = convertPostToDesnormalizedPostDM(newPostWithUploadedMedia) // PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	return {
		updatedUserPosts: [...userPostsUpdated, newPostDesnormalized as PostEntity],
		...postMediasUploaded,
		// videosUrlUploaded: newPostVideosUrl
	}
}

export { updatePostDM }
