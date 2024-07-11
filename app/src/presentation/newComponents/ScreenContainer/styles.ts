import styled, { DefaultTheme } from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

import { ScreenContainerTones } from '.'

function getColorByTone(theme: DefaultTheme, tone: ScreenContainerTones, intensity: 1 | 2 | 3 | 4) {
	switch (tone) {
		case 'orange': return theme.colors.orange[intensity]
		case 'purple': return theme.colors.purple[intensity]
		case 'pink': return theme.colors.pink[intensity]
		case 'green': return theme.colors.green[intensity]
		case 'blue': return theme.colors.blue[intensity]
		case 'white': return theme.colors.white[3]
		default: return theme.colors.white[3]
	}
}

interface SafeAreaViewProps extends SectionProps {
	safeAreaColor?: string
	withoutFlex?: boolean
}

export const SafeAreaViewContainer = styled.SafeAreaView<SafeAreaViewProps>`
	flex: ${({ withoutFlex }) => (withoutFlex ? 0 : 1)};
	background-color: ${({ theme, safeAreaColor, tone }) => safeAreaColor || getColorByTone(theme, tone!, 1)};
`

interface ContainerProps {
	withPadding?: boolean
}

interface SectionProps extends ContainerProps {
	tone?: ScreenContainerTones
}

export const Container = styled.View<ContainerProps>`
    flex: 1;
	width: 100%;
    justify-content: space-between;
    align-items: center;
	overflow: hidden;
	background-color: ${({ theme }) => theme.white3};
    padding: ${({ withPadding }) => (withPadding ? relativeScreenDensity(15) : 0)}px;
`

const SectionCommon = styled.View`
	width: 100%;
    justify-content: center;
    align-items: center;
`

export const FirstSection = styled(SectionCommon) <SectionProps>`
    padding: ${({ withPadding }) => (withPadding ? relativeScreenDensity(15) : 0)}px;
	background-color: ${({ theme, tone }) => getColorByTone(theme, tone!, 1)};
`

export const SecondSection = styled(SectionCommon) <SectionProps>`
    padding: ${({ withPadding }) => (withPadding ? relativeScreenDensity(15) : 0)}px;
	background-color: ${({ theme, tone }) => getColorByTone(theme, tone!, 2)};
`

export const ThirdSection = styled(SectionCommon) <SectionProps>`
    flex: 1;
    padding: ${({ withPadding }) => (withPadding ? relativeScreenDensity(15) : 0)}px;
	background-color: ${({ theme, tone }) => getColorByTone(theme, tone!, 3)};
`
