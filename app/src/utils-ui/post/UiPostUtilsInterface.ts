import { MacroCategory, PostCollection } from '../../services/firebase/types'

export interface UiPostUtilsInterface {
	sortPostCategories(a: MacroCategory, b: MacroCategory): number
	sortPostsByCreatedData(a: PostCollection, b: PostCollection): number
	mergeArrayPosts(posts: PostCollection[] | undefined, postDataToMerge: PostCollection): PostCollection[]
}
