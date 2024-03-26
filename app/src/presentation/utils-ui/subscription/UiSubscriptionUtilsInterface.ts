import React, { JSXElementConstructor, ReactElement } from 'react'

import { SubscriptionPlan } from '@domain/user/entity/types'

import { PostRange } from '@services/firebase/types'

export interface UiSubscriptionUtilsInterface {
	getPostRangeLabel(range: PostRange): string
	getPossessivePronounByRange(range: PostRange | undefined): string

	getPostRangeLabelHiglighted(postRange: PostRange): string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
	getRangeSubscriptionLabelHighlighted(postRange?: PostRange, subscriptionPlan?: SubscriptionPlan): React.ReactNode | string | ReactElement<any, string | JSXElementConstructor<any>>
}
