import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps{
	color: string
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	padding: ${relativeScreenDensity(10)}px;
	gap: ${relativeScreenWidth(2)}px;
	background-color: ${({ color }) => color};
`

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes.arvo[3]}px;
`
