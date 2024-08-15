import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	border-left-width: ${relativeScreenDensity(5)}px;
	padding: 0px ${relativeScreenDensity(15)}px;
	justify-content: center;
`

export const Description = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`
