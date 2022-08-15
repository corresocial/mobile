import styled from 'styled-components/native';
import { screenHeight } from '../../common/screenDimensions';

export const Container = styled.View`
    flex: 1;
`

export const InputsContainer = styled.View`
    width: 100%;
    min-height: 52px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${screenHeight * 0.1}px
`



