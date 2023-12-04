import { UiLocationUtilsInterface } from './UiLocationUtilsInterface'

import {
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getLocationViewLabel,
	generateLocationHeaderText
} from '.'
import { getPossessivePronounByRange, getPostRangeLabel } from '../post/commonMessages'

function UiLocationUtils(): UiLocationUtilsInterface {
	return {
		getPossessivePronounByRange,
		getPostRangeLabel,

		getLocationViewDescription,
		getLocationViewHighlightedWords,
		getLocationViewIcon,
		getLocationViewLabel,
		generateLocationHeaderText
	}
}

export { UiLocationUtils }
