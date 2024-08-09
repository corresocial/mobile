import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled(Animated.View)`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.black[4]};
	border: ${relativeScreenDensity(2.5)}px solid black;
	border-right-width: ${relativeScreenDensity(6)}px;
	border-radius: ${relativeScreenDensity(15)}px;
	overflow: hidden;
`

export const ContainerInner = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
	border-radius: ${relativeScreenDensity(13)}px;
	overflow: hidden;
`

export const DropdownHeaderContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	width: 100%;
	height: ${relativeScreenHeight(8)}px;
	border-radius: ${relativeScreenDensity(13)}px;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(15)}px;
	padding-bottom: 0px;
`

export const DropdownHeader = styled.TouchableOpacity`
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const DropdownBody = styled.View`
	padding: ${relativeScreenDensity(10)}px;
`

export const MyLocationButtonContainer = styled.View`
	width: 100%;
	padding-left: ${relativeScreenDensity(7)}px;
`
