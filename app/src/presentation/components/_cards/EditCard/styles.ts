import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const CardHeader = styled.View`
	flex-direction: row;
	align-items: center;
`

export const ValueContainer = styled.View`
	padding-top: ${relativeScreenDensity(8)}px;
	padding-bottom: ${relativeScreenDensity(5)}px;
`

interface TextProps {
	bold?: boolean
}

export const Text = styled.Text<TextProps>`
	font-family: ${({ bold }) => (bold ? 'Arvo_700Bold' : 'Arvo_400Regular')};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`

export const PictureArea = styled.View`
	width: 100%;
	height: ${relativeScreenWidth(88)}px;
	border-width: ${relativeScreenDensity(2)}px;
	border-color: ${({ theme }) => theme.black4};
	border-radius: ${relativeScreenDensity(15)}px;
	background-color: ${({ theme }) => theme.black4};
	overflow: hidden;
`

export const ProfilePicture = styled.Image`
	flex: 1;
	resize-mode: cover;
	overflow: hidden;
`
