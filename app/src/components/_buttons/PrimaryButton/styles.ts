import * as Animatable from 'react-native-animatable'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
	width: 100%;
	background-color: ${({ theme }) => theme.white2}
`

export const ContainerBottom = styled(Animatable.View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: ${RFValue(18)}px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: ${RFValue(18)}px;
    border: ${RFValue(3)}px solid black;
    padding-horizontal: ${RFValue(20)}px;
    position: absolute;
	right: ${RFValue(9)}px;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-family: Arvo_400Regular;
    margin-right:  ${RFValue(15)}px;
    text-align: center;
`
