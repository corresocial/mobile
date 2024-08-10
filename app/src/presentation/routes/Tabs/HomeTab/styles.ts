import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

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
