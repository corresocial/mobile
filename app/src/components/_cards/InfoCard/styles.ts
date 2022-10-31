import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    height:${screenHeight * 0.1}px;
    background-color: ${({ theme }) => theme.white3};
    border-radius: 15px;
    border: 2px solid ${({ theme }) => theme.black3};
    border-right-width: ${RFValue(6)}px;
    padding-vertical: ${RFValue(10)}px;
    padding-horizontal: ${RFValue(15)}px;
    justify-content: space-around;
`

export const Title = styled.Text`
    width: 100%;
    font-family: Arvo_400Regular;
    font-size:  ${RFValue(22)}px;
    color: ${({ theme }) => theme.black3}
`

export const Description = styled.Text`
    width: 100%;
    font-family: Arvo_400Regular;
    font-size:  ${RFValue(16)}px;
    color: ${({ theme }) => theme.black3}
`