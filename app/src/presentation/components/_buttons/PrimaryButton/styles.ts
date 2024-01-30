import * as Animatable from 'react-native-animatable'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const TouchableContainer = styled.TouchableWithoutFeedback`
	width: 100%;
	background-color: ${({ theme }) => theme.white2};
`

export const ContainerBottom = styled(Animatable.View)`
	width: 100%;
	align-self: flex-end;
	flex-direction: row;
    border-radius: ${RFValue(18)}px;
    position: relative;
    background-color: ${({ theme }) => theme.black4};
`

export const ContainerSurface = styled.View`
	width: 100%;
	height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: ${RFValue(3)}px solid black;
    border-radius: ${RFValue(18)}px;
    padding: 0px ${RFValue(20)}px;
    position: absolute;
	left: ${-RFValue(9)}px;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-family: Arvo_400Regular;
    text-align: center;
`
