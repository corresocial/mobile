import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { mediaUrlUpdatedDM } from '../core/mediaUrlUpdatedDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'
import { updateLocationDataOnPostsDM } from './updateLocationDataOnPostsDM'

async function updatePostDM(
	usePostRepository: () => PostRepositoryInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	storedPostData: PostEntity,
	newPostData: PostEntity,
	unsavedPostPictures: string[],
	unsavedPostVideos: string[]
) {
	const { remoteStorage } = usePostRepository()

	const postLocationIsOutsideSubscriptionRange = await postLocationChangedDM(
		userSubscriptionRange,
		storedPostData,
		newPostData
	)

	if (postLocationIsOutsideSubscriptionRange) {
		await updateLocationDataOnPostsDM(
			storedPostData.owner.userId,
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

	// 	// Tratamento de videos  ///////////////////////////////////////////////

	console.log(mediaUrlUpdatedDM(unsavedPostVideos) ? 'Vídeos atualizadas' : 'Vídeos não atualizadas')

	let newPostVideosUrl: string[] = unsavedPostVideos || []
	if (mediaUrlUpdatedDM(unsavedPostVideos)) {
		const videosNotUploaded = (unsavedPostVideos || []).filter((url: string) => !url.includes('https://')) || []
		const videosAlreadyUploaded = (unsavedPostVideos || []).filter((url: string) => url.includes('https://')) || []

		const uploadedVideosUrl = await remoteStorage.uploadPostMedias(videosNotUploaded, 'videos')
		newPostVideosUrl = [...videosAlreadyUploaded, ...uploadedVideosUrl] || []
	}

	/// ////

	const postMediasUploaded = {
		picturesUrl: newPostPicturesUrl && newPostPicturesUrl.length ? newPostPicturesUrl : [],
		videosUrl: newPostVideosUrl && newPostVideosUrl.length ? newPostVideosUrl : []
	}

	const newPostWithUploadedMedia = {
		...newPostData,
		unapprovedData: { ...(newPostData.unapprovedData || {}), ...postMediasUploaded },
	} as PostEntity

	await remoteStorage.updatePostData(storedPostData.postId, newPostWithUploadedMedia)

	const newPostDesnormalized = convertPostToDesnormalizedPostDM(newPostWithUploadedMedia) // PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	return {
		newPost: newPostDesnormalized,
		...postMediasUploaded,
	}
}

export { updatePostDM }
