import { TextStyle } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	overlayColor?: 'success' | 'error' | 'info'
}

export const getRelativeStatusBarColor = (theme: DefaultTheme, overlayColor: ContainerProps['overlayColor']) => {
	switch (overlayColor) {
		case 'error': return theme.transparence.red()
		case 'info': return theme.transparence.blue()
		case 'success': return theme.transparence.green()
		default: return theme.transparence.orange()
	}
}

export const Container = styled.KeyboardAvoidingView<ContainerProps>`
    height: 100%;
    background-color: ${({ overlayColor, theme }) => getRelativeStatusBarColor(theme, overlayColor)};
	justify-content: center;
	align-items: center;
`

export const TouchCloseArea = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Content = styled.View`
    width: 88%;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(30)}px;
    border-width: ${relativeScreenDensity(5)}px;
    justify-content: space-between;
    border-color: ${({ theme }) => theme.colors.black[4]};
    border-right-width: ${relativeScreenDensity(15)}px;
 `

export const ContentInner = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenDensity(25)}px;
	padding-top: ${relativeScreenDensity(15)}px;
	border-radius: ${relativeScreenDensity(25)}px;
	justify-content: space-between;
`

export const Header = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${relativeScreenDensity(20)}px;
`

interface TitleProps {
	hasHighlightedWords?: boolean
	textAlign?: TextStyle['textAlign']
}

export const Title = styled.Text<TitleProps>`
	flex: 1;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    font-weight: ${({ hasHighlightedWords }) => (hasHighlightedWords ? 400 : 700)};
	text-align: ${({ textAlign }) => (textAlign || 'left')};
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
    color: ${({ theme }) => theme.colors.black[3]};
`

interface DescriptionProps {
	bolded?: boolean
	fontSize?: number
	textAlign?: TextStyle['textAlign']
}

export const Description = styled.Text<DescriptionProps>`
	margin-bottom: ${relativeScreenDensity(20)}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    font-weight: ${({ bolded }) => (bolded ? 700 : 400)};
    font-size: ${({ fontSize }) => (fontSize ? relativeScreenDensity(fontSize) : relativeScreenDensity(13))}px;
    text-align: ${({ textAlign }) => (textAlign || 'left')};
    color: ${({ theme }) => theme.colors.black[3]};
`
