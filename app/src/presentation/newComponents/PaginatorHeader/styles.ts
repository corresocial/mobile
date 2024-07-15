import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps{
	color: string
}

export const Container = styled.View<ContainerProps>`
	height: ${relativeScreenHeight(10)}px;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
	background-color: ${({ color }) => color};
`

export const InfoContainer = styled.View`
	height: 100%;
	width: 50%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const SubTitleContainer = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes.arvo[3]}px;
`

export const ButtonContainer = styled.View`
	height: 100%;
	width: 25%;
	padding: ${relativeScreenWidth(2)}px;
	align-items: center;
	justify-content: center;
`

export const Title = styled.Text`
	color: ${({ theme }) => theme.black5};
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => relativeScreenDensity(theme.fontSizes.arvo[4])}px;
`
