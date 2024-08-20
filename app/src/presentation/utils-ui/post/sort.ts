import { PostEntity } from '@domain/post/entity/types'

import { MacroCategoryObject } from '@utils/postMacroCategories/types'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

const sortPostCategories = (a: MacroCategoryObject, b: MacroCategoryObject) => {
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

const sortPostsByStartData = (a: PostEntity, b: PostEntity) => {
	const createdAtA = getNewDate(a.startDate || a.createdAt)
	const createdAtB = getNewDate(b.startDate || b.createdAt)

	if (createdAtA < createdAtB) return 1
	if (createdAtA > createdAtB) return -1
	return 0
}

export { sortPostCategories, sortPostsByCreatedData, sortPostsByStartData }
