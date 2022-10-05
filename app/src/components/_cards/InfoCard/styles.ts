import styled from 'styled-components/native'
import { screenHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
    width: 100%;
    height:${screenHeight * 0.1}px;
    background-color: ${({ theme }) => theme.white3};
    border-radius: 15px;
    border: 2px solid ${({ theme }) => theme.black3};
    border-right-width: 8px;
    padding-vertical: 10px;
    padding-horizontal: 27px;
    justify-content: space-between;
`

export const Title = styled.Text`
    width: 100%;
    font-family: Arvo_400Regular;
    font-size: 24px;
    color: ${({ theme }) => theme.black3}
`

export const Description = styled.Text`
width: 100%;
    font-family: Arvo_400Regular;
    font-size: 16px;
    color: ${({ theme }) => theme.black3}
`