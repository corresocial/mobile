import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    padding-left: ${relativeScreenDensity(15)}px;
    padding-right: ${relativeScreenDensity(15)}px;
    background-color: ${({ theme }) => theme.transparence.red};
`

export const Container = styled.View`
	height: ${relativeScreenHeight(27)}px;
    border-radius: ${relativeScreenDensity(23)}px;
	margin-left: ${relativeScreenWidth(1.9)}px;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerInner = styled.View`
    flex: 1;
	width: 100%;
    height: 100%;
	background-color: ${({ theme }) => theme.white3};
    border: ${relativeScreenDensity(6)}px solid ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
    position: absolute;
	overflow: hidden;
    align-items: center;
    justify-content: space-around;
    padding: ${relativeScreenDensity(20)}px;
	left: ${-relativeScreenWidth(2)}px;
`

export const CardTitleContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const CardTitleText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
	font-family: Arvo_700Bold;
	color: ${({ theme }) => theme.black4};
    margin-left: ${relativeScreenDensity(12)}px;
`

export const CardDescriptionText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.black4};
`
