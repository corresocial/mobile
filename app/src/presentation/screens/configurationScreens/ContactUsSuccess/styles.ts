import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const Body = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.colors.white[2]};
   justify-content: space-around;
   padding: ${relativeScreenDensity(25)}px;
`
