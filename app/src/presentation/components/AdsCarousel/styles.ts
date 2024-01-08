import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
	height: ${relativeScreenHeight(16)}px;
`

export const SubscriptionAdContainer = styled.View`
	padding-horizontal: ${RFValue(10)}px;
	padding-bottom: ${RFValue(10)}px;
`
