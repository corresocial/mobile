import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	height: ${relativeScreenHeight(14)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

export const ContainerInner = styled.View`
    flex: 1;
	width: 100%;
    height: 100%;
	background-color: ${({ theme }) => theme.white3};
    border: ${relativeScreenDensity(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
`

export const QuestionaryContainer = styled.View`
    padding:  ${relativeScreenDensity(10)}px;
    padding-left: ${relativeScreenDensity(20)}px;
    flex: 1;
    flex-direction: column;
`

export const CitizenNameContainer = styled.View`
    flex: 1;
    flex-direction: row;
    border-left-width: ${relativeScreenDensity(2.5)}px;
	padding: 0px ${relativeScreenDensity(6)}px;
	overflow: hidden;
	border-color: ${({ theme }) => theme.black4};
    align-items: center;
    margin-bottom: ${relativeScreenDensity(1)}px;
`

export const CitizenNameText = styled.Text`
    font-size: ${relativeScreenDensity(20)}px;
	font-family: Arvo_700Bold;
	color: ${({ theme }) => theme.black4};
`

export const CreatorDataContainer = styled.View`
    flex: 1;
    padding-left: ${relativeScreenDensity(7)}px;
`

export const CreatorContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`

export const CreatorNameText = styled.Text`
    font-size: ${relativeScreenDensity(12)}px;
	font-family: Arvo_700Bold;
	color: ${({ theme }) => theme.black4};
`

export const CreatedAtText = styled.Text`
    font-size: ${relativeScreenDensity(12)}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.black4};
`