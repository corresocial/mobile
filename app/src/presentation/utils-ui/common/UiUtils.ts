import { UiUtilsInterface } from './UiUtilsInterface'

import { formatDate, formatHour, formatRelativeDate } from './date/dateFormat'
import { sortArray } from './sort/list'
import { arrayIsEmpty } from './validation/validateArray'
import { textHasOnlyNumbers } from './validation/validateText'

function UiUtils(): UiUtilsInterface {
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
