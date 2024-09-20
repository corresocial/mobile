import { ImageBackground } from 'expo-image'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenDensity(100)}px;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(23)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

interface ContainerSurfaceProps {
	buttonPressed: boolean
}

export const ContainerInner = styled.View<ContainerSurfaceProps>`
	width: 100%;
    height: 100%;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.white[3]};
    border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(23)}px;
    position: absolute;
	overflow: hidden;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
`

export const LeftArea = styled.View`
	background-color: ${({ theme }) => theme.colors.orange[1]};
	height: 100%;
	flex: 1;
	overflow: hidden;
`

export const SidePicture = styled(ImageBackground)`
	width: 100%;
	height: 100%;
	align-items: center;
	flex: 1;
`

export const UserName = styled.Text`
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[5]}px;
`

export const DescriptionContainer = styled.View`
	border-left-width: ${relativeScreenDensity(2.5)}px;
	padding: 0px ${relativeScreenDensity(6)}px;
	overflow: hidden;
	border-color: ${({ theme }) => theme.colors.black[4]};
`

export const UserDescription = styled.Text`
	font-family: 'Arvo_400Regular';
	font-size: ${({ theme }) => theme.fontSizes[3]}px;
`

export const RightArea = styled.View`
	width: 70%;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenDensity(7)}px ${relativeScreenDensity(7)}px;
`

export const RightAreaLimits = styled.View`
	flex: 1;
	justify-content: space-around;
	overflow: hidden;
`
export const WaitingApproveIconContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-end;
	padding: ${relativeScreenDensity(5)}px 0px;
`
