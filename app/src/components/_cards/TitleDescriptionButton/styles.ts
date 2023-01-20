import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(17)}px;
    justify-content: space-around;
	position: relative;
`

export const ContainerInner = styled.TouchableOpacity`
   	width: 100%;
   	height: 100%;
    background-color: ${({ theme }) => theme.white3};
    border: ${RFValue(2)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(15)}px;
    padding-vertical: ${RFValue(10)}px;
    padding-horizontal: ${RFValue(15)}px;
    justify-content: space-around;
	left: ${RFValue(-5)}px;
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
    font-size:  ${RFValue(14)}px;
    color: ${({ theme }) => theme.black3}
`
