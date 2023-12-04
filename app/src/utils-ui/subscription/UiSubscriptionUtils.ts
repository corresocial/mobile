import { UiSubscriptionUtilsInterface } from './UiSubscriptionUtilsInterface'

import { getPostRangeLabelHiglighted, getRangeSubscriptionLabelHighlighted } from '.'
import { getPossessivePronounByRange, getPostRangeLabel } from '../post/commonMessages'

function UiSubscriptionUtils(): UiSubscriptionUtilsInterface {
	return {
		getPostRangeLabel,
		getPossessivePronounByRange,

		getPostRangeLabelHiglighted,
		getRangeSubscriptionLabelHighlighted
	}
}

export { UiSubscriptionUtils }
