import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const CardHeader = styled.View`
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(15)}px;
`

export const TextAddress = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_400Regular';
	padding:${relativeScreenDensity(10)}px;
`

export const MapArea = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(30)}px;
	border-width: ${relativeScreenDensity(2)}px;
	border-radius: ${relativeScreenDensity(13)}px;
	overflow: hidden;
	position: relative;
`

export const NavigationApps = styled.View`
	position: absolute;
	flex-direction: row;
	align-items: center;
	bottom: ${relativeScreenDensity(0)}px;
	right: ${relativeScreenDensity(0)}px;
`

export const TouchableApp = styled.TouchableOpacity`
`
