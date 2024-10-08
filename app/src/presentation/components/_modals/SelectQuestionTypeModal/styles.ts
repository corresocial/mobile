import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	overlayColor?: 'success' | 'error' | 'info'
}

export const Container = styled.View<ContainerProps>`
    height: 100%;
    background-color: ${({ overlayColor, theme }) => {
		switch (overlayColor) {
			case 'error': return theme.transparence.red()
			case 'info': return theme.transparence.blue()
			case 'success': return theme.transparence.green()
			default: return theme.transparence.orange()
		}
	}};
	justify-content: center;
	align-items: center;
`

export const TouchCloseArea = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const ContentInner = styled.View`
	width: 90%;
	gap: ${relativeScreenDensity(5)}px;
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

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	text-align: center;
    font-size: ${({ theme }) => theme.fontSizes[6]}px;
    color: ${({ theme }) => theme.colors.black[3]};
`
