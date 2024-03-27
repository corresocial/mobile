import { MacroCategory, PostEntity } from '@domain/post/entity/types'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

const sortPostCategories = (a: MacroCategory, b: MacroCategory) => {
	if (a.label < b.label) return -1
	if (a.label > b.label) return 1
	return 0
}

const sortPostsByCreatedData = (a: PostEntity, b: PostEntity) => {
	const createdAtA = getNewDate(a.createdAt)
	const createdAtB = getNewDate(b.createdAt)

	if (createdAtA < createdAtB) return 1
	if (createdAtA > createdAtB) return -1
	return 0
}

export { sortPostCategories, sortPostsByCreatedData }
