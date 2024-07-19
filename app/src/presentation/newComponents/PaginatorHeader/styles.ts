import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	color: string
}

export const Container = styled.View<ContainerProps>`
	height: ${relativeScreenDensity(60)}px;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	background-color: ${({ color }) => color};
	padding: 0px ${relativeScreenDensity(10)}px;
`

export const ButtonContainer = styled.View`
	flex: 1;
	justify-content: end ;
	align-items: center;
`

interface InfoContainerProps {
	width: string | number
}

export const InfoContainer = styled.View<InfoContainerProps>`
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: ${({ width }) => (typeof (width) === 'string' ? width : `${relativeScreenWidth(width)}px`)};
`

export const Title = styled.Text`
	color: ${({ theme }) => theme.black5};
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes.arvo[5]}px;
`

export const SubTitle = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes.arvo[3]}px;
`
