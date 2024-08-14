import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1; // Mesmo tamanho que o custom bottom sheet
	height: 100%;
	justify-content: space-between;
`

export const PicturePreviewContainer = styled.View`
    padding: 0px ${relativeScreenDensity(15)}px;
    justify-content: space-between;
    align-items: center;
`

export const HorizontalListPicturesContainer = styled.View`
	flex-direction: row;
	justify-content: center;
`

export const ButtonsContainer = styled.View`
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
