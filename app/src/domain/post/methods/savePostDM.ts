import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'
import { NotifyUsersByLocationParams } from '@services/cloudFunctions/types/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

import { mediaUrlUpdatedDM } from '../core/editPostValidationDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'
import { updateLocationDataOnPostsDM } from './updateLocationDataOnPostsDM'

async function savePostDM(
	usePostRepository: () => PostRepositoryInterface,
	useCloudFunctionService: () => CloudFunctionServiceInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'], // REFACTOR Validar internamente com nova consulta de user
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

	if (postLocationIsOutsideSubscriptionRange) {
		await updateLocationDataOnPostsDM(
			newPostData.owner.userId,
			{ range: newPostData.range, location: newPostData.location }
		)
	}

	// Tratamento de imagens ///////////////////////////////////////////////

	console.log(mediaUrlUpdatedDM(unsavedPostPictures) ? 'Fotos adicionadas' : 'Fotos não adicionadas')

	let newPostPicturesUrl: string[] = unsavedPostPictures || []
	if (mediaUrlUpdatedDM(unsavedPostPictures)) {
		const picturesNotUploaded = (unsavedPostPictures || []).filter((url: string) => !url.includes('https://')) || []
		const picturesAlreadyUploaded = (unsavedPostPictures || []).filter((url: string) => url.includes('https://')) || []

		const uploadedPicturesUrl = await remoteStorage.uploadPostMedias(picturesNotUploaded, 'pictures')
		newPostPicturesUrl = [...picturesAlreadyUploaded, ...uploadedPicturesUrl] || []
	}

	// Tratamento de imagens ^ ///////////////////////////////////////////////

	const postVideos = newPostData && newPostData.unapprovedData && newPostData.unapprovedData.videosUrl ? newPostData.unapprovedData.videosUrl : []
	console.log(mediaUrlUpdatedDM(postVideos) ? 'Videos atualizadas' : 'Videos não atualizadas')

	console.log(postVideos)

	let newPostVideosUrl: string[] = postVideos || []
	if (mediaUrlUpdatedDM(postVideos)) {
		const videosNotUploaded = (postVideos || []).filter((url: string) => !url.includes('https://')) || []
		const videosAlreadyUploaded = (postVideos || []).filter((url: string) => url.includes('https://')) || []

		const uploadedPicturesUrl = await remoteStorage.uploadPostMedias(videosNotUploaded, 'videos')
		newPostVideosUrl = [...videosAlreadyUploaded, ...uploadedPicturesUrl] || []
	}
	console.log('newPostVideosUrl')
	console.log(newPostVideosUrl)

	// Tratamento de videos ^ ///////////////////////////////////////////////

	const newPostWithUploadedPictures = {
		...newPostData,
		unapprovedData: { ...newPostData.unapprovedData, picturesUrl: newPostPicturesUrl, videosUrl: newPostVideosUrl }
	} as any

	if (newPostWithUploadedPictures?.unapprovedData) {
		if (Array.isArray(newPostWithUploadedPictures.unapprovedData.picturesUrl)) {
			delete newPostWithUploadedPictures?.unapprovedData.picturesUrl
		}

		if (Array.isArray(newPostWithUploadedPictures.unapprovedData.videosUrl)) {
			delete newPostWithUploadedPictures?.unapprovedData?.videosUrl
		}
	}

	const newStoredPost = await remoteStorage.createPost(newPostWithUploadedPictures as PostEntity)

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

	return { newPost: { ...newStoredPost } as PostEntity }
}

export { savePostDM }
