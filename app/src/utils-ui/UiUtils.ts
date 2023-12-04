import { UiUtilsInterface } from './UiUtilsInterface'

import { formatDate, formatHour, formatRelativeDate } from './common/date/dateFormat'
import { sortArray } from './common/sort/list'
import { arrayIsEmpty } from './common/validation/validateArray'
import { textHasOnlyNumbers } from './common/validation/validateText'

function UiUtils(): UiUtilsInterface { // Use common methods
	return {
		textHasOnlyNumbers,
		formatDate,
		formatHour,
		formatRelativeDate,
		arrayIsEmpty,
		sortArray
	}
}

export { UiUtils }
