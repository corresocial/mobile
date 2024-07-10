import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { mediaUrlUpdatedDM } from '../core/mediaUrlUpdatedDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'
import { updateLocationDataOnPostsDM } from './updateLocationDataOnPostsDM'

type MediaUploaded = { picturesUrl: string[], videosUrl: string[] }

async function updatePostDM(
	usePostRepository: () => PostRepositoryInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	userPosts: PostEntity[],
	storedPostData: PostEntity,
	newPostData: PostEntity,
	unsavedPostPictures: string[],
	unsavedPostVideos: string[] // CURRENT inserir no fluxo
) {
	const { remoteStorage } = usePostRepository()

	const postLocationIsOutsideSubscriptionRange = await postLocationChangedDM(
		userSubscriptionRange,
		storedPostData,
		newPostData
	)

	let userPostsUpdated: PostEntity[] = []
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

	// Tratamento de imagens ^ ///////////////////////////////////////////////

	console.log(mediaUrlUpdatedDM(unsavedPostVideos) ? 'Vídeos atualizadas' : 'Vídeos não atualizadas')

	let newPostVideosUrl: string[] = unsavedPostVideos || []
	if (mediaUrlUpdatedDM(unsavedPostVideos)) {
		const videosNotUploaded = (unsavedPostVideos || []).filter((url: string) => !url.includes('https://')) || []
		const videosAlreadyUploaded = (unsavedPostVideos || []).filter((url: string) => url.includes('https://')) || []

		const uploadedVideosUrl = await remoteStorage.uploadPostMedias(videosNotUploaded, 'videos')
		newPostVideosUrl = [...videosAlreadyUploaded, ...uploadedVideosUrl] || []
	}

	// 	// Tratamento de videos  v ///////////////////////////////////////////////

	let postMediasUploaded = newPostPicturesUrl && newPostPicturesUrl.length ? { picturesUrl: newPostPicturesUrl || [] } : {} as MediaUploaded
	postMediasUploaded = newPostVideosUrl && newPostVideosUrl.length ? { videosUrl: newPostVideosUrl, ...postMediasUploaded } : {} as MediaUploaded

	const newPostWithUploadedMedia = {
		...newPostData,
		unapprovedData: { ...(newPostData.unapprovedData || {}), ...postMediasUploaded },
	} as PostEntity

	userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUneditedPostsDM(userPosts, newPostWithUploadedMedia)

	await remoteStorage.updatePostData(storedPostData.postId, newPostWithUploadedMedia)

	const newPostDesnormalized = convertPostToDesnormalizedPostDM(newPostWithUploadedMedia) // PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	return {
		updatedUserPosts: [...userPostsUpdated, newPostDesnormalized as PostEntity],
		...postMediasUploaded,
	}
}

export { updatePostDM }
