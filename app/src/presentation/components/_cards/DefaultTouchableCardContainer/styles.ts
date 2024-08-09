import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	flex?: number
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	background-color: ${({ theme }) => theme.black4};
	border-radius: ${relativeScreenDensity(17.5)}px;
	width: 98%;
	alignSelf: flex-end;
	position: relative;
`

interface ContainerInnerProps {
	pressionable?: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	background-color: ${({ theme }) => theme.white3};
	border-radius: ${relativeScreenDensity(18)}px;
	border: ${relativeScreenDensity(2.5)}px solid black;
	right: ${relativeScreenDensity(5)}px;
	position: relative;
`
