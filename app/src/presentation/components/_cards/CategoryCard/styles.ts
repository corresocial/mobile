import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerInnerProps {
	inactiveColor: string
	hasElements: boolean
}

export const Container = styled.TouchableHighlight`
	width: ${relativeScreenWidth(25)}px;
	height: ${relativeScreenWidth(25)}px;
	background-color: ${({ theme }) => theme.black4};
	border-radius: ${relativeScreenDensity(15)}px;
	margin-left: ${relativeScreenDensity(7)}px;
	margin-bottom: ${relativeScreenDensity(15)}px;
`

export const ContainerInner = styled.View<ContainerInnerProps>`
	padding: ${relativeScreenDensity(5)}px;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: ${(props) => (props.hasElements ? props.theme.white3 : props.inactiveColor)};
	border-radius: ${relativeScreenDensity(15)}px;
	margin-left: ${relativeScreenDensity(-7)}px;
	border: ${relativeScreenDensity(2.5)}px solid ${({ theme }) => theme.black4};
	overflow: hidden;
`

export const Title = styled.Text`
	text-align: center;
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
`
