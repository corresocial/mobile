import styled from 'styled-components/native'
import { screenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    padding: ${screenWidth * 0.07}px;
    flex-direction: row;    
    flex-wrap: wrap;
`