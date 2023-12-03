import { UiUtilsInterface } from './UiUtilsInterface'

import { formatDate, formatHour, formatRelativeDate } from './common/date/dateFormat'
import { sortArray } from './sort/list'
import { sortPostCategories, sortPostsByCreatedData } from './sort/posts'
import { arrayIsEmpty } from './common/validation/validateArray'
import { textHasOnlyNumbers } from './common/validation/validateText'

function UiUtils(): UiUtilsInterface {
	return {
		textHasOnlyNumbers,
		formatDate,
		formatHour,
		formatRelativeDate,
		arrayIsEmpty,
		sortArray,
		sortPostCategories,
		sortPostsByCreatedData,
	}
}

export { UiUtils }
