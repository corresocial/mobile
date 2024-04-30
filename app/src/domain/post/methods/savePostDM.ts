import { UserSubscription } from '@domain/user/entity/types'

import { uploadPostPictures } from '@data/post/bucketStorage/uploadPostPictures' // REFACTOR puxar da interface postRepository
import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'
import { NotifyUsersByLocationParams } from '@services/cloudFunctions/types/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

import { convertPostToDesnormalizedPostDM } from '../core/convertPostToDesnormalizedPostDM'
import { picturesUrlUpdatedDM } from '../core/editPostValidationDM'
import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'

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

		const uploadedPicturesUrl = await uploadPostPictures(picturesNotUploaded)
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

	const newStoredPost = await remoteStorage.createPost(newPostWithUploadedPictures)

	if (notifyUsersByLocation) {
		await notifyUsersOnLocation({
			state: newPostData.location.state as string,
			city: newPostData.location.city as string,
			district: newPostData.location.district as string,
			postRange: newPostData.range as NotifyUsersByLocationParams['postRange']
		}, {
			postDescription: newPostData.description,
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
