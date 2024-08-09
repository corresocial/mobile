import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.black[4]};
	width: ${relativeScreenWidth(80)}px;
	border-right-width: ${relativeScreenDensity(4)}px;
	border-radius: ${relativeScreenDensity(15)}px;
`

export const ContainerInner = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	width:100%;
	height: 100%;
	padding: ${relativeScreenDensity(20)}px;
	justify-content: space-between;
	position: relative;
	border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
	border-radius: ${relativeScreenDensity(15)}px;
`
export const CloseIcon = styled.TouchableOpacity`
	position: absolute;
	top: ${relativeScreenDensity(5)}px;
	right: ${relativeScreenDensity(5)}px;
`

export const UserName = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	width: 92%;
	margin-bottom: ${relativeScreenDensity(15)}px;
`
