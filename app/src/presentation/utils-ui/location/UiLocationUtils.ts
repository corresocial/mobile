import { getPossessivePronounByRange, getPostRangeLabel } from '../post/commonMessages'
import { getTextualAddress, structureAddress, structureExpoLocationAddress } from './addressFormatter'
import {
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getLocationViewLabel,
	generateLocationHeaderText
} from './locationMessages'
import { UiLocationUtilsInterface } from './UiLocationUtilsInterface'

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
