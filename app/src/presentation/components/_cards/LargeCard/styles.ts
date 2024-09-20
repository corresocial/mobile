import { DefaultTheme } from 'styled-components'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	width: number | string
	height: number | string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    height: ${({ height }) => (typeof height === 'string' ? height : `${relativeScreenDensity(height)}px`)};
    width: ${({ width }) => (typeof width === 'string' ? width : `${relativeScreenWidth(width)}px`)};

	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.black[4]};
	height: ${({ height }) => height}px;
	border-radius: ${(relativeScreenDensity(20))}px;
`

function getColorByTone(theme: DefaultTheme, tone: 'green' | 'pink' | 'blue') {
	switch (tone) {
		case 'pink': return theme.colors.pink[3]
		case 'green': return theme.colors.green[3]
		case 'blue': return theme.colors.blue[3]
		default: return theme.colors.white[3]
	}
}

interface ContainerInnerProps {
	buttonPressed?: boolean
	tone?: 'green' | 'pink' | 'blue'
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	width: 100%;
	height: 100%;
    align-items: center;
    justify-content: space-between;
    border: ${relativeScreenDensity(2)}px solid black;
    border-radius: ${(relativeScreenDensity(20))}px;
    background-color: ${({ theme }) => theme.colors.white[3]};
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
	overflow: hidden;
`

export const ButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.black[4]};
    font-family: ${({ theme }) => theme.fonts.nunitoBold};
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
`

interface HeaderProps {
	tone?: 'green' | 'pink' | 'blue'
}

export const Header = styled.View<HeaderProps>`
	border-top-right-radius: ${(relativeScreenDensity(18))}px;
	border-top-left-radius: ${(relativeScreenDensity(18))}px;
	width: 100%;
	height: 60%;
	background-color: ${({ theme, tone }) => (tone ? getColorByTone(theme, tone) : theme.colors.white[3])};
	align-items: center;
    justify-content: center;
`

export const Footer = styled.View`
	flex: 1;
	align-items: center;
    justify-content: center;
`
