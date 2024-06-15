import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const OptionsContainer = styled.ScrollView`
	flex: 1;
	width: 100%;
	padding: ${relativeScreenDensity(20)}px;
`

export const ButtonOptionsContainer = styled.View`
	width: 100%;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(20)}px;
	padding-bottom: ${relativeScreenDensity(30)}px;
	align-items: center;
`
