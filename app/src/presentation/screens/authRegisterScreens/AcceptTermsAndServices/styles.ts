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
    color: ${({ theme }) => theme.colors.black[4]};
    font-size: ${({ theme }) => theme.fontSizes[8]}px;
    text-align: center;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    margin-bottom:  ${relativeScreenDensity(30)}px;
`

export const TermsLabelHighlight = styled.Text`
    color: ${({ theme }) => theme.colors.purple[3]};
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
    text-align: center;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
    font-weight: bold;
`
