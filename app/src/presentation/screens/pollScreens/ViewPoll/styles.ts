import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Body = styled.ScrollView`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2};
	padding: 0 ${relativeScreenWidth(2)}px;
`
