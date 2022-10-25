import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    align-items: center;
    justify-content: center;
`

export const TouchCloseArea = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Content = styled.View`
    height: ${RFValue(400)}px;
    width: 88%;
    background-color: ${({ theme }) => theme.white3}
    padding: ${RFValue(25)}px;
    border-radius: ${RFValue(10)}px;
    border-width: ${RFValue(5)}px;
    justify-content: space-between;
    border-color: ${({ theme }) => theme.black3}
    border-right-width: ${RFValue(11)}px;
    `

export const Title = styled.Text`
    font-family: Arvo_400Regular;
    font-size: ${RFValue(24)}px;
    color: ${({ theme }) => theme.black3}
`
export const Description = styled.Text`
    font-family: Arvo_400Regular;
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.black3}
`

export const Question = styled.Text`
    font-family: Arvo_400Regular;
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.black3}
`