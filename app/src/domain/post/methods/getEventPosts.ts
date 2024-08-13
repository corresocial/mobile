import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

async function getEventPosts(usePostRepository: () => PostRepositoryInterface, macroCategory: MacroCategoriesType, maxDocs: number, lastDoc: PostEntity | null, allPosts: boolean) {
	try {
		const { remoteStorage } = usePostRepository()

		return remoteStorage.getPostsByMacroCategory(macroCategory, maxDocs, lastDoc, allPosts)
	} catch (error) {
		console.log(error)
	}
	return []
}

export { getEventPosts }
