import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const AlbumView = styled.TouchableOpacity`
    margin: ${relativeScreenWidth(0.5)}px;
    width: ${relativeScreenWidth(32)}px;
    height: ${relativeScreenWidth(32)}px;
`

export const AlbumThumbnailImage = styled.Image`
    flex: 1;
    border-radius: ${relativeScreenDensity(15)}px;
`

export const AlbumThumbnailInfo = styled.View`
z-index: 1;
position: absolute;
display:flex;
align-items: center;
justify-content: center;
width: 100%;
height: ${relativeScreenWidth(8)}px;
bottom: 0px;

`

export const AlbumThumbnailBackground = styled.View`
    background-color: white;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: ${relativeScreenDensity(15)}px;
    border-bottom-right-radius: ${relativeScreenDensity(15)}px;
    opacity: 0.8;
`

export const AlbumThumbnailTitle = styled.Text`
    z-index: 2;
    font-size: ${relativeScreenDensity(9)}px;
    text-align: center;
	font-family: 'Arvo_700Bold';
    position: absolute;
    padding: ${relativeScreenWidth(0.5)}px;

`
