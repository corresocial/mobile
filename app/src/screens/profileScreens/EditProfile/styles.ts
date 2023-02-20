import Constants from 'expo-constants'
import { Animated, Platform } from 'react-native'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
 	flex: 1;
 `

export const Header = styled.View`
	background-color: ${({ theme }) => theme.white3}
	width: 100%;
 	padding: ${relativeScreenWidth(4)}px;
 `

export const SaveButtonContainer = styled.View`
	width: 100%;
	padding-horizontal: ${relativeScreenWidth(3)}px;
	padding-top: ${relativeScreenHeight(3)}px;
 `

export const Body = styled(Animated.View)`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2}
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
 `

export const Sigh = styled.View`
	height: ${relativeScreenHeight(1.25)}px;
 `
