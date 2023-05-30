import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'
import { PostRange, SubscriptionPlan } from '../../services/firebase/types'

const getRangeText = (postRange: PostRange) => {
	switch (postRange) {
		case 'near': return 'região'
		case 'city': return 'cidade'
		case 'country': return 'brasil'
		default: return 'indefinido'
	}
}

const getRangePlanText = (postRange: PostRange) => {
	switch (postRange) {
		case 'near': return showMessageWithHighlight('plano região', ['região'])
		case 'city': return showMessageWithHighlight('plano cidade', ['cidade'])
		case 'country': return showMessageWithHighlight('plano país', ['país'])
		default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
	}
}

const getRangeSubscriptionPlanText = (postRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => {
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

export { getRangeText, getRangePlanText, getRangeSubscriptionPlanText }
