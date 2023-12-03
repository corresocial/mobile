import { MacroCategory, PostCollectionRemote } from '../../services/firebase/types'
import { getNewDate } from '../common/date/dateFormat'

const sortPostCategories = (a: MacroCategory, b: MacroCategory) => {
	if (a.label < b.label) return -1
	if (a.label > b.label) return 1
	return 0
}

const sortPostsByCreatedData = (a: PostCollectionRemote, b: PostCollectionRemote) => {
	const createdAtA = getNewDate(a.createdAt)
	const createdAtB = getNewDate(b.createdAt)

	if (createdAtA < createdAtB) return 1
	if (createdAtA > createdAtB) return -1
	return 0
}

export { sortPostCategories, sortPostsByCreatedData }
