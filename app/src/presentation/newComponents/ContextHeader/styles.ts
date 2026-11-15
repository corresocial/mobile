import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	color: string
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: ${relativeScreenWidth(2)}px;
	background-color: ${({ color }) => color};
`

export const Title = styled.Text`
	flex-shrink: 1;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`

export const RightLabel = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	text-align: center;
`

export const RightLabelContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	border-radius: ${relativeScreenDensity(10)}px;
	padding: ${relativeScreenDensity(2)}px ${relativeScreenDensity(10)}px;
	margin-left: auto;
	flex-shrink: 0;
`
