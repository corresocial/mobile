import { getPostRangeLabelHiglighted, getRangeSubscriptionLabelHighlighted } from '.'
import { getPossessivePronounByRange, getPostRangeLabel } from '../post/commonMessages'
import { UiSubscriptionUtilsInterface } from './UiSubscriptionUtilsInterface'

function UiSubscriptionUtils(): UiSubscriptionUtilsInterface {
	return {
		getPostRangeLabel,
		getPossessivePronounByRange,

		getPostRangeLabelHiglighted,
		getRangeSubscriptionLabelHighlighted
	}
}

export { UiSubscriptionUtils }
