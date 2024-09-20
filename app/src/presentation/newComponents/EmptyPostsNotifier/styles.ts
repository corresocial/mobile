import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

export const Description = styled.Text`
	font-family: 'Arvo_700Bold';
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	color: ${({ theme }) => theme.colors.black[4]};
	width: ${relativeScreenWidth(60)}px;
	text-align: center;
`
