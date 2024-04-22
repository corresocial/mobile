import { MacroCategory, PostEntity } from '@domain/post/entity/types'

export interface UiPostUtilsInterface {
	sortPostCategories(a: MacroCategory, b: MacroCategory): number
	sortPostsByCreatedData(a: PostEntity, b: PostEntity): number
	mergeArrayPosts(posts: PostEntity[] | undefined, postDataToMerge: PostEntity): PostEntity[]
}
