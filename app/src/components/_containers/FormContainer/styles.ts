import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    padding:  ${relativeScreenWidth(6)}px;
    align-items: center;
    overflow: hidden;
    justify-content: space-around;
`
