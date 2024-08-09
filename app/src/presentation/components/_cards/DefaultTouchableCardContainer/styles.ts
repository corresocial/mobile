import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	flex?: number
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	background-color: ${({ theme }) => theme.colors.black[4]};
	border-radius: ${relativeScreenDensity(17.5)}px;
	width: 98%;
	align-self: flex-end;
	position: relative;
`

interface ContainerInnerProps {
	pressionable?: boolean
	buttonPressed: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	background-color: ${({ theme }) => theme.colors.white[3]};
	border-radius: ${relativeScreenDensity(18)}px;
	border: ${relativeScreenDensity(2.2)}px solid black;
	position: relative;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.small}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.small}px;
`
