import React, { JSXElementConstructor, ReactElement } from 'react'

import { PostRange, SubscriptionPlan } from '../../services/firebase/types'

export interface UiSubscriptionUtilsInterface {
	getPostRangeLabel(range: PostRange): string
	getPossessivePronounByRange(range: PostRange | undefined): string

	getPostRangeLabelHiglighted(postRange: PostRange): string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
	getRangeSubscriptionLabelHighlighted(postRange?: PostRange, subscriptionPlan?: SubscriptionPlan): React.ReactNode | string | ReactElement<any, string | JSXElementConstructor<any>>
}
