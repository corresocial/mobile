import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const WithoutPostsContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenDensity(15)}px ${relativeScreenDensity(30)}px;
	border-left-width: ${relativeScreenWidth(1.4)}px;
	border-left-color: ${({ theme }) => theme.colors.black[4]};
`

export const WithoutPostsTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes[7]}px;
	margin-bottom: ${relativeScreenDensity(10)}px;
`

export const WithoutPostsText = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[3]}px;

`
