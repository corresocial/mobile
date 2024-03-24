import * as Location from 'expo-location'
import React from 'react'
import { SvgProps } from 'react-native-svg'

import { CompleteAddress, LocationViewType, PostCollectionCommonFields, PostRange } from '@services/firebase/types'
import { GeocodeAddress } from '@services/googleMaps/types/types'

export interface UiLocationUtilsInterface {
	getPostRangeLabel(range: PostRange): string
	getPossessivePronounByRange(range: PostRange | undefined): string

	structureAddress(geocodeAddress: GeocodeAddress, latitude?: number, longitude?: number): CompleteAddress
	structureExpoLocationAddress(geocodeAddress: Location.LocationGeocodedAddress[], latitude?: number, longitude?: number): CompleteAddress
	getTextualAddress(address: PostCollectionCommonFields['location']): string

	getLocationViewDescription(locationView: LocationViewType, error?: boolean, customErrorMessage?: string): string
	getLocationViewHighlightedWords(locationView: LocationViewType, error?: boolean, customErrorHighlight?: string[]): string[]
	getLocationViewIcon(locationView: LocationViewType): React.FC<SvgProps>
	getLocationViewLabel(locationView: LocationViewType): string
	generateLocationHeaderText(locationView: LocationViewType, range: PostRange | undefined): string
}
