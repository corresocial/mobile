import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.white[3]};
    border-left-color: ${({ theme }) => theme.colors.black[4]};
    width: 100%;
`

export const Message = styled.Text`
    color: ${({ theme }) => theme.colors.black[4]};
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
	${({ theme }) => theme.fonts.arvoRegular};
    line-height: ${relativeScreenDensity(22)}px;
    flex-wrap: wrap;
`

export const MessageTitle = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[14]}px;
	${({ theme }) => theme.fonts.arvoRegular};
	color: ${({ theme }) => theme.colors.black[4]};
`

export const RedirectLink = styled.Text`
	${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	color: ${({ theme }) => theme.colors.orange[3]};
`
