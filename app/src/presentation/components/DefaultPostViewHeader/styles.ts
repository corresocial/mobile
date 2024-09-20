import Constants from 'expo-constants'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	ignorePlatform?: boolean
}

export const Container = styled.View<ContainerProps>`
	padding-top: ${({ ignorePlatform }) => (ignorePlatform ? 0 : Platform.OS === 'ios' ? Constants.statusBarHeight : 0)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const PathBar = styled.Text`
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[12]}px;
	margin-right: ${relativeScreenDensity(10)}px;
`

export const Title = styled.Text`
	font-family: 'Arvo_400Regular';
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	width: 85%;
`

interface PathTitleProps {
	bold?: boolean
}

export const PathTitle = styled.Text<PathTitleProps>`
	font-family: 'Arvo_700Bold';
	font-weight: ${({ bold }) => (bold ? 700 : 400)};
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	padding: 0px ${relativeScreenDensity(10)}px;
	max-width: 50%;
`

export const SmallButtonRightSpace = styled.View`
	margin-right: ${relativeScreenDensity(10)}px;
`
