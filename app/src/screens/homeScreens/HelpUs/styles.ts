import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const ButtonsContainer = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.orange2};
   justify-content: space-around;
   padding: ${relativeScreenWidth(7)}px;
`

export const Sigh = styled.View`
   height: 100%;
   width: ${relativeScreenWidth(3)}px;
`
