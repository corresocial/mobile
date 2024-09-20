import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const CarouselItemContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: ${relativeScreenHeight(45)}px;
    padding:  ${relativeScreenDensity(30)}px;
`

export const Slogan = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
`

export const EasterEgg = styled.TouchableOpacity`
	padding: 10px;
	position: absolute;
	left: 0px;
	top: 0px;
`
