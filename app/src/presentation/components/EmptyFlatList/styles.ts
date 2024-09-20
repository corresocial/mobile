import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: ${relativeScreenDensity(20)}px;
`

export const Message = styled.Text`
	font-family: 'Arvo_700Bold';
	text-align: center;
`
