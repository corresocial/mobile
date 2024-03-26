import { MacroCategory, PostCollection } from '@domain/post/entity/types'

export interface UiPostUtilsInterface {
	sortPostCategories(a: MacroCategory, b: MacroCategory): number
	sortPostsByCreatedData(a: PostCollection, b: PostCollection): number
	mergeArrayPosts(posts: PostCollection[] | undefined, postDataToMerge: PostCollection): PostCollection[]
}
