import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	border-left-width: ${relativeScreenDensity(2.5)}px;
	padding: 0px ${relativeScreenDensity(6)}px;
	overflow: hidden;
`

export const Text = styled.Text`
	font-family: 'Arvo_400Regular';
`
