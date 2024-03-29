import { UserSubscription } from '@domain/user/entity/types'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity, PostEntityOptional } from '../entity/types'

import { getUneditedPostsDM } from '../core/getUneditedPostsDM'
import { postLocationChangedDM } from '../core/postLocationChangedDM'

async function updatePostDataDM(
	usePostRepository: () => PostRepositoryInterface,
	userSubscriptionRange: UserSubscription['subscriptionRange'],
	userPosts: PostEntity[],
	storedPostData: PostEntity,
	newPostData: PostEntity
) {
	const allPicturesAlreadyUploaded = () => {
		const postPictures = newPostData.picturesUrl || []
		// editDataContext.unsaved foi substituido por newPostData
		return postPictures.filter((url: string) => url.includes('https://')).length === postPictures.length
	}

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

	userPostsUpdated = userPostsUpdated && userPostsUpdated.length ? userPostsUpdated : getUneditedPostsDM(userPosts, newPostData)

	if ((newPostData.picturesUrl && newPostData.picturesUrl.length > 0) && !allPicturesAlreadyUploaded()) {
		console.log('Fotos atualizadas')
		// await performPicturesUpload(userPostsUpdated)
		return [...userPostsUpdated, newPostData]
	}

	console.log('Fotos não atualizadas')

	const registredPicturesUrl = storedPostData.picturesUrl || []
	const picturesAlreadyUploadedToRemove = registredPicturesUrl.filter((pictureUrl) => newPostData.picturesUrl && !newPostData.picturesUrl.includes(pictureUrl))

	if (picturesAlreadyUploadedToRemove.length) {
		await remoteStorage.deletePostPictures(picturesAlreadyUploadedToRemove)
	}

	await remoteStorage.updatePostData(storedPostData.postId, newPostData)

	// PROCESSOS QUE DEVEM SER FEITOS ANTES DE RETORNAR PARA SALVAR NA COLLECTION DE USUÁRIOS

	const newPostDesnormalized = convertPostToDesnormalizedPost(newPostData)

	/* delete newPostData.owner // REFACTOR
	if (newPostData.location) {
		delete newPostData.location.geohashNearby
		delete newPostData.location.geohashCity
	} */

	return [...userPostsUpdated, newPostDesnormalized] // Array de post to userREpository
}

// Tipagem de geohash temporária. Utilizada somente para remover a propriedade geohashNearby da base de dados
function convertPostToDesnormalizedPost(newPostData: PostEntityOptional | any): PostEntityOptional {
	const filteredPostData = { ...newPostData }

	delete filteredPostData.owner
	if (filteredPostData.location) {
		delete filteredPostData.location.geohashNearby
		delete filteredPostData.location.geohashCity
	}

	return newPostData
}

export { updatePostDataDM }
