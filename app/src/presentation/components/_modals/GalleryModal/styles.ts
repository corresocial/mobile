import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

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

export const GalleryContainer = styled.View`
    justify-content: center;
    flex: 1;
    background-color: black;
`

export const ThumbnailListContainer = styled.View`
	width: 100%;
    position: absolute;
    bottom: 5%;
`

export const CloseButtonArea = styled.TouchableOpacity`
    top: 5%;
    right: 5%;
    position: absolute;
    z-index: 2;
    background-color: white;
    padding: 2px;
    border-radius: 16px;
`

export const LeftButton = styled.TouchableOpacity`
    position: absolute;
	padding: ${relativeScreenWidth(10)}px ${relativeScreenWidth(1)}px;
	padding-right: ${relativeScreenWidth(3)}px;
    z-index: 2;
    top: 43%;
    left: 3%;
`

export const RightButton = styled.TouchableOpacity`
    position: absolute;
    padding: ${relativeScreenWidth(10)}px ${relativeScreenWidth(1)}px;
	padding-right: ${relativeScreenWidth(3)}px;
    z-index: 2;
    top: 43%;
    right: 3%;
`
