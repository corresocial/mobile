import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
	height: ${relativeScreenHeight(25)}px;

	background-color: ${({ theme }) => theme.colors.white[3]};
	align-items: flex-start;
	justify-content: space-between;
	padding: ${15}px ${30}px; // REFACTOR relative
	border-left-width: ${relativeScreenDensity(5)}px;
	border-color: ${({ theme }) => theme.colors.black[4]};
`

export const Title = styled.Text`
	${({ theme }) => theme.fonts.arvoBold};
	font-size: ${20}px; // REFACTOR relative
`

export const Text = styled.Text`
	${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${13}px; // REFACTOR relative
`
