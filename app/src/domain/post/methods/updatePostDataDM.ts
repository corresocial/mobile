import { UserSubscription } from '@domain/user/entity/types'

import { uploadPostMedia } from '@data/post/bucketStorage/uploadPostMedia' // REFACTOR puxar da interface postRepository
import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { mediaUrlUpdatedDM } from '../core/mediaUrlUpdatedDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'

async function updatePostDataDM(
	usePostRepository: () => PostRepositoryInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	userPosts: PostEntity[],
	storedPostData: PostEntity,
	newPostData: PostEntity,
	unsavedPostPictures: string[],
	unsavedPostVideos: string[]
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

		const uploadedPicturesUrl = await uploadPostMedia(picturesNotUploaded, 'pictures')
		newPostPicturesUrl = [...picturesAlreadyUploaded, ...uploadedPicturesUrl] || []
	}

	const storedPicturesUrl = storedPostData.picturesUrl || []
	const picturesAlreadyUploadedToRemove = storedPicturesUrl.filter((pictureUrl) => unsavedPostPictures && !unsavedPostPictures.includes(pictureUrl))
	if (picturesAlreadyUploadedToRemove.length) {
		await remoteStorage.deletePostPictures(picturesAlreadyUploadedToRemove)
	}

	// Tratamento de imagens ^ ///////////////////////////////////////////////

	// Tratamento de videos  v ///////////////////////////////////////////////

	console.log(mediaUrlUpdatedDM(unsavedPostVideos) ? 'Videos atualizadas' : 'Videos não atualizadas')

	let newPostVideosUrl: string[] = unsavedPostVideos || []
	if (mediaUrlUpdatedDM(unsavedPostVideos)) {
		const picturesNotUploaded = (unsavedPostVideos || []).filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = (unsavedPostVideos || []).filter((url: string) => url.includes('https://')) || []

		const uploadedPicturesUrl = await uploadPostMedia(picturesNotUploaded, 'videos')
		newPostVideosUrl = [...picturesAlreadyUploaded, ...uploadedPicturesUrl] || []
	}

	const storedVideosUrl = storedPostData.videosUrl || []
	const AlreadyUploadedToRemove = storedVideosUrl.filter((videoUrl) => unsavedPostVideos && !unsavedPostVideos.includes(videoUrl))
	if (AlreadyUploadedToRemove.length) {
		await remoteStorage.deletePostPictures(AlreadyUploadedToRemove)
	}

	// Tratamento de videos ^ ///////////////////////////////////////////////

	const newPostWithUploadedMedia = { 
		...newPostData, 
		picturesUrl: newPostPicturesUrl,
		videosUrl: newPostVideosUrl
	}

	userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUneditedPostsDM(userPosts, newPostWithUploadedMedia)

	await remoteStorage.updatePostData(storedPostData.postId, newPostWithUploadedMedia)

	const newPostDesnormalized = convertPostToDesnormalizedPostDM(newPostWithUploadedMedia) // PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	return {
		updatedUserPosts: [...userPostsUpdated, newPostDesnormalized as PostEntity],
		picturesUrlUploaded: newPostPicturesUrl,
		videosUrlUploaded: newPostVideosUrl
	}
}

export { updatePostDataDM }
