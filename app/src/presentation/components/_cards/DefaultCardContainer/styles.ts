import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.black4};
	border: ${relativeScreenDensity(2.5)}px solid black;
	border-right-width: ${relativeScreenDensity(7.5)}px;
	border-radius: ${relativeScreenDensity(17.5)}px;
	overflow: hidden;
`

export const ContainerInner = styled.View`
	background-color: ${({ theme }) => theme.white3};
	border-radius: ${relativeScreenDensity(15)}px;
`
