import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
`

export const ContainerBottom = styled.View`
	flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: ${RFValue(6)}px;
    border-radius: ${RFValue(10)}px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: ${RFValue(10)}px;
    border: ${RFValue(1.5)}px solid black;
    position: absolute;
	right: ${RFValue(5)}px;
`

export const ButtonLabel = styled.Text`
    margin-left: ${RFValue(8)}px;
    color: ${({ theme }) => theme.black4};
    font-family: Arvo_700Bold;
`
