import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.white3};
    border-left-color: ${({ theme }) => theme.black4};
    width: 100%;
`

export const Message = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
    font-family: Arvo_400Regular;
    line-height: ${relativeScreenDensity(22)}px;
    flex-wrap: wrap;
`

export const MessageTitle = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[14]}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.black4};
`

export const RedirectLink = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	color: ${({ theme }) => theme.orange3};
`
