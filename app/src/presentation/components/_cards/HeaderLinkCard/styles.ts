import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const CardHeader = styled.View`
	flex-direction: row;
	align-items: center;
`

export const ValueContainer = styled.View`
	padding-top: ${relativeScreenDensity(8)}px;
	padding-bottom: ${relativeScreenDensity(5)}px;
`

export const Text = styled.Text`
	${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
`
