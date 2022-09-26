import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    margin-top: 15px;
`

export const IndicatorLabel = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-family: Arvo_400Regular;
    margin-bottom: 7px;
`

export const IndicatorBarBottom = styled.View`
    background-color: ${({ theme }) => theme.white3}
    width: 100%;
    height: 12px;
    border: 2px solid ${({theme}) => theme.black3}
    border-right-width: 6px;
`

export const IndicatorBarSurface = styled.View`
    background-color: ${({ theme }) => theme.orange3}
    width: 30px;
    height: 8px;
`