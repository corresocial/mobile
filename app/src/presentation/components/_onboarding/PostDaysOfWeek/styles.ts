import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    position: relative;
`

export const WeekdaysSelectedArea = styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 30px;
    flex-wrap: wrap;
`

export const Row = styled.View`
    align-items: center;
    width: 100%;
`

export const FloatButtonContainer = styled.View`
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 15%;
    position: absolute;
    bottom: ${RFValue(10)}px;
`
