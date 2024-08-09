import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenHeight(15)}px;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(22)}px;
    position: relative;
	overflow: visible;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

interface ContainerSurfaceProps {
	buttonPressed: boolean
}

export const ContainerInner = styled.View<ContainerSurfaceProps>`
	width: 100%;
    height: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
    border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(22)}px;
    position: absolute;
	overflow: hidden;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
`

export const UserInfo = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: ${relativeScreenHeight(1.3)}px;
`

export const LastMessageArea = styled.View`
	width: 100%;
	padding: ${relativeScreenHeight(2)}px;
`
