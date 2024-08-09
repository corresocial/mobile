import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
 	flex: 1;
 `

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	width: 100%;
 	padding: ${relativeScreenWidth(4)}px;
 `

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding: 0px ${relativeScreenDensity(10)}px;
	padding-top: ${relativeScreenHeight(3)}px;
 `

export const Body = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.orange[2]};
	padding: 0px ${relativeScreenWidth(3.5)}px;
 `
