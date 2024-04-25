import { convertTextToNumber } from './convertion'
import { compressImage } from './convertion/compressImage'
// import { generateVideoThumbnails } from './convertion/generateVideoThumbnail'
import { formatDate, formatHour, formatRelativeDate } from './date/dateFormat'
import { sortArray } from './sort/list'
import { UiUtilsInterface } from './UiUtilsInterface'
import { arrayIsEmpty } from './validation/validateArray'
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
		// generateVideoThumbnails,
		compressImage

	}
}

export { UiUtils }
