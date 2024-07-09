import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'
import { NotifyUsersByLocationParams } from '@services/cloudFunctions/types/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { mediaUrlUpdatedDM } from '../core/editPostValidationDM'
import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'
import { updateLocationDataOnPostsDM } from './updateLocationDataOnPostsDM'

async function savePostDM(
	usePostRepository: () => PostRepositoryInterface,
	useCloudFunctionService: () => CloudFunctionServiceInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	userPosts: PostEntity[],
	storedPostData: PostEntity,
	newPostData: PostEntity,
	unsavedPostPictures: string[],
	notifyUsersByLocation?: boolean
) {
	const { notifyUsersOnLocation } = useCloudFunctionService()
	const { remoteStorage } = usePostRepository()

	const owner = { ...newPostData.owner }

	const postLocationIsOutsideSubscriptionRange = await postLocationChangedDM(
		userSubscriptionRange,
		storedPostData,
		newPostData
	)

	let userPostsUpdated: PostEntity[] = []
	if (postLocationIsOutsideSubscriptionRange) {
		await updateLocationDataOnPostsDM(
			newPostData.owner.userId,
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

	// const storedPicturesUrl = storedPostData.picturesUrl || []
	// const picturesAlreadyUploadedToRemove = storedPicturesUrl.filter((pictureUrl) => unsavedPostPictures && !unsavedPostPictures.includes(pictureUrl))
	// if (picturesAlreadyUploadedToRemove.length) {
	// 	await remoteStorage.deletePostMedias(picturesAlreadyUploadedToRemove, 'pictures')
	// }

	// Tratamento de imagens ^ ///////////////////////////////////////////////

	const postVideos = newPostData && newPostData.videosUrl ? newPostData.videosUrl : []
	console.log(mediaUrlUpdatedDM(postVideos) ? 'Videos atualizadas' : 'Videos não atualizadas')

	let newPostVideosUrl: string[] = postVideos || []
	if (mediaUrlUpdatedDM(postVideos)) {
		const picturesNotUploaded = (postVideos || []).filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = (postVideos || []).filter((url: string) => url.includes('https://')) || []

		const uploadedPicturesUrl = await remoteStorage.uploadPostMedias(picturesNotUploaded, 'videos')
		newPostVideosUrl = [...picturesAlreadyUploaded, ...uploadedPicturesUrl] || []
	}

	const storedVideosUrl = storedPostData.videosUrl || []
	const videosAlreadyUploadedToRemove = storedVideosUrl.filter((videoUrl) => postVideos && !postVideos.includes(videoUrl))
	if (videosAlreadyUploadedToRemove.length) {
		await remoteStorage.deletePostMedias(videosAlreadyUploadedToRemove, 'videos')
	}

	// Tratamento de videos ^ ///////////////////////////////////////////////

	const newPostWithUploadedPictures = { ...newPostData, picturesUrl: newPostPicturesUrl, videosUrl: newPostVideosUrl } as PostEntity

	userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUneditedPostsDM(userPosts, newPostWithUploadedPictures)

	const newStoredPost = await remoteStorage.createPost(newPostWithUploadedPictures)

	if (notifyUsersByLocation) {
		await notifyUsersOnLocation({
			state: newPostData.unapprovedData?.location?.state as string,
			city: newPostData.unapprovedData?.location?.city as string,
			district: newPostData.unapprovedData?.location?.district as string,
			postRange: newPostData.unapprovedData?.range as NotifyUsersByLocationParams['postRange']
		}, {
			postDescription: newPostData.unapprovedData?.description || 'Nova postagem',
			userId: owner.userId,
			userName: owner.name
		})
	}

	const newPostDesnormalized = convertPostToDesnormalizedPostDM(newStoredPost) // PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	return {
		newPost: { ...newPostDesnormalized } as PostEntity,
		updatedUserPosts: [...userPostsUpdated, { ...newPostDesnormalized } as PostEntity],
		picturesUrlUploaded: newPostPicturesUrl
	}
}

export { savePostDM }
