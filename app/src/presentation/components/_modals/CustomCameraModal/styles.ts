import styled from 'styled-components/native'

import { relativeScreenWidth, screenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    padding: 50px 0px;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.black4};
`

export const CameraContainer = styled.View`
    width: ${screenWidth}px;
    height: ${screenWidth}px;
`

export const FlashButtonContainer = styled.View`
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: ${relativeScreenWidth(48)}px;
`

interface ContainerIconProps {
	opacity?: number
}

export const ContainerIcon = styled.TouchableOpacity<ContainerIconProps>`
	opacity: ${({ opacity }) => opacity || 1};
	min-width: 35px;
	min-height: 35px;
	width: ${relativeScreenWidth(12)}px;
	height: ${relativeScreenWidth(12)}px;
	background-color: ${({ theme }) => theme.black4};
    align-items: center;
    justify-content: center;
`

export const Body = styled.View`
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: ${relativeScreenWidth(25)}px;
`

export const Footer = styled.View`
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: center;
    position: absolute;
	bottom: ${relativeScreenWidth(2)}px;
`

export const CameraControlsContainer = styled.View`
    width: 70%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const NotPermissionContainer = styled.TouchableOpacity`
    flex: 1;
    align-Items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.black4};
    padding: 28px;
`

export const NotPermissionText = styled.Text`
   color:  ${({ theme }) => theme.white1};
   font-size: 17px; // REFACTOR relative
   text-align: center;
   margin-top: 20px;
   margin-bottom: 20px;
`
