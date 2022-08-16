import styled from 'styled-components/native';
import { screenHeight } from '../../common/screenDimensions';

export const Container = styled.View`
    background-color: ${({theme}) => theme.transparence.orange1};
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    overflow: hidden;
`

export const LinkButtonsContainer = styled.View`
    width: 100%;
    height: ${screenHeight * 0.18}px;
    justify-content: space-around;
    margin-bottom: ${screenHeight * 0.07}px
`