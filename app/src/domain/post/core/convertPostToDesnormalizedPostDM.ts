import { PostEntity, PostEntityOptional } from '../entity/types'

function convertPostToDesnormalizedPostDM(newPostData: PostEntityOptional | any): PostEntity {
	const filteredPostData = { ...newPostData }

	delete filteredPostData.owner
	if (filteredPostData.location) {
		delete filteredPostData.location.geohashNearby
		delete filteredPostData.location.geohashCity
	}

	return newPostData
}

export { convertPostToDesnormalizedPostDM }
