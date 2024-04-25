import { convertTextToNumber } from './convertion'
import { formatDate, formatHour, formatRelativeDate } from './date/dateFormat'
import { sortArray } from './sort/list'
import { UiUtilsInterface } from './UiUtilsInterface'
import { arrayIsEmpty } from './validation/validateArray'
import { validateCPF } from './validation/validateCPF'
import { validateRG } from './validation/validateRG'
import { textHasOnlyNumbers } from './validation/validateText'

function UiUtils(): UiUtilsInterface {
	return {
		textHasOnlyNumbers,
		convertTextToNumber,
		formatDate,
		formatHour,
		formatRelativeDate,
		arrayIsEmpty,
		sortArray,
		validateRG,
		validateCPF
	}
}

export { UiUtils }
