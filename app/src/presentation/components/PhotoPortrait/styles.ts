import { ImageResizeMode } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	circle?: boolean
	height?: number | string
	width?: number | string
	maxWidth?: number
	borderWidth?: number
	borderRightWidth?: number
}

export const Container = styled.View<ContainerProps>`
	height: ${({ height }) => (typeof (height) === 'number' ? `${height}px` : height || '100%')}};
	width: ${({ width }) => (typeof (width) === 'number' ? `${width}px` : width || '100%')}};
	max-width: ${({ maxWidth }) => maxWidth}px;
	border-width: ${({ borderWidth }) => (borderWidth ? RFValue(borderWidth) : 0)}px;
	border-right-width: ${({ borderRightWidth }) => (borderRightWidth ? RFValue(borderRightWidth) : 0)}px;
	border-radius: ${({ circle }) => (circle ? RFValue(500) : RFValue(13))}px;

    background-color: ${({ theme }) => theme.black4};
    border-color: ${({ theme }) => theme.black4};
    position: relative;
    max-height: ${relativeScreenWidth(90)}px;
	overflow: hidden;
`

interface PortraitImageProps {
	resizeMode?: ImageResizeMode
	circle?: boolean
}

export const PortraitImage = styled.Image<PortraitImageProps>`
	width: 100%;
	height: 100%;
	resize-mode: ${({ resizeMode }) => resizeMode || 'cover'};
	border-radius: ${({ circle }) => (circle ? RFValue(500) : RFValue(9))}px;
`

export const NoPhotoContainer = styled.View`
	flex: 1;
    background-color: ${({ theme }) => theme.white3};
	border-radius: ${RFValue(10)}px;
	overflow: hidden;
`

export const DeleteItemArea = styled.TouchableOpacity`
    position: absolute;
    align-items: center;
    justify-content: center;
    width: ${relativeScreenWidth(14)}px;
    height: ${relativeScreenWidth(14)}px;
    padding:  ${relativeScreenWidth(2.5)}px;
    bottom:  ${relativeScreenWidth(2)}px;;
    right:  ${relativeScreenWidth(2)}px;;
`
