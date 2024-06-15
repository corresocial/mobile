import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

export const ContainerInner = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
    border: ${relativeScreenDensity(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(23)}px;
	overflow: hidden;
    padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(25)}px;
	left: ${-relativeScreenWidth(2)}px;
    gap: ${relativeScreenDensity(15)}px;
`

export const QuestionContainer = styled.View`
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: ${relativeScreenDensity(15)}px;
`

export const QuestionTitle = styled.Text`
    font-size: ${relativeScreenDensity(18)}px;
	font-family: Arvo_700Bold;
	color: ${({ theme }) => theme.black4};
    padding-right: ${relativeScreenDensity(25)}px;
`

export const AnswerContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const AnswerText = styled.Text`
    font-size: ${relativeScreenDensity(12)}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.black4};
`