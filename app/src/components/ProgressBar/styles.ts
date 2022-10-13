import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    margin-top: ${RFValue(15)}px;
`

export const IndicatorLabel = styled.Text`
    width: 100%;
    text-align: center;
    font-size: ${RFValue(14)}px;
    font-family: Arvo_400Regular;
    margin-bottom: ${RFValue(7)}px;
`

export const IndicatorBarBottom = styled.View`
    background-color: ${({ theme }) => theme.white3}
    width: 100%;
    height: ${RFValue(12)}px;
    border: ${RFValue(2)}px solid ${({ theme }) => theme.black3}
    border-right-width: ${RFValue(8)}px;
    overflow: hidden;
`

export const IndicatorBarSurface = styled.View`
    background-color: ${({ theme }) => theme.orange3}
    height: ${RFValue(8)}px;
`