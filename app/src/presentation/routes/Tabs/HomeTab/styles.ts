import { Animated, Platform, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'
import { theme as appTheme } from '@common/theme'

// O bottom-tabs 7 soma o inset inferior como paddingBottom dentro da altura fixa da barra.
// No Android (edge-to-edge) o inset é a barra de navegação, então ele entra na altura;
// no iOS mantém o padding do bottom-tabs 6 (inset - 4)
export const getTabBarStyle = (bottomInset: number): ViewStyle => ({
	position: 'absolute',
	height: Platform.OS === 'ios' ? relativeScreenDensity(77) : relativeScreenDensity(60) + bottomInset,
	paddingBottom: Platform.OS === 'ios' ? Math.max(bottomInset - 4, 0) : bottomInset,
	borderTopColor: appTheme.colors.black[4],
	borderTopWidth: relativeScreenDensity(2),
	marginBottom: 0
})

export const TabItemContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`

interface TabItemContentProps {
	// focused: boolean
}

export const TabItemContent = styled(Animated.View) <TabItemContentProps>`
	align-items: center;
	justify-content: center;
	width: 85%;
	height: 85%;
	border-radius: ${relativeScreenDensity(12)}px;
`

export const AnimatedTabItemText = styled(Animated.View)`

`

export const TabItemText = styled.Text`
	font-family: ${({ theme }) => theme.fonts.nunitoBold};
	font-size: ${({ theme }) => theme.fontSizes[0]}px;
	color: ${({ theme }) => theme.colors.black[4]};
	margin-top: ${relativeScreenDensity(2)}px;
`
