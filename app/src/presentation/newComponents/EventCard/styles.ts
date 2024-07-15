import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenHeight(18)}px;
	height: ${relativeScreenDensity(120)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(30)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

interface InnerContainerProps{
	buttonPressed: boolean
}

export const InnerContainer = styled.View<InnerContainerProps>`
	width: 100%;
    height: 100%;
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
	margin-left: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(1.7) : 0)}px;
    border: ${relativeScreenDensity(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(30)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
`
