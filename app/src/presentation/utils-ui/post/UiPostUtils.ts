import { mergeArrayPosts } from './mergeArrayPosts'
import { sortPostCategories, sortPostsByCreatedData } from './sort'
import { UiPostUtilsInterface } from './UiPostUtilsInterface'

function UiPostUtils(): UiPostUtilsInterface {
	return {
		sortPostCategories,
		sortPostsByCreatedData,
		mergeArrayPosts
	}
}

export { UiPostUtils }
