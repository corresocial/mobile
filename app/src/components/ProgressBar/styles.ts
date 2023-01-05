import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
    width: 100%;
    margin-top: ${relativeScreenHeight(2.2)}px;
`

export const IndicatorLabel = styled.Text`
    width: 100%;
    text-align: center;
    font-size: ${RFValue(14)}px;
    font-family: Arvo_400Regular;
    margin-bottom: ${relativeScreenHeight(1)}px;
`

export const IndicatorBarBottom = styled.View`
    background-color: ${({ theme }) => theme.white3}
    width: 100%;
    height: ${relativeScreenHeight(1.4)}px;
    border: ${relativeScreenWidth(0.5)}px solid ${({ theme }) => theme.black3}
    border-right-width: ${relativeScreenWidth(2.5)}px;
    overflow: hidden;
`

export const IndicatorBarSurface = styled.View`
    background-color: ${({ theme }) => theme.orange3}
    height: 100%;
`
