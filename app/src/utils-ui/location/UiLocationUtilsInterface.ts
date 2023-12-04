import React from 'react'
import { SvgProps } from 'react-native-svg'

import { LocationViewType, PostRange } from '../../services/firebase/types'

export interface UiLocationUtilsInterface {
	getPostRangeLabel(range: PostRange): string
	getPossessivePronounByRange(range: PostRange | undefined): string

	getLocationViewDescription(locationView: LocationViewType, error?: boolean, customErrorMessage?: string): string
	getLocationViewHighlightedWords(locationView: LocationViewType, error?: boolean, customErrorHighlight?: string[]): string[]
	getLocationViewIcon(locationView: LocationViewType): React.FC<SvgProps>
	getLocationViewLabel(locationView: LocationViewType): string
	generateLocationHeaderText(locationView: LocationViewType, range: PostRange | undefined): string
}
