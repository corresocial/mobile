import { Video } from 'expo-av'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const GalleryModalContainer = styled.Modal`
    flex: 1;
    height: 100%;
    width: 100%;
    background-color: black;
`

export const ImageContainer = styled.TouchableOpacity`
    flex: 1;
    border-width: 0;
    justify-content: 'center';
`

export const VideoContainer = styled.View` // TODO Videos
	flex: 1;
	height: 100%;
	width: 100%;
	border-width: 0;
	justify-content: center;
	align-items: center;
	background-color: 'white';
`

interface VideoViewProps{
    isLandScapeMode: boolean
}

export const VideoView = styled(Video)<VideoViewProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: ${({ isLandScapeMode }) => (isLandScapeMode ? relativeScreenHeight(40) : relativeScreenHeight(70))}px;
`

export const GalleryContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: black;
`

export const ThumbnailListContainer = styled.View`
	width: 100%;
    position: absolute;
    bottom: 5%;
`

interface CloseButtonAreaProps {
	isPressing: boolean
}

export const CloseButtonArea = styled.View<CloseButtonAreaProps>`
    top: 5%;
    right: 5%;
    position: absolute;
    z-index: 4;
    padding: 2px;
    border-radius: 16px;

`

export const LeftButton = styled.TouchableOpacity`
    position: absolute;
	padding: ${relativeScreenWidth(10)}px ${relativeScreenWidth(1)}px;
	padding-right: ${relativeScreenWidth(3)}px;
    z-index: 2;
    top: 50%;
    transform: translateY(${-relativeScreenWidth(18)}px);
    left: 3%;
`

export const RightButton = styled.TouchableOpacity`
    position: absolute;
    padding: ${relativeScreenWidth(10)}px ${relativeScreenWidth(1)}px;
	padding-right: ${relativeScreenWidth(3)}px;
    z-index: 2;
    top: 50%;
    transform: translateY(${-relativeScreenWidth(18)}px);
    right: 3%;
`

export const LoaderContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    justify-content: center;
    z-index: 3;
`
