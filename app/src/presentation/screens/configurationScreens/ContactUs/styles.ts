import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`

export const ButtonsContainer = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.orange2};
   justify-content: space-around;
   padding: ${relativeScreenDensity(25)}px;
`
