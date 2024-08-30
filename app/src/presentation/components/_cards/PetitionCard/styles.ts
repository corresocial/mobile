import { ImageBackground } from 'expo-image'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	hasPicture: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: 98%;
	height: ${({ hasPicture }) => (hasPicture ? relativeScreenDensity(225) : relativeScreenDensity(180))}px;
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
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.white[3]};
    border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(23)}px;
    position: absolute;
	overflow: hidden;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
`

export const Content = styled.View`
	flex: 1;
	justify-content: space-around;
	align-items: center;
	padding: ${relativeScreenDensity(15)}px ${relativeScreenDensity(15)}px 0px ${relativeScreenDensity(15)}px;
`

export const ImageArea = styled(ImageBackground)`
	flex: 1;
	justify-content: flex-end;
	border-color: ${({ theme }) => theme.colors.black[4]};
	border-top-width: ${relativeScreenDensity(3)}px;
`

export const ButtonContainer = styled.View`
	padding: ${relativeScreenDensity(15)}px;
	padding-top: 0px;
`

export const TitleContainer = styled.View`
	width: 100%;
	padding: 0px ${relativeScreenDensity(6)}px;
	overflow: hidden;
`

export const Title = styled.Text`
	text-align: left;
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[5]}px;
`
