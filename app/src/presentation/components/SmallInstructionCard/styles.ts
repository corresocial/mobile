import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface CardHighlighProps {
	highlight: boolean
	error: boolean
}

export const Container = styled.View<CardHighlighProps>`
	background-color: ${({ theme, highlight, error }) => (
		highlight
			? error ? theme.colors.red[1] : theme.colors.green[1]
			: theme.colors.white[3]
	)};
	border-left-width: ${({ highlight }) => (highlight ? relativeScreenDensity(4) : relativeScreenDensity(2))}px;
	border-left-color: ${({ theme }) => theme.colors.black[4]};
	padding: ${relativeScreenDensity(4)}px 0px;
	padding-left: ${relativeScreenDensity(10)}px;
`

export const CustomText = styled.Text<CardHighlighProps>`
	font-family: ${({ highlight }) => (highlight ? 'Arvo_700Bold' : 'Arvo_400Regular')};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`
