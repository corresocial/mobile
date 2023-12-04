import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'
import { PostRange, SubscriptionPlan } from '../../services/firebase/types'

const getPostRangeLabelHiglighted = (postRange: PostRange) => {
	switch (postRange) {
		case 'near': return showMessageWithHighlight('plano região', ['região'])
		case 'city': return showMessageWithHighlight('plano cidade', ['cidade'])
		case 'country': return showMessageWithHighlight('plano país', ['país'])
		default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
	}
}

const getRangeSubscriptionLabelHighlighted = (postRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => {
	const subscriptionPlanText = getRelativeSubscriptionPlanText(subscriptionPlan)
	switch (postRange) {
		case 'near': return showMessageWithHighlight(`plano região${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['região', subscriptionPlanText])
		case 'city': return showMessageWithHighlight(`plano cidade${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['cidade', subscriptionPlanText])
		case 'country': return showMessageWithHighlight(`plano país${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['país', subscriptionPlanText])
		default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
	}
}

const getRelativeSubscriptionPlanText = (subscriptionPlan?: SubscriptionPlan) => {
	switch (subscriptionPlan) {
		case 'monthly': return 'mensal'
		case 'yearly': return 'anual'
		default: return ''
	}
}

export { getPostRangeLabelHiglighted, getRangeSubscriptionLabelHighlighted }
