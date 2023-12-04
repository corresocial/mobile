import { UiLocationUtilsInterface } from './UiLocationUtilsInterface'

import {
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getLocationViewLabel,
	generateLocationHeaderText
} from './locationMessages'
import { getPossessivePronounByRange, getPostRangeLabel } from '../post/commonMessages'
import { getTextualAddress, structureAddress, structureExpoLocationAddress } from './addressFormatter'

function UiLocationUtils(): UiLocationUtilsInterface {
	return {
		getPossessivePronounByRange,
		getPostRangeLabel,

		structureAddress,
		structureExpoLocationAddress,
		getTextualAddress,

		getLocationViewDescription,
		getLocationViewHighlightedWords,
		getLocationViewIcon,
		getLocationViewLabel,
		generateLocationHeaderText
	}
}

export { UiLocationUtils }
