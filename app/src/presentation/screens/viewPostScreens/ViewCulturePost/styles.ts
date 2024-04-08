import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.blue2};
`

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.blue2};
	padding: 0px ${relativeScreenWidth(3)}px;
`
