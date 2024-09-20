import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	color: string
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: ${relativeScreenWidth(2)}px;
	background-color: ${({ color }) => color};
	align-self: flex-center;
`

export const Title = styled.Text`
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`

export const RightLabel = styled.Text`
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	text-align: center;
`

export const RightLabelContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	border-radius: ${relativeScreenDensity(10)}px;
	padding: ${relativeScreenDensity(2)}px ${relativeScreenDensity(10)}px;
	justify-self: flex-end;
`
