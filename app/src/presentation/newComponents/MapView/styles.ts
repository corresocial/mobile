import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	align-self: center;
	background-color: ${({ theme }) => theme.colors.white[3]};
	border-radius: ${relativeScreenDensity(15)}px;
`

export const CardHeaderContainer = styled.View`
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(15)}px;
`

export const CardHeader = styled.View`
	flex-direction: row;
	justify-content: start;
	align-items: center;
`

export const TextAddress = styled.Text`
	flex: 1;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_400Regular';
	padding:${relativeScreenDensity(10)}px;
`

export const MapArea = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(30)}px;
	border-radius: ${relativeScreenDensity(13)}px;
	overflow: hidden;
	position: relative;
`

export const NavigationApps = styled.View`
	position: absolute;
	flex-direction: row;
	align-items: center;
	bottom: ${relativeScreenDensity(3)}px;
	right: ${relativeScreenDensity(3)}px;
`

export const TouchableApp = styled.TouchableOpacity``
