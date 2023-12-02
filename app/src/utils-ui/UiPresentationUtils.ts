import { UiPresentationUtilsInterface } from './UiPresentationUtilsInterface'

import { getPostRangeLabel, getPossessivePronounByRange } from './labels/commonMessages'
import {
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getLocationViewLabel,
	generateLocationHeaderText
} from './labels/locationMessages'
import { getPostRangeLabelHiglighted, getRangeSubscriptionLabelHighlighted } from './labels/subscriptionMessages'

function UiPresentationUtils(): UiPresentationUtilsInterface {
	return {
		getPostRangeLabel,
		getPossessivePronounByRange,

		getLocationViewDescription,
		getLocationViewHighlightedWords,
		getLocationViewIcon,
		getLocationViewLabel,
		generateLocationHeaderText,

		getPostRangeLabelHiglighted,
		getRangeSubscriptionLabelHighlighted
	}
}

export { UiPresentationUtils }
