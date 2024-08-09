import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const QuestionContainer = styled.View`
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: ${relativeScreenDensity(10)}px;
`

export const QuestionTitle = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
	font-family: Arvo_700Bold;
	color: ${({ theme }) => theme.black4};
    padding-right: ${relativeScreenDensity(40)}px;
`

export const AnswerContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const AnswerText = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.black4};
    text-align: justify;
`
