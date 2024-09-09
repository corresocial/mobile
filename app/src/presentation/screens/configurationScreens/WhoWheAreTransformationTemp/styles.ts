import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const ContainerContent = styled.View`
	padding: ${relativeScreenDensity(10)}px;
	align-items: flex-start;
	justify-content: center;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(3.5)}px;
`

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.pink[2]};
	padding: ${relativeScreenWidth(4)}px ${relativeScreenWidth(7)}px;
`

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[20]}px;
	${({ theme }) => theme.fonts.arvoBold};
`

export const Description = styled.Text`
	${({ theme }) => theme.fonts.arvoRegular};
	line-height: ${relativeScreenDensity(20)}px;
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
`

export const ButtonContainer = styled.View`
	margin: ${relativeScreenHeight(2)}px 0px;
	width: 100%;
`
