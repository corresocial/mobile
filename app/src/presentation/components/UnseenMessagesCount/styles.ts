import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	width: 30px;
	height: 30px;
`

export const IconContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	position: relative;
`

export const CountValue = styled.Text`
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[5]}px;

	position: absolute;
	padding-right: ${relativeScreenWidth(1)}px;
`
