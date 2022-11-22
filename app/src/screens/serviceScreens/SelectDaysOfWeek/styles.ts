import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight } from '../../../common/screenDimensions'

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
    flexWrap: wrap;
`

export  const Row = styled.View`
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

export const Sigh = styled.View`
    height: ${screenHeight * 0.1}px;
    width: 100%;
`