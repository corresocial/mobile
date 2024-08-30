import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	height: ${relativeScreenHeight(16)}px;
`

export const SubscriptionAdContainer = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
	padding-bottom: ${relativeScreenDensity(10)}px;
`
