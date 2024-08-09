import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const TermsButtonContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding:  ${relativeScreenWidth(8)}px;
`

export const TermsLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${({ theme }) => theme.fontSizes[8]}px;
    text-align: center;
    font-family: Arvo_400Regular;
    margin-bottom:  ${relativeScreenDensity(30)}px;
`

export const TermsLabelHighlight = styled.Text`
    color: ${({ theme }) => theme.purple3};
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
    text-align: center;
    font-family: Arvo_700Bold;
    font-weight: bold;
`
