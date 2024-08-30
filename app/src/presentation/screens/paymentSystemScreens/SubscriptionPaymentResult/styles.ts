import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const Body = styled.View`
	flex: 1;
	padding: ${relativeScreenDensity(17)}px;
	justify-content: space-around;
	overflow: visible;
`
