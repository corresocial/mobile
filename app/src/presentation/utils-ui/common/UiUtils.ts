import { convertTextToNumber } from './convertion'
import { compressImage } from './convertion/compressImage'
import { compressVideo } from './convertion/compressVideo'
import { generateVideoThumbnails } from './convertion/generateVideoThumbnail'
import { formatDate, formatHour, formatRelativeDate, getNewDate } from './date/dateFormat'
import { checkMediaType } from './media/checkMediaType'
// import { generateVideoThumbnails } from './convertion/generateVideoThumbnail'
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
		getNewDate,
		formatDate,
		formatHour,
		formatRelativeDate,
		arrayIsEmpty,
		sortArray,
		generateVideoThumbnails,
		checkMediaType,
		compressImage,
		compressVideo,

		validateRG,
		validateCPF
	}
}

export { UiUtils }
