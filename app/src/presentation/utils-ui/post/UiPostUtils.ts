import { UiPostUtilsInterface } from './UiPostUtilsInterface'

import { mergeArrayPosts } from './mergeArrayPosts'
import { sortPostCategories, sortPostsByCreatedData } from './sort'

function UiPostUtils(): UiPostUtilsInterface {
	return {
		sortPostCategories,
		sortPostsByCreatedData,
		mergeArrayPosts
	}
}

export { UiPostUtils }
