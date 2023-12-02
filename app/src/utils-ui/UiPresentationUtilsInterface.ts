import React, { JSXElementConstructor, ReactElement } from 'react'

import { SvgProps } from 'react-native-svg'
import { LocationViewType, PostRange, SubscriptionPlan } from '../services/firebase/types'

export interface UiPresentationUtilsInterface {
	getPostRangeLabel(range: PostRange): string
	getPossessivePronounByRange(range: PostRange | undefined): string

	getLocationViewDescription(locationView: LocationViewType, error?: boolean, customErrorMessage?: string): string
	getLocationViewHighlightedWords(locationView: LocationViewType, error?: boolean, customErrorHighlight?: string[]): string[]
	getLocationViewIcon(locationView: LocationViewType): React.FC<SvgProps>
	getLocationViewLabel(locationView: LocationViewType): string
	generateLocationHeaderText(locationView: LocationViewType, range: PostRange | undefined): string

	getPostRangeLabelHiglighted(postRange: PostRange): string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
	getRangeSubscriptionLabelHighlighted(postRange?: PostRange, subscriptionPlan?: SubscriptionPlan): React.ReactNode | string | ReactElement<any, string | JSXElementConstructor<any>>
}
