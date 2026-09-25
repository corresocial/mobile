import { Image } from 'expo-image'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

import { CropSize } from './cropGeometry'

const SHADE_COLOR = 'rgba(0, 0, 0, 0.6)'

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.black[4]};
`

export const SafeAreaContainer = styled(SafeAreaView)`
	flex: 1;
`

export const Header = styled.View`
	width: 100%;
	align-items: center;
	justify-content: center;
	padding: ${relativeScreenDensity(20)}px ${relativeScreenWidth(7)}px;
`

export const HeaderText = styled.Text`
	color: ${({ theme }) => theme.colors.white[3]};
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	text-align: center;
`

export const CropArea = styled.View`
	flex: 1;
	width: 100%;
	overflow: hidden;
`

export const CenteredContent = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 0px ${relativeScreenWidth(10)}px;
`

export const ErrorText = styled.Text`
	color: ${({ theme }) => theme.colors.white[3]};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	text-align: center;
`

interface CropOverlayProps {
	areaSize: CropSize
	cropSize: CropSize
}

export const CropOverlay = styled.View<CropOverlayProps>`
	width: ${({ areaSize }) => areaSize.width}px;
	height: ${({ areaSize }) => areaSize.height}px;
	border-color: ${SHADE_COLOR};
	border-left-width: ${({ areaSize, cropSize }) => Math.max(0, (areaSize.width - cropSize.width) / 2)}px;
	border-right-width: ${({ areaSize, cropSize }) => Math.max(0, (areaSize.width - cropSize.width) / 2)}px;
	border-top-width: ${({ areaSize, cropSize }) => Math.max(0, (areaSize.height - cropSize.height) / 2)}px;
	border-bottom-width: ${({ areaSize, cropSize }) => Math.max(0, (areaSize.height - cropSize.height) / 2)}px;
`

export const CropFrame = styled.View`
	flex: 1;
	border-width: 2px;
	border-color: ${({ theme }) => theme.colors.white[3]};
`

export const CropImage = styled(Image)`
	width: 100%;
	height: 100%;
`

export const Footer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenDensity(20)}px ${relativeScreenWidth(7)}px;
`

export const LoaderOverlay = styled.View`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	align-items: center;
	justify-content: center;
	background-color: ${SHADE_COLOR};
`
