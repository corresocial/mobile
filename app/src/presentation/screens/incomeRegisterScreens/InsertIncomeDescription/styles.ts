import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const PicturePreviewContainer = styled.View`
    flex: 1;
    padding: 0px ${relativeScreenDensity(15)}px;
    justify-content: flex-end;
    align-items: center;
	width: 100%;
	height: 100%;
`

export const TopArea = styled.View`
	flex: 0.2;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(20)}px;
	padding-right: ${relativeScreenDensity(25)}px;
	flex-direction: row;
	align-items: center;
`

export const HorizontalListPicturesContainer = styled.View`
	flex-direction: row;
	justify-content: center;
`

export const ButtonsContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(20)}px;
`

export const LoaderContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content: center;
    z-index: 3;
`
